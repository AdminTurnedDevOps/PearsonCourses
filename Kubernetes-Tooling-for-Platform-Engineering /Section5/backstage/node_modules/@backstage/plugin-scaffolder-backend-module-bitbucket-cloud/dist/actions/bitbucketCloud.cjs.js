'use strict';

var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var helpers = require('./helpers.cjs.js');
var bitbucketCloud_examples = require('./bitbucketCloud.examples.cjs.js');

const createRepository = async (opts) => {
  const {
    workspace,
    project,
    repo,
    description,
    repoVisibility,
    mainBranch,
    authorization,
    apiBaseUrl
  } = opts;
  const options = {
    method: "POST",
    body: JSON.stringify({
      scm: "git",
      description,
      is_private: repoVisibility === "private",
      project: { key: project }
    }),
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json"
    }
  };
  let response;
  try {
    response = await fetch(
      `${apiBaseUrl}/repositories/${workspace}/${repo}`,
      options
    );
  } catch (e) {
    throw new Error(`Unable to create repository, ${e}`);
  }
  if (response.status !== 200) {
    throw new Error(
      `Unable to create repository, ${response.status} ${response.statusText}, ${await response.text()}`
    );
  }
  const r = await response.json();
  let remoteUrl = "";
  for (const link of r.links.clone) {
    if (link.name === "https") {
      remoteUrl = link.href;
    }
  }
  const repoContentsUrl = `${r.links.html.href}/src/${mainBranch}`;
  return { remoteUrl, repoContentsUrl };
};
function createPublishBitbucketCloudAction(options) {
  const { integrations, config } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "publish:bitbucketCloud",
    examples: bitbucketCloud_examples.examples,
    description: "Initializes a git repository of the content in the workspace, and publishes it to Bitbucket Cloud.",
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
          repoVisibility: {
            title: "Repository Visibility",
            type: "string",
            enum: ["private", "public"]
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
          sourcePath: {
            title: "Source Path",
            description: "Path within the workspace that will be used as the repository root. If omitted, the entire workspace will be published as the repository.",
            type: "string"
          },
          token: {
            title: "Authentication Token",
            type: "string",
            description: "The token to use for authorization to BitBucket Cloud"
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
        gitCommitMessage,
        repoVisibility = "private"
      } = ctx.input;
      const { workspace, project, repo, host } = pluginScaffolderNode.parseRepoUrl(
        repoUrl,
        integrations
      );
      if (!workspace) {
        throw new errors.InputError(
          `Invalid URL provider was included in the repo URL to create ${ctx.input.repoUrl}, missing workspace`
        );
      }
      if (!project) {
        throw new errors.InputError(
          `Invalid URL provider was included in the repo URL to create ${ctx.input.repoUrl}, missing project`
        );
      }
      const integrationConfig = integrations.bitbucketCloud.byHost(host);
      if (!integrationConfig) {
        throw new errors.InputError(
          `No matching integration configuration for host ${host}, please check your integrations config`
        );
      }
      const authorization = helpers.getAuthorizationHeader(
        ctx.input.token ? { token: ctx.input.token } : integrationConfig.config
      );
      const apiBaseUrl = integrationConfig.config.apiBaseUrl;
      const { remoteUrl, repoContentsUrl } = await createRepository({
        authorization,
        workspace: workspace || "",
        project,
        repo,
        repoVisibility,
        mainBranch: defaultBranch,
        description,
        apiBaseUrl
      });
      const gitAuthorInfo = {
        name: config.getOptionalString("scaffolder.defaultAuthor.name"),
        email: config.getOptionalString("scaffolder.defaultAuthor.email")
      };
      let auth;
      if (ctx.input.token) {
        auth = {
          username: "x-token-auth",
          password: ctx.input.token
        };
      } else {
        if (!integrationConfig.config.username || !integrationConfig.config.appPassword) {
          throw new Error(
            "Credentials for Bitbucket Cloud integration required for this action."
          );
        }
        auth = {
          username: integrationConfig.config.username,
          password: integrationConfig.config.appPassword
        };
      }
      const commitResult = await pluginScaffolderNode.initRepoAndPush({
        dir: pluginScaffolderNode.getRepoSourceDirectory(ctx.workspacePath, ctx.input.sourcePath),
        remoteUrl,
        auth,
        defaultBranch,
        logger: ctx.logger,
        commitMessage: gitCommitMessage || config.getOptionalString("scaffolder.defaultCommitMessage"),
        gitAuthorInfo
      });
      ctx.output("commitHash", commitResult?.commitHash);
      ctx.output("remoteUrl", remoteUrl);
      ctx.output("repoContentsUrl", repoContentsUrl);
    }
  });
}

exports.createPublishBitbucketCloudAction = createPublishBitbucketCloudAction;
//# sourceMappingURL=bitbucketCloud.cjs.js.map
