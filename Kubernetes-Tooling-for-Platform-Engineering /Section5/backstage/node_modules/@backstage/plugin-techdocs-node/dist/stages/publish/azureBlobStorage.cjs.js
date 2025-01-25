'use strict';

var identity = require('@azure/identity');
var storageBlob = require('@azure/storage-blob');
var errors = require('@backstage/errors');
var JSON5 = require('json5');
var createLimiter = require('p-limit');
var path = require('path');
var helpers = require('./helpers.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var JSON5__default = /*#__PURE__*/_interopDefaultCompat(JSON5);
var createLimiter__default = /*#__PURE__*/_interopDefaultCompat(createLimiter);
var path__default = /*#__PURE__*/_interopDefaultCompat(path);

const BATCH_CONCURRENCY = 3;
class AzureBlobStoragePublish {
  storageClient;
  containerName;
  legacyPathCasing;
  logger;
  constructor(options) {
    this.storageClient = options.storageClient;
    this.containerName = options.containerName;
    this.legacyPathCasing = options.legacyPathCasing;
    this.logger = options.logger;
  }
  static fromConfig(config, logger) {
    let storageClient;
    let containerName = "";
    try {
      containerName = config.getString(
        "techdocs.publisher.azureBlobStorage.containerName"
      );
    } catch (error) {
      throw new Error(
        "Since techdocs.publisher.type is set to 'azureBlobStorage' in your app config, techdocs.publisher.azureBlobStorage.containerName is required."
      );
    }
    const legacyPathCasing = config.getOptionalBoolean(
      "techdocs.legacyUseCaseSensitiveTripletPaths"
    ) || false;
    const connectionStringKey = "techdocs.publisher.azureBlobStorage.connectionString";
    const connectionString = config.getOptionalString(connectionStringKey);
    if (connectionString) {
      logger.info(
        `Using '${connectionStringKey}' configuration to create storage client`
      );
      storageClient = storageBlob.BlobServiceClient.fromConnectionString(connectionString);
    } else {
      let accountName = "";
      try {
        accountName = config.getString(
          "techdocs.publisher.azureBlobStorage.credentials.accountName"
        );
      } catch (error) {
        throw new Error(
          "Since techdocs.publisher.type is set to 'azureBlobStorage' in your app config, techdocs.publisher.azureBlobStorage.credentials.accountName is required."
        );
      }
      const accountKey = config.getOptionalString(
        "techdocs.publisher.azureBlobStorage.credentials.accountKey"
      );
      let credential;
      if (accountKey) {
        credential = new storageBlob.StorageSharedKeyCredential(accountName, accountKey);
      } else {
        credential = new identity.DefaultAzureCredential();
      }
      storageClient = new storageBlob.BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        credential
      );
    }
    return new AzureBlobStoragePublish({
      storageClient,
      containerName,
      legacyPathCasing,
      logger
    });
  }
  async getReadiness() {
    try {
      const response = await this.storageClient.getContainerClient(this.containerName).getProperties();
      if (response._response.status === 200) {
        return {
          isAvailable: true
        };
      }
      if (response._response.status >= 400) {
        this.logger.error(
          `Failed to retrieve metadata from ${response._response.request.url} with status code ${response._response.status}.`
        );
      }
    } catch (e) {
      errors.assertError(e);
      this.logger.error(`from Azure Blob Storage client library: ${e.message}`);
    }
    this.logger.error(
      `Could not retrieve metadata about the Azure Blob Storage container ${this.containerName}. Make sure that the Azure project and container exist and the access key is setup correctly techdocs.publisher.azureBlobStorage.credentials defined in app config has correct permissions. Refer to https://backstage.io/docs/features/techdocs/using-cloud-storage`
    );
    return { isAvailable: false };
  }
  /**
   * Upload all the files from the generated `directory` to the Azure Blob Storage container.
   * Directory structure used in the container is - entityNamespace/entityKind/entityName/index.html
   */
  async publish({
    entity,
    directory
  }) {
    const objects = [];
    const useLegacyPathCasing = this.legacyPathCasing;
    const remoteFolder = helpers.getCloudPathForLocalPath(
      entity,
      void 0,
      useLegacyPathCasing
    );
    let existingFiles = [];
    try {
      existingFiles = await this.getAllBlobsFromContainer({
        prefix: remoteFolder,
        maxPageSize: BATCH_CONCURRENCY
      });
    } catch (e) {
      errors.assertError(e);
      this.logger.error(
        `Unable to list files for Entity ${entity.metadata.name}: ${e.message}`
      );
    }
    let absoluteFilesToUpload;
    let container;
    try {
      absoluteFilesToUpload = await helpers.getFileTreeRecursively(directory);
      container = this.storageClient.getContainerClient(this.containerName);
      const failedOperations = [];
      await helpers.bulkStorageOperation(
        async (absoluteFilePath) => {
          const relativeFilePath = path__default.default.normalize(
            path__default.default.relative(directory, absoluteFilePath)
          );
          const remotePath = helpers.getCloudPathForLocalPath(
            entity,
            relativeFilePath,
            useLegacyPathCasing
          );
          objects.push(remotePath);
          const response = await container.getBlockBlobClient(remotePath).uploadFile(absoluteFilePath);
          if (response._response.status >= 400) {
            failedOperations.push(
              new Error(
                `Upload failed for ${absoluteFilePath} with status code ${response._response.status}`
              )
            );
          }
          return response;
        },
        absoluteFilesToUpload,
        { concurrencyLimit: BATCH_CONCURRENCY }
      );
      if (failedOperations.length > 0) {
        throw new Error(
          failedOperations.map((r) => r.message).filter(Boolean).join(" ")
        );
      }
      this.logger.info(
        `Successfully uploaded all the generated files for Entity ${entity.metadata.name}. Total number of files: ${absoluteFilesToUpload.length}`
      );
    } catch (e) {
      const errorMessage = `Unable to upload file(s) to Azure. ${e}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    try {
      const relativeFilesToUpload = absoluteFilesToUpload.map(
        (absoluteFilePath) => helpers.getCloudPathForLocalPath(
          entity,
          path__default.default.relative(directory, absoluteFilePath),
          useLegacyPathCasing
        )
      );
      const staleFiles = helpers.getStaleFiles(relativeFilesToUpload, existingFiles);
      await helpers.bulkStorageOperation(
        async (relativeFilePath) => {
          return await container.deleteBlob(relativeFilePath);
        },
        staleFiles,
        { concurrencyLimit: BATCH_CONCURRENCY }
      );
      this.logger.info(
        `Successfully deleted stale files for Entity ${entity.metadata.name}. Total number of files: ${staleFiles.length}`
      );
    } catch (error) {
      const errorMessage = `Unable to delete file(s) from Azure. ${error}`;
      this.logger.error(errorMessage);
    }
    return { objects };
  }
  download(containerName, blobPath) {
    return new Promise((resolve, reject) => {
      const fileStreamChunks = [];
      this.storageClient.getContainerClient(containerName).getBlockBlobClient(blobPath).download().then((res) => {
        const body = res.readableStreamBody;
        if (!body) {
          reject(new Error(`Unable to parse the response data`));
          return;
        }
        body.on("error", reject).on("data", (chunk) => {
          fileStreamChunks.push(chunk);
        }).on("end", () => {
          resolve(Buffer.concat(fileStreamChunks));
        });
      }).catch(reject);
    });
  }
  async fetchTechDocsMetadata(entityName) {
    const entityTriplet = `${entityName.namespace}/${entityName.kind}/${entityName.name}`;
    const entityRootDir = this.legacyPathCasing ? entityTriplet : helpers.lowerCaseEntityTriplet(entityTriplet);
    try {
      const techdocsMetadataJson = await this.download(
        this.containerName,
        `${entityRootDir}/techdocs_metadata.json`
      );
      if (!techdocsMetadataJson) {
        throw new Error(
          `Unable to parse the techdocs metadata file ${entityRootDir}/techdocs_metadata.json.`
        );
      }
      const techdocsMetadata = JSON5__default.default.parse(
        techdocsMetadataJson.toString("utf-8")
      );
      return techdocsMetadata;
    } catch (e) {
      throw new errors.ForwardedError("TechDocs metadata fetch failed", e);
    }
  }
  /**
   * Express route middleware to serve static files on a route in techdocs-backend.
   */
  docsRouter() {
    return (req, res) => {
      const decodedUri = decodeURI(req.path.replace(/^\//, ""));
      const filePath = this.legacyPathCasing ? decodedUri : helpers.lowerCaseEntityTripletInStoragePath(decodedUri);
      const fileExtension = path__default.default.extname(filePath);
      const responseHeaders = helpers.getHeadersForFileExtension(fileExtension);
      this.download(this.containerName, filePath).then((fileContent) => {
        for (const [headerKey, headerValue] of Object.entries(
          responseHeaders
        )) {
          res.setHeader(headerKey, headerValue);
        }
        res.send(fileContent);
      }).catch((e) => {
        this.logger.warn(
          `TechDocs Azure router failed to serve content from container ${this.containerName} at path ${filePath}: ${e.message}`
        );
        res.status(404).send("File Not Found");
      });
    };
  }
  /**
   * A helper function which checks if index.html of an Entity's docs site is available. This
   * can be used to verify if there are any pre-generated docs available to serve.
   */
  hasDocsBeenGenerated(entity) {
    const entityTriplet = `${entity.metadata.namespace}/${entity.kind}/${entity.metadata.name}`;
    const entityRootDir = this.legacyPathCasing ? entityTriplet : helpers.lowerCaseEntityTriplet(entityTriplet);
    return this.storageClient.getContainerClient(this.containerName).getBlockBlobClient(`${entityRootDir}/index.html`).exists();
  }
  async renameBlob(originalName, newName, removeOriginal = false) {
    const container = this.storageClient.getContainerClient(this.containerName);
    const blob = container.getBlobClient(newName);
    const { url } = container.getBlobClient(originalName);
    const response = await blob.beginCopyFromURL(url);
    await response.pollUntilDone();
    if (removeOriginal) {
      await container.deleteBlob(originalName);
    }
  }
  async renameBlobToLowerCase(originalPath, removeOriginal) {
    let newPath;
    try {
      newPath = helpers.lowerCaseEntityTripletInStoragePath(originalPath);
    } catch (e) {
      errors.assertError(e);
      this.logger.warn(e.message);
      return;
    }
    if (originalPath === newPath) return;
    try {
      this.logger.debug(`Migrating ${originalPath}`);
      await this.renameBlob(originalPath, newPath, removeOriginal);
    } catch (e) {
      errors.assertError(e);
      this.logger.warn(`Unable to migrate ${originalPath}: ${e.message}`);
    }
  }
  async migrateDocsCase({
    removeOriginal = false,
    concurrency = 25
  }) {
    const promises = [];
    const limiter = createLimiter__default.default(concurrency);
    const container = this.storageClient.getContainerClient(this.containerName);
    for await (const blob of container.listBlobsFlat()) {
      promises.push(
        limiter(
          this.renameBlobToLowerCase.bind(this),
          blob.name,
          removeOriginal
        )
      );
    }
    await Promise.all(promises);
  }
  async getAllBlobsFromContainer({
    prefix,
    maxPageSize
  }) {
    const blobs = [];
    const container = this.storageClient.getContainerClient(this.containerName);
    let iterator = container.listBlobsFlat({ prefix }).byPage({ maxPageSize });
    let response = (await iterator.next()).value;
    do {
      for (const blob of response?.segment?.blobItems ?? []) {
        blobs.push(blob.name);
      }
      iterator = container.listBlobsFlat({ prefix }).byPage({ continuationToken: response.continuationToken, maxPageSize });
      response = (await iterator.next()).value;
    } while (response && response.continuationToken);
    return blobs;
  }
}

exports.AzureBlobStoragePublish = AzureBlobStoragePublish;
//# sourceMappingURL=azureBlobStorage.cjs.js.map
