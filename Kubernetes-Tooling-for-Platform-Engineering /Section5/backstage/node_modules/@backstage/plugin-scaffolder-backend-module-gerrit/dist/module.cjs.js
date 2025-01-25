'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var alpha = require('@backstage/plugin-scaffolder-node/alpha');
var gerrit = require('./actions/gerrit.cjs.js');
var gerritReview = require('./actions/gerritReview.cjs.js');
var integration = require('@backstage/integration');

const gerritModule = backendPluginApi.createBackendModule({
  pluginId: "scaffolder",
  moduleId: "geritt",
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolder: alpha.scaffolderActionsExtensionPoint,
        config: backendPluginApi.coreServices.rootConfig
      },
      async init({ scaffolder, config }) {
        const integrations = integration.ScmIntegrations.fromConfig(config);
        scaffolder.addActions(
          gerrit.createPublishGerritAction({ integrations, config }),
          gerritReview.createPublishGerritReviewAction({ integrations, config })
        );
      }
    });
  }
});

exports.gerritModule = gerritModule;
//# sourceMappingURL=module.cjs.js.map
