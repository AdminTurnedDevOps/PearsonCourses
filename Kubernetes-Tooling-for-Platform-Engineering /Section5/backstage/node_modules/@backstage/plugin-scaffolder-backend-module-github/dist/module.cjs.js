'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var alpha = require('@backstage/plugin-scaffolder-node/alpha');
var githubActionsDispatch = require('./actions/githubActionsDispatch.cjs.js');
var githubIssuesLabel = require('./actions/githubIssuesLabel.cjs.js');
var githubRepoCreate = require('./actions/githubRepoCreate.cjs.js');
var githubRepoPush = require('./actions/githubRepoPush.cjs.js');
var githubWebhook = require('./actions/githubWebhook.cjs.js');
var githubDeployKey = require('./actions/githubDeployKey.cjs.js');
var githubEnvironment = require('./actions/githubEnvironment.cjs.js');
var githubPullRequest = require('./actions/githubPullRequest.cjs.js');
var github = require('./actions/github.cjs.js');
var githubAutolinks = require('./actions/githubAutolinks.cjs.js');
var githubPagesEnable = require('./actions/githubPagesEnable.cjs.js');
var githubBranchProtection = require('./actions/githubBranchProtection.cjs.js');
require('@backstage/errors');
var integration = require('@backstage/integration');
require('@backstage/plugin-scaffolder-node');
require('libsodium-wrappers');
var catalogClient = require('@backstage/catalog-client');

const githubModule = backendPluginApi.createBackendModule({
  pluginId: "scaffolder",
  moduleId: "github",
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolder: alpha.scaffolderActionsExtensionPoint,
        config: backendPluginApi.coreServices.rootConfig,
        discovery: backendPluginApi.coreServices.discovery,
        auth: backendPluginApi.coreServices.auth
      },
      async init({ scaffolder, config, discovery, auth }) {
        const integrations = integration.ScmIntegrations.fromConfig(config);
        const githubCredentialsProvider = integration.DefaultGithubCredentialsProvider.fromIntegrations(integrations);
        const catalogClient$1 = new catalogClient.CatalogClient({
          discoveryApi: discovery
        });
        scaffolder.addActions(
          githubActionsDispatch.createGithubActionsDispatchAction({
            integrations,
            githubCredentialsProvider
          }),
          githubAutolinks.createGithubAutolinksAction({
            integrations,
            githubCredentialsProvider
          }),
          githubDeployKey.createGithubDeployKeyAction({
            integrations
          }),
          githubEnvironment.createGithubEnvironmentAction({
            integrations,
            catalogClient: catalogClient$1,
            auth
          }),
          githubIssuesLabel.createGithubIssuesLabelAction({
            integrations,
            githubCredentialsProvider
          }),
          githubRepoCreate.createGithubRepoCreateAction({
            integrations,
            githubCredentialsProvider
          }),
          githubRepoPush.createGithubRepoPushAction({ integrations, config }),
          githubWebhook.createGithubWebhookAction({
            integrations,
            githubCredentialsProvider
          }),
          github.createPublishGithubAction({
            integrations,
            config,
            githubCredentialsProvider
          }),
          githubPullRequest.createPublishGithubPullRequestAction({
            integrations,
            githubCredentialsProvider,
            config
          }),
          githubPagesEnable.createGithubPagesEnableAction({
            integrations,
            githubCredentialsProvider
          }),
          githubBranchProtection.createGithubBranchProtectionAction({
            integrations
          })
        );
      }
    });
  }
});

exports.githubModule = githubModule;
//# sourceMappingURL=module.cjs.js.map
