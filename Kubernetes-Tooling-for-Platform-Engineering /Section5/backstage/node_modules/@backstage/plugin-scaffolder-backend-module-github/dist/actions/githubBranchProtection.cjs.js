'use strict';

var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var githubBranchProtection_examples = require('./githubBranchProtection.examples.cjs.js');
var inputProperties = require('./inputProperties.cjs.js');
var helpers = require('./helpers.cjs.js');
var octokit = require('octokit');
var gitHelpers = require('./gitHelpers.cjs.js');

function createGithubBranchProtectionAction(options) {
  const { integrations } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "github:branch-protection:create",
    description: "Configures Branch Protection",
    examples: githubBranchProtection_examples.examples,
    schema: {
      input: {
        type: "object",
        required: ["repoUrl"],
        properties: {
          repoUrl: inputProperties.repoUrl,
          branch: {
            title: "Branch name",
            description: `The branch to protect. Defaults to the repository's default branch`,
            type: "string"
          },
          enforceAdmins: inputProperties.protectEnforceAdmins,
          requiredApprovingReviewCount: inputProperties.requiredApprovingReviewCount,
          requireCodeOwnerReviews: inputProperties.requireCodeOwnerReviews,
          dismissStaleReviews: inputProperties.dismissStaleReviews,
          bypassPullRequestAllowances: inputProperties.bypassPullRequestAllowances,
          restrictions: inputProperties.restrictions,
          requiredStatusCheckContexts: inputProperties.requiredStatusCheckContexts,
          requireBranchesToBeUpToDate: inputProperties.requireBranchesToBeUpToDate,
          requiredConversationResolution: inputProperties.requiredConversationResolution,
          requireLastPushApproval: inputProperties.requireLastPushApproval,
          requiredCommitSigning: inputProperties.requiredCommitSigning,
          requiredLinearHistory: inputProperties.requiredLinearHistory,
          token: inputProperties.token
        }
      }
    },
    async handler(ctx) {
      const {
        repoUrl,
        branch,
        enforceAdmins = true,
        requiredApprovingReviewCount = 1,
        requireCodeOwnerReviews = false,
        dismissStaleReviews = false,
        bypassPullRequestAllowances,
        restrictions,
        requiredStatusCheckContexts = [],
        requireBranchesToBeUpToDate = true,
        requiredConversationResolution = false,
        requireLastPushApproval = false,
        requiredCommitSigning = false,
        requiredLinearHistory = false,
        token: providedToken
      } = ctx.input;
      const octokitOptions = await helpers.getOctokitOptions({
        integrations,
        token: providedToken,
        repoUrl
      });
      const client = new octokit.Octokit(octokitOptions);
      const { owner, repo } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
      if (!owner) {
        throw new errors.InputError(`No owner provided for repo ${repoUrl}`);
      }
      const repository = await client.rest.repos.get({
        owner,
        repo
      });
      await gitHelpers.enableBranchProtectionOnDefaultRepoBranch({
        repoName: repo,
        client,
        owner,
        logger: ctx.logger,
        requireCodeOwnerReviews,
        bypassPullRequestAllowances,
        requiredApprovingReviewCount,
        restrictions,
        requiredStatusCheckContexts,
        requireBranchesToBeUpToDate,
        requiredConversationResolution,
        requireLastPushApproval,
        defaultBranch: branch ?? repository.data.default_branch,
        enforceAdmins,
        dismissStaleReviews,
        requiredCommitSigning,
        requiredLinearHistory
      });
    }
  });
}

exports.createGithubBranchProtectionAction = createGithubBranchProtectionAction;
//# sourceMappingURL=githubBranchProtection.cjs.js.map
