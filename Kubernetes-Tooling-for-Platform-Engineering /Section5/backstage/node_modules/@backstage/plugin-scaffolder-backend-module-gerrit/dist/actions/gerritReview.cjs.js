'use strict';

var crypto = require('crypto');
var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var gerritReview_examples = require('./gerritReview.examples.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var crypto__default = /*#__PURE__*/_interopDefaultCompat(crypto);

const generateGerritChangeId = () => {
  const changeId = crypto__default.default.randomBytes(20).toString("hex");
  return `I${changeId}`;
};
function createPublishGerritReviewAction(options) {
  const { integrations, config } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "publish:gerrit:review",
    description: "Creates a new Gerrit review.",
    examples: gerritReview_examples.examples,
    schema: {
      input: {
        type: "object",
        required: ["repoUrl", "gitCommitMessage"],
        properties: {
          repoUrl: {
            title: "Repository Location",
            type: "string"
          },
          branch: {
            title: "Repository branch",
            type: "string",
            description: "Branch of the repository the review will be created on"
          },
          sourcePath: {
            type: "string",
            title: "Working Subdirectory",
            description: "Subdirectory of working directory containing the repository"
          },
          gitCommitMessage: {
            title: "Git Commit Message",
            type: "string",
            description: `Sets the commit message on the repository.`
          },
          gitAuthorName: {
            title: "Default Author Name",
            type: "string",
            description: `Sets the default author name for the commit. The default value is 'Scaffolder'`
          },
          gitAuthorEmail: {
            title: "Default Author Email",
            type: "string",
            description: `Sets the default author email for the commit.`
          }
        }
      },
      output: {
        type: "object",
        properties: {
          reviewUrl: {
            title: "A URL to the review",
            type: "string"
          },
          repoContentsUrl: {
            title: "A URL to the root of the repository",
            type: "string"
          }
        }
      }
    },
    async handler(ctx) {
      const {
        repoUrl,
        branch = "master",
        sourcePath,
        gitAuthorName,
        gitAuthorEmail,
        gitCommitMessage
      } = ctx.input;
      const { host, repo } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
      if (!gitCommitMessage) {
        throw new errors.InputError(`Missing gitCommitMessage input`);
      }
      const integrationConfig = integrations.gerrit.byHost(host);
      if (!integrationConfig) {
        throw new errors.InputError(
          `No matching integration configuration for host ${host}, please check your integrations config`
        );
      }
      const auth = {
        username: integrationConfig.config.username,
        password: integrationConfig.config.password
      };
      const gitAuthorInfo = {
        name: gitAuthorName ? gitAuthorName : config.getOptionalString("scaffolder.defaultAuthor.name"),
        email: gitAuthorEmail ? gitAuthorEmail : config.getOptionalString("scaffolder.defaultAuthor.email")
      };
      const changeId = generateGerritChangeId();
      const commitMessage = `${gitCommitMessage}

Change-Id: ${changeId}`;
      await pluginScaffolderNode.commitAndPushRepo({
        dir: pluginScaffolderNode.getRepoSourceDirectory(ctx.workspacePath, sourcePath),
        auth,
        logger: ctx.logger,
        commitMessage,
        gitAuthorInfo,
        branch,
        remoteRef: `refs/for/${branch}`
      });
      const repoContentsUrl = `${integrationConfig.config.gitilesBaseUrl}/${repo}/+/refs/heads/${branch}`;
      const reviewUrl = `${integrationConfig.config.baseUrl}/#/q/${changeId}`;
      ctx.logger?.info(`Review available on ${reviewUrl}`);
      ctx.output("repoContentsUrl", repoContentsUrl);
      ctx.output("reviewUrl", reviewUrl);
    }
  });
}

exports.createPublishGerritReviewAction = createPublishGerritReviewAction;
//# sourceMappingURL=gerritReview.cjs.js.map
