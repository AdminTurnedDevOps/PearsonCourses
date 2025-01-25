'use strict';

var errors = require('@backstage/errors');
var integration = require('@backstage/integration');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var fs = require('fs-extra');
var bitbucketServerPullRequest_examples = require('./bitbucketServerPullRequest.examples.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);

const createPullRequest = async (opts) => {
  const {
    project,
    repo,
    title,
    description,
    toRef,
    fromRef,
    reviewers,
    authorization,
    apiBaseUrl
  } = opts;
  let response;
  const data = {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      state: "OPEN",
      open: true,
      closed: false,
      locked: true,
      toRef,
      fromRef,
      reviewers: reviewers?.map((reviewer) => ({ user: { name: reviewer } }))
    }),
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json"
    }
  };
  try {
    response = await fetch(
      `${apiBaseUrl}/projects/${encodeURIComponent(
        project
      )}/repos/${encodeURIComponent(repo)}/pull-requests`,
      data
    );
  } catch (e) {
    throw new Error(`Unable to create pull-reqeusts, ${e}`);
  }
  if (response.status !== 201) {
    throw new Error(
      `Unable to create pull requests, ${response.status} ${response.statusText}, ${await response.text()}`
    );
  }
  const r = await response.json();
  return `${r.links.self[0].href}`;
};
const findBranches = async (opts) => {
  const { project, repo, branchName, authorization, apiBaseUrl } = opts;
  let response;
  const options = {
    method: "GET",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json"
    }
  };
  try {
    response = await fetch(
      `${apiBaseUrl}/projects/${encodeURIComponent(
        project
      )}/repos/${encodeURIComponent(
        repo
      )}/branches?boostMatches=true&filterText=${encodeURIComponent(
        branchName
      )}`,
      options
    );
  } catch (e) {
    throw new Error(`Unable to get branches, ${e}`);
  }
  if (response.status !== 200) {
    throw new Error(
      `Unable to get branches, ${response.status} ${response.statusText}, ${await response.text()}`
    );
  }
  const r = await response.json();
  for (const object of r.values) {
    if (object.displayId === branchName) {
      return object;
    }
  }
  return void 0;
};
const createBranch = async (opts) => {
  const { project, repo, branchName, authorization, apiBaseUrl, startPoint } = opts;
  let response;
  const options = {
    method: "POST",
    body: JSON.stringify({
      name: branchName,
      startPoint
    }),
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json"
    }
  };
  try {
    response = await fetch(
      `${apiBaseUrl}/projects/${encodeURIComponent(
        project
      )}/repos/${encodeURIComponent(repo)}/branches`,
      options
    );
  } catch (e) {
    throw new Error(`Unable to create branch, ${e}`);
  }
  if (response.status !== 200) {
    throw new Error(
      `Unable to create branch, ${response.status} ${response.statusText}, ${await response.text()}`
    );
  }
  return await response.json();
};
const getDefaultBranch = async (opts) => {
  const { project, repo, authorization, apiBaseUrl } = opts;
  let response;
  const options = {
    method: "GET",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json"
    }
  };
  try {
    response = await fetch(
      `${apiBaseUrl}/projects/${project}/repos/${repo}/default-branch`,
      options
    );
  } catch (error) {
    throw error;
  }
  const { displayId } = await response.json();
  const defaultBranch = displayId;
  if (!defaultBranch) {
    throw new Error(`Could not fetch default branch for ${project}/${repo}`);
  }
  return defaultBranch;
};
const isApiBaseUrlHttps = (apiBaseUrl) => {
  const url = new URL(apiBaseUrl);
  return url.protocol === "https:";
};
function createPublishBitbucketServerPullRequestAction(options) {
  const { integrations, config } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "publish:bitbucketServer:pull-request",
    examples: bitbucketServerPullRequest_examples.examples,
    schema: {
      input: {
        type: "object",
        required: ["repoUrl", "title", "sourceBranch"],
        properties: {
          repoUrl: {
            title: "Repository Location",
            type: "string"
          },
          title: {
            title: "Pull Request title",
            type: "string",
            description: "The title for the pull request"
          },
          description: {
            title: "Pull Request Description",
            type: "string",
            description: "The description of the pull request"
          },
          targetBranch: {
            title: "Target Branch",
            type: "string",
            description: `Branch of repository to apply changes to. The default value is 'master'`
          },
          sourceBranch: {
            title: "Source Branch",
            type: "string",
            description: "Branch of repository to copy changes from"
          },
          reviewers: {
            title: "Pull Request Reviewers",
            type: "array",
            items: {
              type: "string"
            },
            description: "The usernames of reviewers that will be added to the pull request"
          },
          token: {
            title: "Authorization Token",
            type: "string",
            description: "The token to use for authorization to BitBucket Server"
          },
          gitAuthorName: {
            title: "Author Name",
            type: "string",
            description: `Sets the author name for the commit. The default value is 'Scaffolder'`
          },
          gitAuthorEmail: {
            title: "Author Email",
            type: "string",
            description: `Sets the author email for the commit.`
          }
        }
      },
      output: {
        type: "object",
        properties: {
          pullRequestUrl: {
            title: "A URL to the pull request with the provider",
            type: "string"
          }
        }
      }
    },
    async handler(ctx) {
      const {
        repoUrl,
        title,
        description,
        targetBranch,
        sourceBranch,
        reviewers,
        gitAuthorName,
        gitAuthorEmail
      } = ctx.input;
      const { project, repo, host } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
      if (!project) {
        throw new errors.InputError(
          `Invalid URL provider was included in the repo URL to create ${ctx.input.repoUrl}, missing project`
        );
      }
      const integrationConfig = integrations.bitbucketServer.byHost(host);
      if (!integrationConfig) {
        throw new errors.InputError(
          `No matching integration configuration for host ${host}, please check your integrations config`
        );
      }
      const token = ctx.input.token ?? integrationConfig.config.token;
      const authConfig = {
        ...integrationConfig.config,
        ...{ token }
      };
      const reqOpts = integration.getBitbucketServerRequestOptions(authConfig);
      const authorization = reqOpts.headers.Authorization;
      if (!authorization) {
        throw new Error(
          `Authorization has not been provided for ${integrationConfig.config.host}. Please add either (a) a user login auth token, or (b) a token input from the template or (c) username + password to the integration config.`
        );
      }
      const apiBaseUrl = integrationConfig.config.apiBaseUrl;
      let finalTargetBranch = targetBranch;
      if (!finalTargetBranch) {
        finalTargetBranch = await getDefaultBranch({
          project,
          repo,
          authorization,
          apiBaseUrl
        });
      }
      const toRef = await findBranches({
        project,
        repo,
        branchName: finalTargetBranch,
        authorization,
        apiBaseUrl
      });
      let fromRef = await findBranches({
        project,
        repo,
        branchName: sourceBranch,
        authorization,
        apiBaseUrl
      });
      if (!fromRef) {
        ctx.logger.info(
          `source branch not found -> creating branch named: ${sourceBranch} lastCommit: ${toRef.latestCommit}`
        );
        const latestCommit = toRef.latestCommit;
        fromRef = await createBranch({
          project,
          repo,
          branchName: sourceBranch,
          authorization,
          apiBaseUrl,
          startPoint: latestCommit
        });
        const isHttps = isApiBaseUrlHttps(apiBaseUrl);
        const remoteUrl = `${isHttps ? "https" : "http"}://${host}/scm/${project}/${repo}.git`;
        const auth = authConfig.token ? {
          token
        } : {
          username: authConfig.username,
          password: authConfig.password
        };
        const gitAuthorInfo = {
          name: gitAuthorName || config.getOptionalString("scaffolder.defaultAuthor.name"),
          email: gitAuthorEmail || config.getOptionalString("scaffolder.defaultAuthor.email")
        };
        const tempDir = await ctx.createTemporaryDirectory();
        const sourceDir = pluginScaffolderNode.getRepoSourceDirectory(ctx.workspacePath, void 0);
        await pluginScaffolderNode.cloneRepo({
          url: remoteUrl,
          dir: tempDir,
          auth,
          logger: ctx.logger,
          ref: sourceBranch
        });
        fs__default.default.cpSync(sourceDir, tempDir, {
          recursive: true,
          filter: (path) => {
            return !(path.indexOf(".git") > -1);
          }
        });
        await pluginScaffolderNode.addFiles({
          dir: tempDir,
          auth,
          logger: ctx.logger,
          filepath: "."
        });
        await pluginScaffolderNode.commitAndPushBranch({
          dir: tempDir,
          auth,
          logger: ctx.logger,
          commitMessage: description ?? config.getOptionalString("scaffolder.defaultCommitMessage") ?? "",
          gitAuthorInfo,
          branch: sourceBranch
        });
      }
      const pullRequestUrl = await createPullRequest({
        project,
        repo,
        title,
        description,
        toRef,
        fromRef,
        reviewers,
        authorization,
        apiBaseUrl
      });
      ctx.output("pullRequestUrl", pullRequestUrl);
    }
  });
}

exports.createPublishBitbucketServerPullRequestAction = createPublishBitbucketServerPullRequestAction;
//# sourceMappingURL=bitbucketServerPullRequest.cjs.js.map
