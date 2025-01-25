'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var catalogModel = require('@backstage/catalog-model');
var express = require('express');
var fs = require('fs-extra');
var os = require('os');
var createLimiter = require('p-limit');
var path = require('path');
var helpers = require('./helpers.cjs.js');
var errors = require('@backstage/errors');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var express__default = /*#__PURE__*/_interopDefaultCompat(express);
var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);
var os__default = /*#__PURE__*/_interopDefaultCompat(os);
var createLimiter__default = /*#__PURE__*/_interopDefaultCompat(createLimiter);
var path__default = /*#__PURE__*/_interopDefaultCompat(path);

class LocalPublish {
  legacyPathCasing;
  logger;
  discovery;
  staticDocsDir;
  constructor(options) {
    this.logger = options.logger;
    this.discovery = options.discovery;
    this.legacyPathCasing = options.legacyPathCasing;
    this.staticDocsDir = options.staticDocsDir;
  }
  static fromConfig(config, logger, discovery) {
    const legacyPathCasing = config.getOptionalBoolean(
      "techdocs.legacyUseCaseSensitiveTripletPaths"
    ) || false;
    let staticDocsDir = config.getOptionalString(
      "techdocs.publisher.local.publishDirectory"
    );
    if (!staticDocsDir) {
      try {
        staticDocsDir = backendPluginApi.resolvePackagePath(
          "@backstage/plugin-techdocs-backend",
          "static/docs"
        );
      } catch (err) {
        staticDocsDir = os__default.default.tmpdir();
      }
    }
    return new LocalPublish({
      logger,
      discovery,
      legacyPathCasing,
      staticDocsDir
    });
  }
  async getReadiness() {
    return {
      isAvailable: true
    };
  }
  async publish({
    entity,
    directory
  }) {
    const entityNamespace = entity.metadata.namespace ?? "default";
    let publishDir;
    try {
      publishDir = this.staticEntityPathJoin(
        entityNamespace,
        entity.kind,
        entity.metadata.name
      );
    } catch (error) {
      throw new errors.ForwardedError(
        `Unable to publish TechDocs site for entity: ${catalogModel.stringifyEntityRef(
          entity
        )}`,
        error
      );
    }
    if (!fs__default.default.existsSync(publishDir)) {
      this.logger.info(`Could not find ${publishDir}, creating the directory.`);
      fs__default.default.mkdirSync(publishDir, { recursive: true });
    }
    try {
      await fs__default.default.copy(directory, publishDir);
      this.logger.info(`Published site stored at ${publishDir}`);
    } catch (error) {
      this.logger.debug(
        `Failed to copy docs from ${directory} to ${publishDir}`
      );
      throw error;
    }
    const techdocsApiUrl = await this.discovery.getBaseUrl("techdocs");
    const publishedFilePaths = (await helpers.getFileTreeRecursively(publishDir)).map(
      (abs) => {
        return abs.split(`${this.staticDocsDir}/`)[1];
      }
    );
    return {
      remoteUrl: `${techdocsApiUrl}/static/docs/${encodeURIComponent(
        entity.metadata.name
      )}`,
      objects: publishedFilePaths
    };
  }
  async fetchTechDocsMetadata(entityName) {
    let metadataPath;
    try {
      metadataPath = this.staticEntityPathJoin(
        entityName.namespace,
        entityName.kind,
        entityName.name,
        "techdocs_metadata.json"
      );
    } catch (err) {
      throw new errors.ForwardedError(
        `Unexpected entity when fetching metadata: ${catalogModel.stringifyEntityRef(
          entityName
        )}`,
        err
      );
    }
    try {
      return await fs__default.default.readJson(metadataPath);
    } catch (err) {
      throw new errors.ForwardedError(
        `Unable to read techdocs_metadata.json at ${metadataPath}. Error: ${err}`,
        err
      );
    }
  }
  docsRouter() {
    const router = express__default.default.Router();
    router.use((req, res, next) => {
      if (this.legacyPathCasing) {
        return next();
      }
      const [_, namespace, kind, name, ...rest] = req.path.split("/");
      if (!namespace || !kind || !name) {
        return next();
      }
      const newPath = [
        _,
        namespace.toLowerCase(),
        kind.toLowerCase(),
        name.toLowerCase(),
        ...rest
      ].join("/");
      if (newPath === req.path) {
        return next();
      }
      return res.redirect(301, req.baseUrl + newPath);
    });
    router.use(
      express__default.default.static(this.staticDocsDir, {
        // Handle content-type header the same as all other publishers.
        setHeaders: (res, filePath) => {
          const fileExtension = path__default.default.extname(filePath);
          const headers = helpers.getHeadersForFileExtension(fileExtension);
          for (const [header, value] of Object.entries(headers)) {
            res.setHeader(header, value);
          }
        }
      })
    );
    return router;
  }
  async hasDocsBeenGenerated(entity) {
    const namespace = entity.metadata.namespace ?? "default";
    try {
      const indexHtmlPath = this.staticEntityPathJoin(
        namespace,
        entity.kind,
        entity.metadata.name,
        "index.html"
      );
      await fs__default.default.access(indexHtmlPath, fs__default.default.constants.F_OK);
      return true;
    } catch (err) {
      if (err.name === "NotAllowedError") {
        this.logger.error(
          `Unexpected entity when checking if generated: ${catalogModel.stringifyEntityRef(
            entity
          )}`
        );
      }
      return false;
    }
  }
  /**
   * This code will never run in practice. It is merely here to illustrate how
   * to implement this method for other storage providers.
   */
  async migrateDocsCase({
    removeOriginal = false,
    concurrency = 25
  }) {
    const files = await helpers.getFileTreeRecursively(this.staticDocsDir);
    const limit = createLimiter__default.default(concurrency);
    await Promise.all(
      files.map(
        (f) => limit(async (file) => {
          const relativeFile = file.replace(
            `${this.staticDocsDir}${path__default.default.sep}`,
            ""
          );
          const newFile = helpers.lowerCaseEntityTripletInStoragePath(relativeFile);
          if (relativeFile === newFile) {
            return;
          }
          await new Promise((resolve) => {
            const migrate = removeOriginal ? fs__default.default.move : fs__default.default.copyFile;
            this.logger.debug(`Migrating ${relativeFile}`);
            migrate(file, newFile, (err) => {
              if (err) {
                this.logger.warn(
                  `Unable to migrate ${relativeFile}: ${err.message}`
                );
              }
              resolve();
            });
          });
        }, f)
      )
    );
  }
  /**
   * Utility wrapper around path.join(), used to control legacy case logic.
   */
  staticEntityPathJoin(...allParts) {
    let staticEntityPath = this.staticDocsDir;
    allParts.map((part) => part.split(path__default.default.sep)).flat().forEach((part, index) => {
      if (index < 3) {
        staticEntityPath = backendPluginApi.resolveSafeChildPath(
          staticEntityPath,
          this.legacyPathCasing ? part : part.toLowerCase()
        );
        return;
      }
      staticEntityPath = backendPluginApi.resolveSafeChildPath(staticEntityPath, part);
    });
    return staticEntityPath;
  }
}

exports.LocalPublish = LocalPublish;
//# sourceMappingURL=local.cjs.js.map
