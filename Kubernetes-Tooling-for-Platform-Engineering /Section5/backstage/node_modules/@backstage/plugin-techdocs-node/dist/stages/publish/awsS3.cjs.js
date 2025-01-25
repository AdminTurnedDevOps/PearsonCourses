'use strict';

var errors = require('@backstage/errors');
var integrationAwsNode = require('@backstage/integration-aws-node');
var clientS3 = require('@aws-sdk/client-s3');
var credentialProviders = require('@aws-sdk/credential-providers');
var nodeHttpHandler = require('@smithy/node-http-handler');
var libStorage = require('@aws-sdk/lib-storage');
var hpagent = require('hpagent');
var fs = require('fs-extra');
var JSON5 = require('json5');
var createLimiter = require('p-limit');
var path = require('path');
var helpers = require('./helpers.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);
var JSON5__default = /*#__PURE__*/_interopDefaultCompat(JSON5);
var createLimiter__default = /*#__PURE__*/_interopDefaultCompat(createLimiter);
var path__default = /*#__PURE__*/_interopDefaultCompat(path);

const streamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    try {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on(
        "error",
        (e) => reject(new errors.ForwardedError("Unable to read stream", e))
      );
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    } catch (e) {
      throw new errors.ForwardedError("Unable to parse the response data", e);
    }
  });
};
class AwsS3Publish {
  storageClient;
  bucketName;
  legacyPathCasing;
  logger;
  bucketRootPath;
  sse;
  constructor(options) {
    this.storageClient = options.storageClient;
    this.bucketName = options.bucketName;
    this.legacyPathCasing = options.legacyPathCasing;
    this.logger = options.logger;
    this.bucketRootPath = options.bucketRootPath;
    this.sse = options.sse;
  }
  static async fromConfig(config, logger) {
    let bucketName = "";
    try {
      bucketName = config.getString("techdocs.publisher.awsS3.bucketName");
    } catch (error) {
      throw new Error(
        "Since techdocs.publisher.type is set to 'awsS3' in your app config, techdocs.publisher.awsS3.bucketName is required."
      );
    }
    const bucketRootPath = helpers.normalizeExternalStorageRootPath(
      config.getOptionalString("techdocs.publisher.awsS3.bucketRootPath") || ""
    );
    const sse = config.getOptionalString("techdocs.publisher.awsS3.sse");
    const region = config.getOptionalString("techdocs.publisher.awsS3.region");
    const accountId = config.getOptionalString(
      "techdocs.publisher.awsS3.accountId"
    );
    const credentialsConfig = config.getOptionalConfig(
      "techdocs.publisher.awsS3.credentials"
    );
    const credsManager = integrationAwsNode.DefaultAwsCredentialsManager.fromConfig(config);
    const sdkCredentialProvider = await AwsS3Publish.buildCredentials(
      credsManager,
      accountId,
      credentialsConfig,
      region
    );
    const endpoint = config.getOptionalString(
      "techdocs.publisher.awsS3.endpoint"
    );
    const httpsProxy = config.getOptionalString(
      "techdocs.publisher.awsS3.httpsProxy"
    );
    const forcePathStyle = config.getOptionalBoolean(
      "techdocs.publisher.awsS3.s3ForcePathStyle"
    );
    const storageClient = new clientS3.S3Client({
      customUserAgent: "backstage-aws-techdocs-s3-publisher",
      credentialDefaultProvider: () => sdkCredentialProvider,
      ...region && { region },
      ...endpoint && { endpoint },
      ...forcePathStyle && { forcePathStyle },
      ...httpsProxy && {
        requestHandler: new nodeHttpHandler.NodeHttpHandler({
          httpsAgent: new hpagent.HttpsProxyAgent({ proxy: httpsProxy })
        })
      }
    });
    const legacyPathCasing = config.getOptionalBoolean(
      "techdocs.legacyUseCaseSensitiveTripletPaths"
    ) || false;
    return new AwsS3Publish({
      storageClient,
      bucketName,
      bucketRootPath,
      legacyPathCasing,
      logger,
      sse
    });
  }
  static buildStaticCredentials(accessKeyId, secretAccessKey) {
    return async () => {
      return Promise.resolve({
        accessKeyId,
        secretAccessKey
      });
    };
  }
  static async buildCredentials(credsManager, accountId, config, region) {
    if (accountId) {
      return (await credsManager.getCredentialProvider({ accountId })).sdkCredentialProvider;
    }
    if (!config) {
      return (await credsManager.getCredentialProvider()).sdkCredentialProvider;
    }
    const accessKeyId = config.getOptionalString("accessKeyId");
    const secretAccessKey = config.getOptionalString("secretAccessKey");
    const explicitCredentials = accessKeyId && secretAccessKey ? AwsS3Publish.buildStaticCredentials(accessKeyId, secretAccessKey) : (await credsManager.getCredentialProvider()).sdkCredentialProvider;
    const roleArn = config.getOptionalString("roleArn");
    if (roleArn) {
      return credentialProviders.fromTemporaryCredentials({
        masterCredentials: explicitCredentials,
        params: {
          RoleSessionName: "backstage-aws-techdocs-s3-publisher",
          RoleArn: roleArn
        },
        clientConfig: { region }
      });
    }
    return explicitCredentials;
  }
  /**
   * Check if the defined bucket exists. Being able to connect means the configuration is good
   * and the storage client will work.
   */
  async getReadiness() {
    try {
      await this.storageClient.send(
        new clientS3.HeadBucketCommand({ Bucket: this.bucketName })
      );
      this.logger.info(
        `Successfully connected to the AWS S3 bucket ${this.bucketName}.`
      );
      return { isAvailable: true };
    } catch (error) {
      this.logger.error(
        `Could not retrieve metadata about the AWS S3 bucket ${this.bucketName}. Make sure the bucket exists. Also make sure that authentication is setup either by explicitly defining credentials and region in techdocs.publisher.awsS3 in app config or by using environment variables. Refer to https://backstage.io/docs/features/techdocs/using-cloud-storage`
      );
      this.logger.error(`from AWS client library`, error);
      return {
        isAvailable: false
      };
    }
  }
  /**
   * Upload all the files from the generated `directory` to the S3 bucket.
   * Directory structure used in the bucket is - entityNamespace/entityKind/entityName/index.html
   */
  async publish({
    entity,
    directory
  }) {
    const objects = [];
    const useLegacyPathCasing = this.legacyPathCasing;
    const bucketRootPath = this.bucketRootPath;
    const sse = this.sse;
    let existingFiles = [];
    try {
      const remoteFolder = helpers.getCloudPathForLocalPath(
        entity,
        void 0,
        useLegacyPathCasing,
        bucketRootPath
      );
      existingFiles = await this.getAllObjectsFromBucket({
        prefix: remoteFolder
      });
    } catch (e) {
      errors.assertError(e);
      this.logger.error(
        `Unable to list files for Entity ${entity.metadata.name}: ${e.message}`
      );
    }
    let absoluteFilesToUpload;
    try {
      absoluteFilesToUpload = await helpers.getFileTreeRecursively(directory);
      await helpers.bulkStorageOperation(
        async (absoluteFilePath) => {
          const relativeFilePath = path__default.default.relative(directory, absoluteFilePath);
          const fileStream = fs__default.default.createReadStream(absoluteFilePath);
          const params = {
            Bucket: this.bucketName,
            Key: helpers.getCloudPathForLocalPath(
              entity,
              relativeFilePath,
              useLegacyPathCasing,
              bucketRootPath
            ),
            Body: fileStream,
            ...sse && { ServerSideEncryption: sse }
          };
          objects.push(params.Key);
          const upload = new libStorage.Upload({
            client: this.storageClient,
            params
          });
          return upload.done();
        },
        absoluteFilesToUpload,
        { concurrencyLimit: 10 }
      );
      this.logger.info(
        `Successfully uploaded all the generated files for Entity ${entity.metadata.name}. Total number of files: ${absoluteFilesToUpload.length}`
      );
    } catch (e) {
      const errorMessage = `Unable to upload file(s) to AWS S3. ${e}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    try {
      const relativeFilesToUpload = absoluteFilesToUpload.map(
        (absoluteFilePath) => helpers.getCloudPathForLocalPath(
          entity,
          path__default.default.relative(directory, absoluteFilePath),
          useLegacyPathCasing,
          bucketRootPath
        )
      );
      const staleFiles = helpers.getStaleFiles(relativeFilesToUpload, existingFiles);
      await helpers.bulkStorageOperation(
        async (relativeFilePath) => {
          return await this.storageClient.send(
            new clientS3.DeleteObjectCommand({
              Bucket: this.bucketName,
              Key: relativeFilePath
            })
          );
        },
        staleFiles,
        { concurrencyLimit: 10 }
      );
      this.logger.info(
        `Successfully deleted stale files for Entity ${entity.metadata.name}. Total number of files: ${staleFiles.length}`
      );
    } catch (error) {
      const errorMessage = `Unable to delete file(s) from AWS S3. ${error}`;
      this.logger.error(errorMessage);
    }
    return { objects };
  }
  async fetchTechDocsMetadata(entityName) {
    try {
      return await new Promise(async (resolve, reject) => {
        const entityTriplet = `${entityName.namespace}/${entityName.kind}/${entityName.name}`;
        const entityDir = this.legacyPathCasing ? entityTriplet : helpers.lowerCaseEntityTriplet(entityTriplet);
        const entityRootDir = path__default.default.posix.join(this.bucketRootPath, entityDir);
        if (!helpers.isValidContentPath(this.bucketRootPath, entityRootDir)) {
          this.logger.error(
            `Invalid content path found while fetching TechDocs metadata: ${entityRootDir}`
          );
          throw new Error(`Metadata Not Found`);
        }
        try {
          const resp = await this.storageClient.send(
            new clientS3.GetObjectCommand({
              Bucket: this.bucketName,
              Key: `${entityRootDir}/techdocs_metadata.json`
            })
          );
          const techdocsMetadataJson = await streamToBuffer(
            resp.Body
          );
          if (!techdocsMetadataJson) {
            throw new Error(
              `Unable to parse the techdocs metadata file ${entityRootDir}/techdocs_metadata.json.`
            );
          }
          const techdocsMetadata = JSON5__default.default.parse(
            techdocsMetadataJson.toString("utf-8")
          );
          resolve(techdocsMetadata);
        } catch (err) {
          errors.assertError(err);
          this.logger.error(err.message);
          reject(new Error(err.message));
        }
      });
    } catch (e) {
      throw new errors.ForwardedError("TechDocs metadata fetch failed", e);
    }
  }
  /**
   * Express route middleware to serve static files on a route in techdocs-backend.
   */
  docsRouter() {
    return async (req, res) => {
      const decodedUri = decodeURI(req.path.replace(/^\//, ""));
      const filePathNoRoot = this.legacyPathCasing ? decodedUri : helpers.lowerCaseEntityTripletInStoragePath(decodedUri);
      const filePath = path__default.default.posix.join(this.bucketRootPath, filePathNoRoot);
      if (!helpers.isValidContentPath(this.bucketRootPath, filePath)) {
        this.logger.error(
          `Attempted to fetch TechDocs content for a file outside of the bucket root: ${filePathNoRoot}`
        );
        res.status(404).send("File Not Found");
        return;
      }
      const fileExtension = path__default.default.extname(filePath);
      const responseHeaders = helpers.getHeadersForFileExtension(fileExtension);
      try {
        const resp = await this.storageClient.send(
          new clientS3.GetObjectCommand({ Bucket: this.bucketName, Key: filePath })
        );
        for (const [headerKey, headerValue] of Object.entries(
          responseHeaders
        )) {
          res.setHeader(headerKey, headerValue);
        }
        res.send(await streamToBuffer(resp.Body));
      } catch (err) {
        errors.assertError(err);
        this.logger.warn(
          `TechDocs S3 router failed to serve static files from bucket ${this.bucketName} at key ${filePath}: ${err.message}`
        );
        res.status(404).send("File Not Found");
      }
    };
  }
  /**
   * A helper function which checks if index.html of an Entity's docs site is available. This
   * can be used to verify if there are any pre-generated docs available to serve.
   */
  async hasDocsBeenGenerated(entity) {
    try {
      const entityTriplet = `${entity.metadata.namespace}/${entity.kind}/${entity.metadata.name}`;
      const entityDir = this.legacyPathCasing ? entityTriplet : helpers.lowerCaseEntityTriplet(entityTriplet);
      const entityRootDir = path__default.default.posix.join(this.bucketRootPath, entityDir);
      if (!helpers.isValidContentPath(this.bucketRootPath, entityRootDir)) {
        this.logger.error(
          `Invalid content path found while checking if docs have been generated: ${entityRootDir}`
        );
        return Promise.resolve(false);
      }
      await this.storageClient.send(
        new clientS3.HeadObjectCommand({
          Bucket: this.bucketName,
          Key: `${entityRootDir}/index.html`
        })
      );
      return Promise.resolve(true);
    } catch (e) {
      return Promise.resolve(false);
    }
  }
  async migrateDocsCase({
    removeOriginal = false,
    concurrency = 25
  }) {
    const allObjects = await this.getAllObjectsFromBucket();
    const limiter = createLimiter__default.default(concurrency);
    await Promise.all(
      allObjects.map(
        (f) => limiter(async (file) => {
          let newPath;
          try {
            newPath = helpers.lowerCaseEntityTripletInStoragePath(file);
          } catch (e) {
            errors.assertError(e);
            this.logger.warn(e.message);
            return;
          }
          if (file === newPath) {
            return;
          }
          try {
            this.logger.debug(`Migrating ${file}`);
            await this.storageClient.send(
              new clientS3.CopyObjectCommand({
                Bucket: this.bucketName,
                CopySource: [this.bucketName, file].join("/"),
                Key: newPath
              })
            );
            if (removeOriginal) {
              await this.storageClient.send(
                new clientS3.DeleteObjectCommand({
                  Bucket: this.bucketName,
                  Key: file
                })
              );
            }
          } catch (e) {
            errors.assertError(e);
            this.logger.warn(`Unable to migrate ${file}: ${e.message}`);
          }
        }, f)
      )
    );
  }
  /**
   * Returns a list of all object keys from the configured bucket.
   */
  async getAllObjectsFromBucket({ prefix } = { prefix: "" }) {
    const objects = [];
    let nextContinuation;
    let allObjects;
    do {
      allObjects = await this.storageClient.send(
        new clientS3.ListObjectsV2Command({
          Bucket: this.bucketName,
          ContinuationToken: nextContinuation,
          ...prefix ? { Prefix: prefix } : {}
        })
      );
      objects.push(
        ...(allObjects.Contents || []).map((f) => f.Key || "").filter((f) => !!f)
      );
      nextContinuation = allObjects.NextContinuationToken;
    } while (nextContinuation);
    return objects;
  }
}

exports.AwsS3Publish = AwsS3Publish;
//# sourceMappingURL=awsS3.cjs.js.map
