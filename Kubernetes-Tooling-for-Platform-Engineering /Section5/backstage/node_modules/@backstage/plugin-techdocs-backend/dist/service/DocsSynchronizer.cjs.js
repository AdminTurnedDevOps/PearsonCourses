'use strict';

var catalogModel = require('@backstage/catalog-model');
var errors = require('@backstage/errors');
var pLimit = require('p-limit');
var stream = require('stream');
var winston = require('winston');
var BuildMetadataStorage = require('../DocsBuilder/BuildMetadataStorage.cjs.js');
var builder = require('../DocsBuilder/builder.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

function _interopNamespaceCompat(e) {
  if (e && typeof e === 'object' && 'default' in e) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var pLimit__default = /*#__PURE__*/_interopDefaultCompat(pLimit);
var winston__namespace = /*#__PURE__*/_interopNamespaceCompat(winston);

class DocsSynchronizer {
  publisher;
  logger;
  buildLogTransport;
  config;
  scmIntegrations;
  cache;
  buildLimiter;
  constructor({
    publisher,
    logger,
    buildLogTransport,
    config,
    scmIntegrations,
    cache
  }) {
    this.config = config;
    this.logger = logger;
    this.buildLogTransport = buildLogTransport;
    this.publisher = publisher;
    this.scmIntegrations = scmIntegrations;
    this.cache = cache;
    this.buildLimiter = pLimit__default.default(10);
  }
  async doSync({
    responseHandler: { log, error, finish },
    entity,
    preparers,
    generators
  }) {
    const taskLogger = winston__namespace.createLogger({
      level: process.env.LOG_LEVEL || "info",
      format: winston__namespace.format.combine(
        winston__namespace.format.colorize(),
        winston__namespace.format.timestamp(),
        winston__namespace.format.simple()
      ),
      defaultMeta: {}
    });
    const logStream = new stream.PassThrough();
    logStream.on("data", async (data) => {
      log(data.toString().trim());
    });
    taskLogger.add(new winston__namespace.transports.Stream({ stream: logStream }));
    if (this.buildLogTransport) {
      taskLogger.add(this.buildLogTransport);
    }
    if (!BuildMetadataStorage.shouldCheckForUpdate(entity.metadata.uid)) {
      finish({ updated: false });
      return;
    }
    let foundDocs = false;
    try {
      const docsBuilder = new builder.DocsBuilder({
        preparers,
        generators,
        publisher: this.publisher,
        logger: taskLogger,
        entity,
        config: this.config,
        scmIntegrations: this.scmIntegrations,
        logStream,
        cache: this.cache
      });
      const interval = setInterval(() => {
        taskLogger.info(
          "The docs building process is taking a little bit longer to process this entity. Please bear with us."
        );
      }, 1e4);
      const updated = await this.buildLimiter(() => docsBuilder.build());
      clearInterval(interval);
      if (!updated) {
        finish({ updated: false });
        return;
      }
    } catch (e) {
      errors.assertError(e);
      const msg = `Failed to build the docs page for entity ${catalogModel.stringifyEntityRef(
        entity
      )}: ${e.message}`;
      taskLogger.error(msg);
      this.logger.error(msg, e);
      error(e);
      return;
    }
    for (let attempt = 0; attempt < 5; attempt++) {
      if (await this.publisher.hasDocsBeenGenerated(entity)) {
        foundDocs = true;
        break;
      }
      await new Promise((r) => setTimeout(r, 1e3));
    }
    if (!foundDocs) {
      this.logger.error(
        "Published files are taking longer to show up in storage. Something went wrong."
      );
      error(
        new errors.NotFoundError(
          "Sorry! It took too long for the generated docs to show up in storage. Are you sure the docs project is generating an `index.html` file? Otherwise, check back later."
        )
      );
      return;
    }
    finish({ updated: true });
  }
  async doCacheSync({
    responseHandler: { finish },
    discovery,
    token,
    entity
  }) {
    if (!BuildMetadataStorage.shouldCheckForUpdate(entity.metadata.uid) || !this.cache) {
      finish({ updated: false });
      return;
    }
    const baseUrl = await discovery.getBaseUrl("techdocs");
    const namespace = entity.metadata?.namespace || catalogModel.DEFAULT_NAMESPACE;
    const kind = entity.kind;
    const name = entity.metadata.name;
    const legacyPathCasing = this.config.getOptionalBoolean(
      "techdocs.legacyUseCaseSensitiveTripletPaths"
    ) || false;
    const tripletPath = `${namespace}/${kind}/${name}`;
    const entityTripletPath = `${legacyPathCasing ? tripletPath : tripletPath.toLocaleLowerCase("en-US")}`;
    try {
      const [sourceMetadata, cachedMetadata] = await Promise.all([
        this.publisher.fetchTechDocsMetadata({ namespace, kind, name }),
        fetch(
          `${baseUrl}/static/docs/${entityTripletPath}/techdocs_metadata.json`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          }
        ).then(
          (f) => f.json().catch(() => void 0)
        )
      ]);
      if (sourceMetadata.build_timestamp !== cachedMetadata.build_timestamp) {
        const files = [
          .../* @__PURE__ */ new Set([
            ...sourceMetadata.files || [],
            ...cachedMetadata.files || []
          ])
        ].map((f) => `${entityTripletPath}/${f}`);
        await this.cache.invalidateMultiple(files);
        finish({ updated: true });
      } else {
        finish({ updated: false });
      }
    } catch (e) {
      errors.assertError(e);
      this.logger.error(
        `Error syncing cache for ${entityTripletPath}: ${e.message}`
      );
      finish({ updated: false });
    } finally {
      new BuildMetadataStorage.BuildMetadataStorage(entity.metadata.uid).setLastUpdated();
    }
  }
}

exports.DocsSynchronizer = DocsSynchronizer;
//# sourceMappingURL=DocsSynchronizer.cjs.js.map
