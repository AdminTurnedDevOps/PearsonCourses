'use strict';

var backendCommon = require('@backstage/backend-common');
var catalogClient = require('@backstage/catalog-client');
var catalogModel = require('@backstage/catalog-model');
var errors = require('@backstage/errors');
var pluginTechdocsNode = require('@backstage/plugin-techdocs-node');
var router = require('express-promise-router');
var integration = require('@backstage/integration');
var DocsSynchronizer = require('./DocsSynchronizer.cjs.js');
var cacheMiddleware = require('../cache/cacheMiddleware.cjs.js');
var TechDocsCache = require('../cache/TechDocsCache.cjs.js');
var CachedEntityLoader = require('./CachedEntityLoader.cjs.js');
var DefaultDocsBuildStrategy = require('./DefaultDocsBuildStrategy.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var router__default = /*#__PURE__*/_interopDefaultCompat(router);

function isOutOfTheBoxOption(opt) {
  return opt.preparers !== void 0;
}
async function createRouter(options) {
  const router = router__default.default();
  const { publisher, config, logger, discovery } = options;
  const { auth, httpAuth } = backendCommon.createLegacyAuthAdapters(options);
  const catalogClient$1 = options.catalogClient ?? new catalogClient.CatalogClient({ discoveryApi: discovery });
  const docsBuildStrategy = options.docsBuildStrategy ?? DefaultDocsBuildStrategy.DefaultDocsBuildStrategy.fromConfig(config);
  const buildLogTransport = options.buildLogTransport;
  const entityLoader = new CachedEntityLoader.CachedEntityLoader({
    catalog: catalogClient$1,
    cache: options.cache.getClient()
  });
  let cache;
  const defaultTtl = config.getOptionalNumber("techdocs.cache.ttl");
  if (defaultTtl) {
    const cacheClient = options.cache.getClient({ defaultTtl });
    cache = TechDocsCache.TechDocsCache.fromConfig(config, { cache: cacheClient, logger });
  }
  const scmIntegrations = integration.ScmIntegrations.fromConfig(config);
  const docsSynchronizer = new DocsSynchronizer.DocsSynchronizer({
    publisher,
    logger,
    buildLogTransport,
    config,
    scmIntegrations,
    cache
  });
  router.get("/metadata/techdocs/:namespace/:kind/:name", async (req, res) => {
    const { kind, namespace, name } = req.params;
    const entityName = { kind, namespace, name };
    const credentials = await httpAuth.credentials(req);
    const { token } = await auth.getPluginRequestToken({
      onBehalfOf: credentials,
      targetPluginId: "catalog"
    });
    const entity = await entityLoader.load(entityName, token);
    if (!entity) {
      throw new errors.NotFoundError(
        `Unable to get metadata for '${catalogModel.stringifyEntityRef(entityName)}'`
      );
    }
    try {
      const techdocsMetadata = await publisher.fetchTechDocsMetadata(
        entityName
      );
      res.json(techdocsMetadata);
    } catch (err) {
      logger.info(
        `Unable to get metadata for '${catalogModel.stringifyEntityRef(
          entityName
        )}' with error ${err}`
      );
      throw new errors.NotFoundError(
        `Unable to get metadata for '${catalogModel.stringifyEntityRef(entityName)}'`,
        err
      );
    }
  });
  router.get("/metadata/entity/:namespace/:kind/:name", async (req, res) => {
    const { kind, namespace, name } = req.params;
    const entityName = { kind, namespace, name };
    const credentials = await httpAuth.credentials(req);
    const { token } = await auth.getPluginRequestToken({
      onBehalfOf: credentials,
      targetPluginId: "catalog"
    });
    const entity = await entityLoader.load(entityName, token);
    if (!entity) {
      throw new errors.NotFoundError(
        `Unable to get metadata for '${catalogModel.stringifyEntityRef(entityName)}'`
      );
    }
    try {
      const locationMetadata = pluginTechdocsNode.getLocationForEntity(entity, scmIntegrations);
      res.json({ ...entity, locationMetadata });
    } catch (err) {
      logger.info(
        `Unable to get metadata for '${catalogModel.stringifyEntityRef(
          entityName
        )}' with error ${err}`
      );
      throw new errors.NotFoundError(
        `Unable to get metadata for '${catalogModel.stringifyEntityRef(entityName)}'`,
        err
      );
    }
  });
  router.get("/sync/:namespace/:kind/:name", async (req, res) => {
    const { kind, namespace, name } = req.params;
    const credentials = await httpAuth.credentials(req);
    const { token } = await auth.getPluginRequestToken({
      onBehalfOf: credentials,
      targetPluginId: "catalog"
    });
    const entity = await entityLoader.load({ kind, namespace, name }, token);
    if (!entity?.metadata?.uid) {
      throw new errors.NotFoundError("Entity metadata UID missing");
    }
    const responseHandler = createEventStream(res);
    const shouldBuild = await docsBuildStrategy.shouldBuild({ entity });
    if (!shouldBuild) {
      if (cache) {
        const { token: techDocsToken } = await auth.getPluginRequestToken({
          onBehalfOf: await auth.getOwnServiceCredentials(),
          targetPluginId: "techdocs"
        });
        await docsSynchronizer.doCacheSync({
          responseHandler,
          discovery,
          token: techDocsToken,
          entity
        });
        return;
      }
      responseHandler.finish({ updated: false });
      return;
    }
    if (isOutOfTheBoxOption(options)) {
      const { preparers, generators } = options;
      await docsSynchronizer.doSync({
        responseHandler,
        entity,
        preparers,
        generators
      });
      return;
    }
    responseHandler.error(
      new Error(
        "Invalid configuration. docsBuildStrategy.shouldBuild returned 'true', but no 'preparer' was provided to the router initialization."
      )
    );
  });
  if (config.getOptionalBoolean("permission.enabled")) {
    router.use(
      "/static/docs/:namespace/:kind/:name",
      async (req, _res, next) => {
        const { kind, namespace, name } = req.params;
        const entityName = { kind, namespace, name };
        const credentials = await httpAuth.credentials(req, {
          allowLimitedAccess: true
        });
        const { token } = await auth.getPluginRequestToken({
          onBehalfOf: credentials,
          targetPluginId: "catalog"
        });
        const entity = await entityLoader.load(entityName, token);
        if (!entity) {
          throw new errors.NotFoundError(
            `Entity not found for ${catalogModel.stringifyEntityRef(entityName)}`
          );
        }
        next();
      }
    );
  }
  if (cache) {
    router.use(cacheMiddleware.createCacheMiddleware({ logger, cache }));
  }
  router.use("/static/docs", publisher.docsRouter());
  return router;
}
function createEventStream(res) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream"
  });
  res.socket?.on("close", () => {
    res.end();
  });
  const send = (type, data) => {
    res.write(`event: ${type}
data: ${JSON.stringify(data)}

`);
    if (res.flush) {
      res.flush();
    }
  };
  return {
    log: (data) => {
      send("log", data);
    },
    error: (e) => {
      send("error", e.message);
      res.end();
    },
    finish: (result) => {
      send("finish", result);
      res.end();
    }
  };
}

exports.createEventStream = createEventStream;
exports.createRouter = createRouter;
//# sourceMappingURL=router.cjs.js.map
