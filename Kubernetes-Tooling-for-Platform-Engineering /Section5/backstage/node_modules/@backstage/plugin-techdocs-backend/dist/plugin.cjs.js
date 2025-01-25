'use strict';

var backendCommon = require('@backstage/backend-common');
var backendPluginApi = require('@backstage/backend-plugin-api');
var pluginTechdocsNode = require('@backstage/plugin-techdocs-node');
var router = require('./service/router.cjs.js');
var alpha = require('@backstage/plugin-catalog-node/alpha');

const techdocsPlugin = backendPluginApi.createBackendPlugin({
  pluginId: "techdocs",
  register(env) {
    let docsBuildStrategy;
    let buildLogTransport;
    env.registerExtensionPoint(pluginTechdocsNode.techdocsBuildsExtensionPoint, {
      setBuildStrategy(buildStrategy) {
        if (docsBuildStrategy) {
          throw new Error("DocsBuildStrategy may only be set once");
        }
        docsBuildStrategy = buildStrategy;
      },
      setBuildLogTransport(transport) {
        if (buildLogTransport) {
          throw new Error("BuildLogTransport may only be set once");
        }
        buildLogTransport = transport;
      }
    });
    let customTechdocsGenerator;
    env.registerExtensionPoint(pluginTechdocsNode.techdocsGeneratorExtensionPoint, {
      setTechdocsGenerator(generator) {
        if (customTechdocsGenerator) {
          throw new Error("TechdocsGenerator may only be set once");
        }
        customTechdocsGenerator = generator;
      }
    });
    const customPreparers = /* @__PURE__ */ new Map();
    env.registerExtensionPoint(pluginTechdocsNode.techdocsPreparerExtensionPoint, {
      registerPreparer(protocol, preparer) {
        if (customPreparers.has(protocol)) {
          throw new Error(
            `Preparer for protocol ${protocol} is already registered`
          );
        }
        customPreparers.set(protocol, preparer);
      }
    });
    let customTechdocsPublisher;
    const publisherSettings = {};
    env.registerExtensionPoint(pluginTechdocsNode.techdocsPublisherExtensionPoint, {
      registerPublisher(type, publisher) {
        if (customTechdocsPublisher) {
          throw new Error(`Publisher for type ${type} is already registered`);
        }
        customTechdocsPublisher = publisher;
      },
      registerPublisherSettings(publisher, settings) {
        publisherSettings[publisher] = settings;
      }
    });
    env.registerInit({
      deps: {
        config: backendPluginApi.coreServices.rootConfig,
        logger: backendPluginApi.coreServices.logger,
        urlReader: backendPluginApi.coreServices.urlReader,
        http: backendPluginApi.coreServices.httpRouter,
        discovery: backendPluginApi.coreServices.discovery,
        cache: backendPluginApi.coreServices.cache,
        httpAuth: backendPluginApi.coreServices.httpAuth,
        auth: backendPluginApi.coreServices.auth,
        catalog: alpha.catalogServiceRef
      },
      async init({
        config,
        logger,
        urlReader,
        http,
        discovery,
        cache,
        httpAuth,
        auth,
        catalog
      }) {
        const winstonLogger = backendCommon.loggerToWinstonLogger(logger);
        const preparers = await pluginTechdocsNode.Preparers.fromConfig(config, {
          reader: urlReader,
          logger: winstonLogger
        });
        for (const [protocol, preparer] of customPreparers.entries()) {
          preparers.register(protocol, preparer);
        }
        const generators = await pluginTechdocsNode.Generators.fromConfig(config, {
          logger: winstonLogger,
          customGenerator: customTechdocsGenerator
        });
        const publisher = await pluginTechdocsNode.Publisher.fromConfig(config, {
          logger: winstonLogger,
          discovery,
          customPublisher: customTechdocsPublisher,
          publisherSettings
        });
        await publisher.getReadiness();
        const cacheManager = backendCommon.cacheToPluginCacheManager(cache);
        http.use(
          await router.createRouter({
            logger: winstonLogger,
            cache: cacheManager,
            docsBuildStrategy,
            buildLogTransport,
            preparers,
            generators,
            publisher,
            config,
            discovery,
            httpAuth,
            auth,
            catalogClient: catalog
          })
        );
        http.addAuthPolicy({
          path: "/static",
          allow: "user-cookie"
        });
      }
    });
  }
});

exports.techdocsPlugin = techdocsPlugin;
//# sourceMappingURL=plugin.cjs.js.map
