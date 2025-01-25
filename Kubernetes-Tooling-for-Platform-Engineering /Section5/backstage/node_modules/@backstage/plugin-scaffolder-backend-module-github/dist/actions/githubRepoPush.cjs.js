'use strict';

var errors = require('@backstage/errors');
var octokit = require('octokit');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var helpers = require('./helpers.cjs.js');
var inputProperties = require('./inputProperties.cjs.js');
var outputProperties = require('./outputProperties.cjs.js');
var githubRepoPush_examples = require('./githubRepoPush.examples.cjs.js');

function createGithubRepoPushAction(options) {
  const { integrations, config, githubCredentialsProvider } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "github:repo:push",
    description: "Initializes a git repository of contents in workspace and publishes it to GitHub.",
    examples: githubRepoPush_examples.examples,
    schema: {
      input: {
        type: "object",
        required: ["repoUrl"],
        properties: {
          repoUrl: inputProperties.repoUrl,
          requireCodeOwnerReviews: inputProperties.requireCodeOwnerReviews,
          dismissStaleReviews: inputProperties.dismissStaleReviews,
          requiredStatusCheckContexts: inputProperties.requiredStatusCheckContexts,
          bypassPullRequestAllowances: inputProperties.bypassPullRequestAllowances,
          requiredApprovingReviewCount: inputProperties.requiredApprovingReviewCount,
          restrictions: inputProperties.restrictions,
          requireBranchesToBeUpToDate: inputProperties.requireBranchesToBeUpToDate,
          requiredConversationResolution: inputProperties.requiredConversationResolution,
          requireLastPushApproval: inputProperties.requireLastPushApproval,
          defaultBranch: inputProperties.defaultBranch,
          protectDefaultBranch: inputProperties.protectDefaultBranch,
          protectEnforceAdmins: inputProperties.protectEnforceAdmins,
          gitCommitMessage: inputProperties.gitCommitMessage,
          gitAuthorName: inputProperties.gitAuthorName,
          gitAuthorEmail: inputProperties.gitAuthorEmail,
          sourcePath: inputProperties.sourcePath,
          token: inputProperties.token,
          requiredCommitSigning: inputProperties.requiredCommitSigning,
          requiredLinearHistory: inputProperties.requiredLinearHistory
        }
      },
      output: {
        type: "object",
        properties: {
          remoteUrl: outputProperties.remoteUrl,
          repoContentsUrl: outputProperties.repoContentsUrl,
          commitHash: outputProperties.commitHash
        }
      }
    },
    async handler(ctx) {
      const {
        repoUrl,
        defaultBranch = "master",
        protectDefaultBranch = true,
        protectEnforceAdmins = true,
        gitCommitMessage = "initial commit",
        gitAuthorName,
        gitAuthorEmail,
        requireCodeOwnerReviews = false,
        dismissStaleReviews = false,
        bypassPullRequestAllowances,
        requiredApprovingReviewCount = 1,
        restrictions,
        requiredStatusCheckContexts = [],
        requireBranchesToBeUpToDate = true,
        requiredConversationResolution = false,
        requireLastPushApproval = false,
        token: providedToken,
        requiredCommitSigning = false,
        requiredLinearHistory = false
      } = ctx.input;
      const { owner, repo } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
      if (!owner) {
        throw new errors.InputError("Invalid repository owner provided in repoUrl");
      }
      const octokitOptions = await helpers.getOctokitOptions({
        integrations,
        credentialsProvider: githubCredentialsProvider,
        token: providedToken,
        repoUrl
      });
      const client = new octokit.Octokit(octokitOptions);
      const targetRepo = await client.rest.repos.get({ owner, repo });
      const remoteUrl = targetRepo.data.clone_url;
      const repoContentsUrl = `${targetRepo.data.html_url}/blob/${defaultBranch}`;
      const { commitHash } = await helpers.initRepoPushAndProtect(
        remoteUrl,
        octokitOptions.auth,
        ctx.workspacePath,
        ctx.input.sourcePath,
        defaultBranch,
        protectDefaultBranch,
        protectEnforceAdmins,
        owner,
        client,
        repo,
        requireCodeOwnerReviews,
        bypassPullRequestAllowances,
        requiredApprovingReviewCount,
        restrictions,
        requiredStatusCheckContexts,
        requireBranchesToBeUpToDate,
        requiredConversationResolution,
        requireLastPushApproval,
        config,
        ctx.logger,
        gitCommitMessage,
        gitAuthorName,
        gitAuthorEmail,
        dismissStaleReviews,
        requiredCommitSigning,
        requiredLinearHistory
      );
      ctx.output("remoteUrl", remoteUrl);
      ctx.output("repoContentsUrl", repoContentsUrl);
      ctx.output("commitHash", commitHash);
    }
  });
}

exports.createGithubRepoPushAction = createGithubRepoPushAction;
//# sourceMappingURL=githubRepoPush.cjs.js.map
