'use strict';

var catalogModel = require('@backstage/catalog-model');
var errors = require('@backstage/errors');
var pluginTechdocsNode = require('@backstage/plugin-techdocs-node');
var fs = require('fs-extra');
var os = require('os');
var path = require('path');
var BuildMetadataStorage = require('./BuildMetadataStorage.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);
var os__default = /*#__PURE__*/_interopDefaultCompat(os);
var path__default = /*#__PURE__*/_interopDefaultCompat(path);

class DocsBuilder {
  preparer;
  generator;
  publisher;
  entity;
  logger;
  config;
  scmIntegrations;
  logStream;
  cache;
  constructor({
    preparers,
    generators,
    publisher,
    entity,
    logger,
    config,
    scmIntegrations,
    logStream,
    cache
  }) {
    this.preparer = preparers.get(entity);
    this.generator = generators.get(entity);
    this.publisher = publisher;
    this.entity = entity;
    this.logger = logger;
    this.config = config;
    this.scmIntegrations = scmIntegrations;
    this.logStream = logStream;
    this.cache = cache;
  }
  /**
   * Build the docs and return whether they have been newly generated or have been cached
   * @returns true, if the docs have been built. false, if the cached docs are still up-to-date.
   */
  async build() {
    if (!this.entity.metadata.uid) {
      throw new Error(
        "Trying to build documentation for entity not in software catalog"
      );
    }
    this.logger.info(
      `Step 1 of 3: Preparing docs for entity ${catalogModel.stringifyEntityRef(
        this.entity
      )}`
    );
    let storedEtag;
    if (await this.publisher.hasDocsBeenGenerated(this.entity)) {
      try {
        storedEtag = (await this.publisher.fetchTechDocsMetadata({
          namespace: this.entity.metadata.namespace ?? catalogModel.DEFAULT_NAMESPACE,
          kind: this.entity.kind,
          name: this.entity.metadata.name
        })).etag;
      } catch (err) {
        this.logger.warn(
          `Unable to read techdocs_metadata.json, proceeding with fresh build, error ${err}.`
        );
      }
    }
    let preparedDir;
    let newEtag;
    try {
      const preparerResponse = await this.preparer.prepare(this.entity, {
        etag: storedEtag,
        logger: this.logger
      });
      preparedDir = preparerResponse.preparedDir;
      newEtag = preparerResponse.etag;
    } catch (err) {
      if (errors.isError(err) && err.name === "NotModifiedError") {
        new BuildMetadataStorage.BuildMetadataStorage(this.entity.metadata.uid).setLastUpdated();
        this.logger.debug(
          `Docs for ${catalogModel.stringifyEntityRef(
            this.entity
          )} are unmodified. Using cache, skipping generate and prepare`
        );
        return false;
      }
      throw err;
    }
    this.logger.info(
      `Prepare step completed for entity ${catalogModel.stringifyEntityRef(
        this.entity
      )}, stored at ${preparedDir}`
    );
    this.logger.info(
      `Step 2 of 3: Generating docs for entity ${catalogModel.stringifyEntityRef(
        this.entity
      )}`
    );
    const workingDir = this.config.getOptionalString(
      "backend.workingDirectory"
    );
    const tmpdirPath = workingDir || os__default.default.tmpdir();
    const tmpdirResolvedPath = fs__default.default.realpathSync(tmpdirPath);
    const outputDir = await fs__default.default.mkdtemp(
      path__default.default.join(tmpdirResolvedPath, "techdocs-tmp-")
    );
    const parsedLocationAnnotation = pluginTechdocsNode.getLocationForEntity(
      this.entity,
      this.scmIntegrations
    );
    await this.generator.run({
      inputDir: preparedDir,
      outputDir,
      parsedLocationAnnotation,
      etag: newEtag,
      logger: this.logger,
      logStream: this.logStream,
      siteOptions: {
        name: this.entity.metadata.title ?? this.entity.metadata.name
      }
    });
    if (this.preparer.shouldCleanPreparedDirectory()) {
      this.logger.debug(
        `Removing prepared directory ${preparedDir} since the site has been generated`
      );
      try {
        fs__default.default.remove(preparedDir);
      } catch (error) {
        errors.assertError(error);
        this.logger.debug(`Error removing prepared directory ${error.message}`);
      }
    }
    this.logger.info(
      `Step 3 of 3: Publishing docs for entity ${catalogModel.stringifyEntityRef(
        this.entity
      )}`
    );
    const published = await this.publisher.publish({
      entity: this.entity,
      directory: outputDir
    });
    if (this.cache && published && published?.objects?.length) {
      this.logger.debug(
        `Invalidating ${published.objects.length} cache objects`
      );
      await this.cache.invalidateMultiple(published.objects);
    }
    try {
      fs__default.default.remove(outputDir);
      this.logger.debug(
        `Removing generated directory ${outputDir} since the site has been published`
      );
    } catch (error) {
      errors.assertError(error);
      this.logger.debug(`Error removing generated directory ${error.message}`);
    }
    new BuildMetadataStorage.BuildMetadataStorage(this.entity.metadata.uid).setLastUpdated();
    return true;
  }
}

exports.DocsBuilder = DocsBuilder;
//# sourceMappingURL=builder.cjs.js.map
