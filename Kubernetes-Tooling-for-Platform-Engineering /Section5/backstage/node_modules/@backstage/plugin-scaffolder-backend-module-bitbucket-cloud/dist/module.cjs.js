'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var alpha = require('@backstage/plugin-scaffolder-node/alpha');
var bitbucketCloud = require('./actions/bitbucketCloud.cjs.js');
var bitbucketCloudPipelinesRun = require('./actions/bitbucketCloudPipelinesRun.cjs.js');
var bitbucketCloudPullRequest = require('./actions/bitbucketCloudPullRequest.cjs.js');
var integration = require('@backstage/integration');
var autocomplete = require('./autocomplete/autocomplete.cjs.js');

const bitbucketCloudModule = backendPluginApi.createBackendModule({
  moduleId: "bitbucketCloud",
  pluginId: "scaffolder",
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolder: alpha.scaffolderActionsExtensionPoint,
        autocomplete: alpha.scaffolderAutocompleteExtensionPoint,
        config: backendPluginApi.coreServices.rootConfig
      },
      async init({ scaffolder, config, autocomplete: autocomplete$1 }) {
        const integrations = integration.ScmIntegrations.fromConfig(config);
        scaffolder.addActions(
          bitbucketCloud.createPublishBitbucketCloudAction({ integrations, config }),
          bitbucketCloudPipelinesRun.createBitbucketPipelinesRunAction({ integrations }),
          bitbucketCloudPullRequest.createPublishBitbucketCloudPullRequestAction({
            integrations,
            config
          })
        );
        autocomplete$1.addAutocompleteProvider({
          id: "bitbucket-cloud",
          handler: autocomplete.handleAutocompleteRequest
        });
      }
    });
  }
});

exports.bitbucketCloudModule = bitbucketCloudModule;
//# sourceMappingURL=module.cjs.js.map
