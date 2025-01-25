'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var alpha = require('@backstage/plugin-scaffolder-node/alpha');
var bitbucketServer = require('./actions/bitbucketServer.cjs.js');
var bitbucketServerPullRequest = require('./actions/bitbucketServerPullRequest.cjs.js');
var integration = require('@backstage/integration');

const bitbucketServerModule = backendPluginApi.createBackendModule({
  moduleId: "bitbucketServer",
  pluginId: "scaffolder",
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolder: alpha.scaffolderActionsExtensionPoint,
        config: backendPluginApi.coreServices.rootConfig
      },
      async init({ scaffolder, config }) {
        const integrations = integration.ScmIntegrations.fromConfig(config);
        scaffolder.addActions(
          bitbucketServer.createPublishBitbucketServerAction({ integrations, config }),
          bitbucketServerPullRequest.createPublishBitbucketServerPullRequestAction({
            integrations,
            config
          })
        );
      }
    });
  }
});

exports.bitbucketServerModule = bitbucketServerModule;
//# sourceMappingURL=module.cjs.js.map
