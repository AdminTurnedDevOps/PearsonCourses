'use strict';

var fs = require('fs-extra');
var JSON5 = require('json5');
var createLimiter = require('p-limit');
var path = require('path');
var openstackSwiftSdk = require('@trendyol-js/openstack-swift-sdk');
var types = require('@trendyol-js/openstack-swift-sdk/lib/types');
var stream = require('stream');
var helpers = require('./helpers.cjs.js');
var errors = require('@backstage/errors');

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
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    } catch (e) {
      throw new errors.ForwardedError("Unable to parse the response data", e);
    }
  });
};
const bufferToStream = (buffer) => {
  const stream$1 = new stream.Readable();
  stream$1.push(buffer);
  stream$1.push(null);
  return stream$1;
};
class OpenStackSwiftPublish {
  storageClient;
  containerName;
  logger;
  constructor(options) {
    this.storageClient = options.storageClient;
    this.containerName = options.containerName;
    this.logger = options.logger;
  }
  static fromConfig(config, logger) {
    let containerName = "";
    try {
      containerName = config.getString(
        "techdocs.publisher.openStackSwift.containerName"
      );
    } catch (error) {
      throw new Error(
        "Since techdocs.publisher.type is set to 'openStackSwift' in your app config, techdocs.publisher.openStackSwift.containerName is required."
      );
    }
    const openStackSwiftConfig = config.getConfig(
      "techdocs.publisher.openStackSwift"
    );
    const storageClient = new openstackSwiftSdk.SwiftClient({
      authEndpoint: openStackSwiftConfig.getString("authUrl"),
      swiftEndpoint: openStackSwiftConfig.getString("swiftUrl"),
      credentialId: openStackSwiftConfig.getString("credentials.id"),
      secret: openStackSwiftConfig.getString("credentials.secret")
    });
    return new OpenStackSwiftPublish({ storageClient, containerName, logger });
  }
  /*
   * Check if the defined container exists. Being able to connect means the configuration is good
   * and the storage client will work.
   */
  async getReadiness() {
    try {
      const container = await this.storageClient.getContainerMetadata(
        this.containerName
      );
      if (!(container instanceof types.NotFound)) {
        this.logger.info(
          `Successfully connected to the OpenStack Swift container ${this.containerName}.`
        );
        return {
          isAvailable: true
        };
      }
      this.logger.error(
        `Could not retrieve metadata about the OpenStack Swift container ${this.containerName}. Make sure the container exists. Also make sure that authentication is setup either by explicitly defining credentials and region in techdocs.publisher.openStackSwift in app config or by using environment variables. Refer to https://backstage.io/docs/features/techdocs/using-cloud-storage`
      );
      return {
        isAvailable: false
      };
    } catch (err) {
      errors.assertError(err);
      this.logger.error(`from OpenStack client library: ${err.message}`);
      return {
        isAvailable: false
      };
    }
  }
  /**
   * Upload all the files from the generated `directory` to the OpenStack Swift container.
   * Directory structure used in the bucket is - entityNamespace/entityKind/entityName/index.html
   */
  async publish({
    entity,
    directory
  }) {
    try {
      const objects = [];
      const allFilesToUpload = await helpers.getFileTreeRecursively(directory);
      const limiter = createLimiter__default.default(10);
      const uploadPromises = [];
      for (const filePath of allFilesToUpload) {
        const relativeFilePath = path__default.default.relative(directory, filePath);
        const relativeFilePathPosix = relativeFilePath.split(path__default.default.sep).join(path__default.default.posix.sep);
        const entityRootDir = `${entity.metadata.namespace}/${entity.kind}/${entity.metadata.name}`;
        const destination = `${entityRootDir}/${relativeFilePathPosix}`;
        objects.push(destination);
        const uploadFile = limiter(async () => {
          const fileBuffer = await fs__default.default.readFile(filePath);
          const stream = bufferToStream(fileBuffer);
          return this.storageClient.upload(
            this.containerName,
            destination,
            stream
          );
        });
        uploadPromises.push(uploadFile);
      }
      await Promise.all(uploadPromises);
      this.logger.info(
        `Successfully uploaded all the generated files for Entity ${entity.metadata.name}. Total number of files: ${allFilesToUpload.length}`
      );
      return { objects };
    } catch (e) {
      const errorMessage = `Unable to upload file(s) to OpenStack Swift. ${e}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
  async fetchTechDocsMetadata(entityName) {
    return await new Promise(async (resolve, reject) => {
      const entityRootDir = `${entityName.namespace}/${entityName.kind}/${entityName.name}`;
      const downloadResponse = await this.storageClient.download(
        this.containerName,
        `${entityRootDir}/techdocs_metadata.json`
      );
      if (!(downloadResponse instanceof types.NotFound)) {
        const stream = downloadResponse.data;
        try {
          const techdocsMetadataJson = await streamToBuffer(stream);
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
      } else {
        reject({
          message: `TechDocs metadata fetch failed, The file /rootDir/${entityRootDir}/techdocs_metadata.json does not exist !`
        });
      }
    });
  }
  /**
   * Express route middleware to serve static files on a route in techdocs-backend.
   */
  docsRouter() {
    return async (req, res) => {
      const filePath = decodeURI(req.path.replace(/^\//, ""));
      const fileExtension = path__default.default.extname(filePath);
      const responseHeaders = helpers.getHeadersForFileExtension(fileExtension);
      const downloadResponse = await this.storageClient.download(
        this.containerName,
        filePath
      );
      if (!(downloadResponse instanceof types.NotFound)) {
        const stream = downloadResponse.data;
        try {
          for (const [headerKey, headerValue] of Object.entries(
            responseHeaders
          )) {
            res.setHeader(headerKey, headerValue);
          }
          res.send(await streamToBuffer(stream));
        } catch (err) {
          errors.assertError(err);
          this.logger.warn(
            `TechDocs OpenStack swift router failed to serve content from container ${this.containerName} at path ${filePath}: ${err.message}`
          );
          res.status(404).send("File Not Found");
        }
      } else {
        this.logger.warn(
          `TechDocs OpenStack swift router failed to serve content from container ${this.containerName} at path ${filePath}: Not found`
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
    const entityRootDir = `${entity.metadata.namespace}/${entity.kind}/${entity.metadata.name}`;
    try {
      const fileResponse = await this.storageClient.getMetadata(
        this.containerName,
        `${entityRootDir}/index.html`
      );
      if (!(fileResponse instanceof types.NotFound)) {
        return true;
      }
      return false;
    } catch (err) {
      errors.assertError(err);
      this.logger.warn(err.message);
      return false;
    }
  }
  async migrateDocsCase({
    removeOriginal = false,
    concurrency = 25
  }) {
    const allObjects = await this.getAllObjectsFromContainer();
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
            this.logger.debug(`Migrating ${file} to ${newPath}`);
            await this.storageClient.copy(
              this.containerName,
              file,
              this.containerName,
              newPath
            );
            if (removeOriginal) {
              await this.storageClient.delete(this.containerName, file);
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
   * Returns a list of all object keys from the configured container.
   */
  async getAllObjectsFromContainer({ prefix } = { prefix: "" }) {
    let objects = [];
    const OSS_MAX_LIMIT = Math.pow(2, 31) - 1;
    const allObjects = await this.storageClient.list(
      this.containerName,
      prefix,
      OSS_MAX_LIMIT
    );
    objects = allObjects.map((object) => object.name);
    return objects;
  }
}

exports.OpenStackSwiftPublish = OpenStackSwiftPublish;
//# sourceMappingURL=openStackSwift.cjs.js.map
