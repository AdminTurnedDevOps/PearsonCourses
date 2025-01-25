'use strict';

var errors = require('@backstage/errors');
var storage = require('@google-cloud/storage');
var JSON5 = require('json5');
var path = require('path');
var helpers = require('./helpers.cjs.js');
var GoogleMigration = require('./migrations/GoogleMigration.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var JSON5__default = /*#__PURE__*/_interopDefaultCompat(JSON5);
var path__default = /*#__PURE__*/_interopDefaultCompat(path);

class GoogleGCSPublish {
  storageClient;
  bucketName;
  legacyPathCasing;
  logger;
  bucketRootPath;
  constructor(options) {
    this.storageClient = options.storageClient;
    this.bucketName = options.bucketName;
    this.legacyPathCasing = options.legacyPathCasing;
    this.logger = options.logger;
    this.bucketRootPath = options.bucketRootPath;
  }
  static fromConfig(config, logger, options) {
    let bucketName = "";
    try {
      bucketName = config.getString("techdocs.publisher.googleGcs.bucketName");
    } catch (error) {
      throw new Error(
        "Since techdocs.publisher.type is set to 'googleGcs' in your app config, techdocs.publisher.googleGcs.bucketName is required."
      );
    }
    const bucketRootPath = helpers.normalizeExternalStorageRootPath(
      config.getOptionalString("techdocs.publisher.googleGcs.bucketRootPath") || ""
    );
    const credentials = config.getOptionalString(
      "techdocs.publisher.googleGcs.credentials"
    );
    const projectId = config.getOptionalString(
      "techdocs.publisher.googleGcs.projectId"
    );
    let credentialsJson = {};
    if (credentials) {
      try {
        credentialsJson = JSON.parse(credentials);
      } catch (err) {
        throw new Error(
          "Error in parsing techdocs.publisher.googleGcs.credentials config to JSON."
        );
      }
    }
    const clientOpts = options ?? {};
    if (projectId) {
      clientOpts.projectId = projectId;
    }
    const storageClient = new storage.Storage({
      ...credentials && {
        projectId: credentialsJson.project_id,
        credentials: credentialsJson
      },
      ...clientOpts
    });
    const legacyPathCasing = config.getOptionalBoolean(
      "techdocs.legacyUseCaseSensitiveTripletPaths"
    ) || false;
    return new GoogleGCSPublish({
      storageClient,
      bucketName,
      legacyPathCasing,
      logger,
      bucketRootPath
    });
  }
  /**
   * Check if the defined bucket exists. Being able to connect means the configuration is good
   * and the storage client will work.
   */
  async getReadiness() {
    try {
      await this.storageClient.bucket(this.bucketName).getMetadata();
      this.logger.info(
        `Successfully connected to the GCS bucket ${this.bucketName}.`
      );
      return {
        isAvailable: true
      };
    } catch (err) {
      errors.assertError(err);
      this.logger.error(
        `Could not retrieve metadata about the GCS bucket ${this.bucketName}. Make sure the bucket exists. Also make sure that authentication is setup either by explicitly defining techdocs.publisher.googleGcs.credentials in app config or by using environment variables. Refer to https://backstage.io/docs/features/techdocs/using-cloud-storage`
      );
      this.logger.error(`from GCS client library: ${err.message}`);
      return { isAvailable: false };
    }
  }
  /**
   * Upload all the files from the generated `directory` to the GCS bucket.
   * Directory structure used in the bucket is - entityNamespace/entityKind/entityName/index.html
   */
  async publish({
    entity,
    directory
  }) {
    const objects = [];
    const useLegacyPathCasing = this.legacyPathCasing;
    const bucket = this.storageClient.bucket(this.bucketName);
    const bucketRootPath = this.bucketRootPath;
    let existingFiles = [];
    try {
      const remoteFolder = helpers.getCloudPathForLocalPath(
        entity,
        void 0,
        useLegacyPathCasing,
        bucketRootPath
      );
      existingFiles = await this.getFilesForFolder(remoteFolder);
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
          const destination = helpers.getCloudPathForLocalPath(
            entity,
            relativeFilePath,
            useLegacyPathCasing,
            bucketRootPath
          );
          objects.push(destination);
          return await bucket.upload(absoluteFilePath, { destination });
        },
        absoluteFilesToUpload,
        { concurrencyLimit: 10 }
      );
      this.logger.info(
        `Successfully uploaded all the generated files for Entity ${entity.metadata.name}. Total number of files: ${absoluteFilesToUpload.length}`
      );
    } catch (e) {
      const errorMessage = `Unable to upload file(s) to Google Cloud Storage. ${e}`;
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
          return await bucket.file(relativeFilePath).delete();
        },
        staleFiles,
        { concurrencyLimit: 10 }
      );
      this.logger.info(
        `Successfully deleted stale files for Entity ${entity.metadata.name}. Total number of files: ${staleFiles.length}`
      );
    } catch (error) {
      const errorMessage = `Unable to delete file(s) from Google Cloud Storage. ${error}`;
      this.logger.error(errorMessage);
    }
    return { objects };
  }
  fetchTechDocsMetadata(entityName) {
    return new Promise((resolve, reject) => {
      const entityTriplet = `${entityName.namespace}/${entityName.kind}/${entityName.name}`;
      const entityDir = this.legacyPathCasing ? entityTriplet : helpers.lowerCaseEntityTriplet(entityTriplet);
      const entityRootDir = path__default.default.posix.join(this.bucketRootPath, entityDir);
      if (!helpers.isValidContentPath(this.bucketRootPath, entityRootDir)) {
        this.logger.error(
          `Invalid content path found while fetching TechDocs metadata: ${entityRootDir}`
        );
        reject(new Error(`Metadata Not Found`));
      }
      const fileStreamChunks = [];
      this.storageClient.bucket(this.bucketName).file(`${entityRootDir}/techdocs_metadata.json`).createReadStream().on("error", (err) => {
        this.logger.error(err.message);
        reject(err);
      }).on("data", (chunk) => {
        fileStreamChunks.push(chunk);
      }).on("end", () => {
        const techdocsMetadataJson = Buffer.concat(fileStreamChunks).toString("utf-8");
        resolve(JSON5__default.default.parse(techdocsMetadataJson));
      });
    });
  }
  /**
   * Express route middleware to serve static files on a route in techdocs-backend.
   */
  docsRouter() {
    return (req, res) => {
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
      this.storageClient.bucket(this.bucketName).file(filePath).createReadStream().on("pipe", () => {
        res.writeHead(200, responseHeaders);
      }).on("error", (err) => {
        this.logger.warn(
          `TechDocs Google GCS router failed to serve content from bucket ${this.bucketName} at path ${filePath}: ${err.message}`
        );
        if (!res.headersSent) {
          res.status(404).send("File Not Found");
        } else {
          res.destroy();
        }
      }).pipe(res);
    };
  }
  /**
   * A helper function which checks if index.html of an Entity's docs site is available. This
   * can be used to verify if there are any pre-generated docs available to serve.
   */
  async hasDocsBeenGenerated(entity) {
    return new Promise((resolve) => {
      const entityTriplet = `${entity.metadata.namespace}/${entity.kind}/${entity.metadata.name}`;
      const entityDir = this.legacyPathCasing ? entityTriplet : helpers.lowerCaseEntityTriplet(entityTriplet);
      const entityRootDir = path__default.default.posix.join(this.bucketRootPath, entityDir);
      if (!helpers.isValidContentPath(this.bucketRootPath, entityRootDir)) {
        this.logger.error(
          `Invalid content path found while checking if docs have been generated: ${entityRootDir}`
        );
        resolve(false);
      }
      this.storageClient.bucket(this.bucketName).file(`${entityRootDir}/index.html`).exists().then((response) => {
        resolve(response[0]);
      }).catch(() => {
        resolve(false);
      });
    });
  }
  migrateDocsCase({ removeOriginal = false, concurrency = 25 }) {
    return new Promise((resolve, reject) => {
      const allFileMetadata = this.storageClient.bucket(this.bucketName).getFilesStream();
      const migrateFiles = new GoogleMigration.MigrateWriteStream(
        this.logger,
        removeOriginal,
        concurrency
      );
      migrateFiles.on("finish", resolve).on("error", reject);
      allFileMetadata.pipe(migrateFiles).on("error", (error) => {
        migrateFiles.destroy();
        reject(error);
      });
    });
  }
  getFilesForFolder(folder) {
    const fileMetadataStream = this.storageClient.bucket(this.bucketName).getFilesStream({ prefix: folder });
    return new Promise((resolve, reject) => {
      const files = [];
      fileMetadataStream.on("error", (error) => {
        reject(error);
      });
      fileMetadataStream.on("data", (file) => {
        files.push(file.name);
      });
      fileMetadataStream.on("end", () => {
        resolve(files);
      });
    });
  }
}

exports.GoogleGCSPublish = GoogleGCSPublish;
//# sourceMappingURL=googleStorage.cjs.js.map
