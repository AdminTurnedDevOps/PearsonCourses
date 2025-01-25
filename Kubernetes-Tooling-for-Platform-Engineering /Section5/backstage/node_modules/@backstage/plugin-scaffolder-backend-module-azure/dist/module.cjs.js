'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var integration = require('@backstage/integration');
var alpha = require('@backstage/plugin-scaffolder-node/alpha');
var azure = require('./actions/azure.cjs.js');

const azureModule = backendPluginApi.createBackendModule({
  moduleId: "azure",
  pluginId: "scaffolder",
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolderActions: alpha.scaffolderActionsExtensionPoint,
        config: backendPluginApi.coreServices.rootConfig
      },
      async init({ scaffolderActions, config }) {
        const integrations = integration.ScmIntegrations.fromConfig(config);
        scaffolderActions.addActions(
          azure.createPublishAzureAction({
            integrations,
            config
          })
        );
      }
    });
  }
});

exports.azureModule = azureModule;
//# sourceMappingURL=module.cjs.js.map
