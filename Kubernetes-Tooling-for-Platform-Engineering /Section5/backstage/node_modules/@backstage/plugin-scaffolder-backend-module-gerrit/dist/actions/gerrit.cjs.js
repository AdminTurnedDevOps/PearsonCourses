'use strict';

var crypto = require('crypto');
var errors = require('@backstage/errors');
var integration = require('@backstage/integration');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var gerrit_examples = require('./gerrit.examples.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var crypto__default = /*#__PURE__*/_interopDefaultCompat(crypto);

const createGerritProject = async (config, options) => {
  const { projectName, parent, owner, description, defaultBranch } = options;
  const fetchOptions = {
    method: "PUT",
    body: JSON.stringify({
      parent,
      description,
      branches: [defaultBranch],
      owners: owner ? [owner] : [],
      create_empty_commit: false
    }),
    headers: {
      ...integration.getGerritRequestOptions(config).headers,
      "Content-Type": "application/json"
    }
  };
  const response = await fetch(
    `${config.baseUrl}/a/projects/${encodeURIComponent(projectName)}`,
    fetchOptions
  );
  if (response.status !== 201) {
    throw new Error(
      `Unable to create repository, ${response.status} ${response.statusText}, ${await response.text()}`
    );
  }
};
const generateCommitMessage = (config, commitSubject) => {
  const changeId = crypto__default.default.randomBytes(20).toString("hex");
  const msg = `${config.getOptionalString("scaffolder.defaultCommitMessage") || commitSubject}

Change-Id: I${changeId}`;
  return msg;
};
function createPublishGerritAction(options) {
  const { integrations, config } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "publish:gerrit",
    supportsDryRun: true,
    description: "Initializes a git repository of the content in the workspace, and publishes it to Gerrit.",
    examples: gerrit_examples.examples,
    schema: {
      input: {
        type: "object",
        required: ["repoUrl"],
        properties: {
          repoUrl: {
            title: "Repository Location",
            type: "string"
          },
          description: {
            title: "Repository Description",
            type: "string"
          },
          defaultBranch: {
            title: "Default Branch",
            type: "string",
            description: `Sets the default branch on the repository. The default value is 'master'`
          },
          gitCommitMessage: {
            title: "Git Commit Message",
            type: "string",
            description: `Sets the commit message on the repository. The default value is 'initial commit'`
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
          },
          sourcePath: {
            title: "Source Path",
            type: "string",
            description: `Path within the workspace that will be used as the repository root. If omitted, the entire workspace will be published as the repository.`
          }
        }
      },
      output: {
        type: "object",
        properties: {
          remoteUrl: {
            title: "A URL to the repository with the provider",
            type: "string"
          },
          repoContentsUrl: {
            title: "A URL to the root of the repository",
            type: "string"
          },
          commitHash: {
            title: "The git commit hash of the initial commit",
            type: "string"
          }
        }
      }
    },
    async handler(ctx) {
      const {
        repoUrl,
        description,
        defaultBranch = "master",
        gitAuthorName,
        gitAuthorEmail,
        gitCommitMessage = "initial commit",
        sourcePath
      } = ctx.input;
      const { repo, host, owner, workspace } = pluginScaffolderNode.parseRepoUrl(
        repoUrl,
        integrations
      );
      const integrationConfig = integrations.gerrit.byHost(host);
      if (!integrationConfig) {
        throw new errors.InputError(
          `No matching integration configuration for host ${host}, please check your integrations config`
        );
      }
      if (!workspace) {
        throw new errors.InputError(
          `Invalid URL provider was included in the repo URL to create ${ctx.input.repoUrl}, missing workspace`
        );
      }
      const repoContentsUrl = `${integrationConfig.config.gitilesBaseUrl}/${repo}/+/refs/heads/${defaultBranch}`;
      const remoteUrl = `${integrationConfig.config.cloneUrl}/a/${repo}`;
      const gitName = gitAuthorName ? gitAuthorName : config.getOptionalString("scaffolder.defaultAuthor.name");
      const gitEmail = gitAuthorEmail ? gitAuthorEmail : config.getOptionalString("scaffolder.defaultAuthor.email");
      const commitMessage = generateCommitMessage(config, gitCommitMessage);
      if (ctx.isDryRun) {
        ctx.logger.info(
          `Dry run arguments: ${{
            gitName,
            gitEmail,
            commitMessage,
            ...ctx.input
          }}`
        );
        ctx.output("remoteUrl", remoteUrl);
        ctx.output("commitHash", "abcd-dry-run-1234");
        ctx.output("repoContentsUrl", repoContentsUrl);
        return;
      }
      await createGerritProject(integrationConfig.config, {
        description,
        owner,
        projectName: repo,
        parent: workspace,
        defaultBranch
      });
      const auth = {
        username: integrationConfig.config.username,
        password: integrationConfig.config.password
      };
      const gitAuthorInfo = {
        name: gitName,
        email: gitEmail
      };
      const commitResult = await pluginScaffolderNode.initRepoAndPush({
        dir: pluginScaffolderNode.getRepoSourceDirectory(ctx.workspacePath, sourcePath),
        remoteUrl,
        auth,
        defaultBranch,
        logger: ctx.logger,
        commitMessage: generateCommitMessage(config, gitCommitMessage),
        gitAuthorInfo
      });
      ctx.output("remoteUrl", remoteUrl);
      ctx.output("commitHash", commitResult?.commitHash);
      ctx.output("repoContentsUrl", repoContentsUrl);
    }
  });
}

exports.createPublishGerritAction = createPublishGerritAction;
//# sourceMappingURL=gerrit.cjs.js.map
