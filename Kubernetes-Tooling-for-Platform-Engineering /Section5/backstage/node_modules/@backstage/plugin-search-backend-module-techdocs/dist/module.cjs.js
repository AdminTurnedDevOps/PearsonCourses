'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var backendPluginApi = require('@backstage/backend-plugin-api');
var alpha = require('@backstage/plugin-catalog-node/alpha');
var pluginSearchBackendModuleTechdocs = require('@backstage/plugin-search-backend-module-techdocs');
var alpha$1 = require('@backstage/plugin-search-backend-node/alpha');

const techdocsCollatorEntityTransformerExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "search.techdocsCollator.transformer"
});
var feature = backendPluginApi.createBackendModule({
  pluginId: "search",
  moduleId: "techdocs-collator",
  register(env) {
    let entityTransformer;
    let documentTransformer;
    env.registerExtensionPoint(
      techdocsCollatorEntityTransformerExtensionPoint,
      {
        setTransformer(newTransformer) {
          if (entityTransformer) {
            throw new Error(
              "TechDocs collator entity transformer may only be set once"
            );
          }
          entityTransformer = newTransformer;
        },
        setDocumentTransformer(newTransformer) {
          if (documentTransformer) {
            throw new Error(
              "TechDocs collator document transformer may only be set once"
            );
          }
          documentTransformer = newTransformer;
        }
      }
    );
    env.registerInit({
      deps: {
        config: backendPluginApi.coreServices.rootConfig,
        logger: backendPluginApi.coreServices.logger,
        auth: backendPluginApi.coreServices.auth,
        httpAuth: backendPluginApi.coreServices.httpAuth,
        discovery: backendPluginApi.coreServices.discovery,
        scheduler: backendPluginApi.coreServices.scheduler,
        catalog: alpha.catalogServiceRef,
        indexRegistry: alpha$1.searchIndexRegistryExtensionPoint
      },
      async init({
        config,
        logger,
        auth,
        httpAuth,
        discovery,
        scheduler,
        catalog,
        indexRegistry
      }) {
        const defaultSchedule = {
          frequency: { minutes: 10 },
          timeout: { minutes: 15 },
          initialDelay: { seconds: 3 }
        };
        const schedule = config.has("search.collators.techdocs.schedule") ? backendPluginApi.readSchedulerServiceTaskScheduleDefinitionFromConfig(
          config.getConfig("search.collators.techdocs.schedule")
        ) : defaultSchedule;
        indexRegistry.addCollator({
          schedule: scheduler.createScheduledTaskRunner(schedule),
          factory: pluginSearchBackendModuleTechdocs.DefaultTechDocsCollatorFactory.fromConfig(config, {
            discovery,
            auth,
            httpAuth,
            logger,
            catalogClient: catalog,
            entityTransformer,
            documentTransformer
          })
        });
      }
    });
  }
});

exports.default = feature;
exports.techdocsCollatorEntityTransformerExtensionPoint = techdocsCollatorEntityTransformerExtensionPoint;
//# sourceMappingURL=module.cjs.js.map
