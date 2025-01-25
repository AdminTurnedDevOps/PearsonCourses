'use strict';

var path = require('path');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var octokit = require('octokit');
var errors = require('@backstage/errors');
var octokitPluginCreatePullRequest = require('octokit-plugin-create-pull-request');
var helpers = require('./helpers.cjs.js');
var githubPullRequest_examples = require('./githubPullRequest.examples.cjs.js');
var backendPluginApi = require('@backstage/backend-plugin-api');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var path__default = /*#__PURE__*/_interopDefaultCompat(path);

class GithubResponseError extends errors.CustomErrorBase {
}
const defaultClientFactory = async ({
  integrations,
  githubCredentialsProvider,
  owner,
  repo,
  host = "github.com",
  token: providedToken
}) => {
  const [encodedHost, encodedOwner, encodedRepo] = [host, owner, repo].map(
    encodeURIComponent
  );
  const octokitOptions = await helpers.getOctokitOptions({
    integrations,
    credentialsProvider: githubCredentialsProvider,
    repoUrl: `${encodedHost}?owner=${encodedOwner}&repo=${encodedRepo}`,
    token: providedToken
  });
  const OctokitPR = octokit.Octokit.plugin(octokitPluginCreatePullRequest.createPullRequest);
  return new OctokitPR({
    ...octokitOptions,
    ...{ throttle: { enabled: false } }
  });
};
const createPublishGithubPullRequestAction = (options) => {
  const {
    integrations,
    githubCredentialsProvider,
    clientFactory = defaultClientFactory,
    config
  } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "publish:github:pull-request",
    examples: githubPullRequest_examples.examples,
    supportsDryRun: true,
    schema: {
      input: {
        required: ["repoUrl", "title", "description", "branchName"],
        type: "object",
        properties: {
          repoUrl: {
            title: "Repository Location",
            description: `Accepts the format 'github.com?repo=reponame&owner=owner' where 'reponame' is the repository name and 'owner' is an organization or username`,
            type: "string"
          },
          branchName: {
            type: "string",
            title: "Branch Name",
            description: "The name for the branch"
          },
          targetBranchName: {
            type: "string",
            title: "Target Branch Name",
            description: "The target branch name of the merge request"
          },
          title: {
            type: "string",
            title: "Pull Request Name",
            description: "The name for the pull request"
          },
          description: {
            type: "string",
            title: "Pull Request Description",
            description: "The description of the pull request"
          },
          draft: {
            type: "boolean",
            title: "Create as Draft",
            description: "Create a draft pull request"
          },
          sourcePath: {
            type: "string",
            title: "Working Subdirectory",
            description: "Subdirectory of working directory to copy changes from"
          },
          targetPath: {
            type: "string",
            title: "Repository Subdirectory",
            description: "Subdirectory of repository to apply changes to"
          },
          token: {
            title: "Authentication Token",
            type: "string",
            description: "The token to use for authorization to GitHub"
          },
          reviewers: {
            title: "Pull Request Reviewers",
            type: "array",
            items: {
              type: "string"
            },
            description: "The users that will be added as reviewers to the pull request"
          },
          teamReviewers: {
            title: "Pull Request Team Reviewers",
            type: "array",
            items: {
              type: "string"
            },
            description: "The teams that will be added as reviewers to the pull request"
          },
          commitMessage: {
            type: "string",
            title: "Commit Message",
            description: "The commit message for the pull request commit"
          },
          update: {
            type: "boolean",
            title: "Update",
            description: "Update pull request if already exists"
          },
          forceFork: {
            type: "boolean",
            title: "Force Fork",
            description: "Create pull request from a fork"
          },
          gitAuthorName: {
            type: "string",
            title: "Default Author Name",
            description: "Sets the default author name for the commit. The default value is the authenticated user or 'Scaffolder'"
          },
          gitAuthorEmail: {
            type: "string",
            title: "Default Author Email",
            description: "Sets the default author email for the commit. The default value is the authenticated user or 'scaffolder@backstage.io'"
          },
          forceEmptyGitAuthor: {
            type: "boolean",
            title: "Force Empty Git Author",
            description: "Forces the author to be empty. This is useful when using a Github App, it permit the commit to be verified on Github"
          }
        }
      },
      output: {
        required: ["remoteUrl"],
        type: "object",
        properties: {
          targetBranchName: {
            title: "Target branch name of the merge request",
            type: "string"
          },
          remoteUrl: {
            type: "string",
            title: "Pull Request URL",
            description: "Link to the pull request in Github"
          },
          pullRequestNumber: {
            type: "number",
            title: "Pull Request Number",
            description: "The pull request number"
          }
        }
      }
    },
    async handler(ctx) {
      const {
        repoUrl,
        branchName,
        targetBranchName,
        title,
        description,
        draft,
        targetPath,
        sourcePath,
        token: providedToken,
        reviewers,
        teamReviewers,
        commitMessage,
        update,
        forceFork,
        gitAuthorEmail,
        gitAuthorName,
        forceEmptyGitAuthor
      } = ctx.input;
      const { owner, repo, host } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
      if (!owner) {
        throw new errors.InputError(
          `No owner provided for host: ${host}, and repo ${repo}`
        );
      }
      const client = await clientFactory({
        integrations,
        githubCredentialsProvider,
        host,
        owner,
        repo,
        token: providedToken
      });
      const fileRoot = sourcePath ? backendPluginApi.resolveSafeChildPath(ctx.workspacePath, sourcePath) : ctx.workspacePath;
      const directoryContents = await pluginScaffolderNode.serializeDirectoryContents(fileRoot, {
        gitignore: true
      });
      const determineFileMode = (file) => {
        if (file.symlink) return "120000";
        if (file.executable) return "100755";
        return "100644";
      };
      const determineFileEncoding = (file) => file.symlink ? "utf-8" : "base64";
      const files = Object.fromEntries(
        directoryContents.map((file) => [
          targetPath ? path__default.default.posix.join(targetPath, file.path) : file.path,
          {
            // See the properties of tree items
            // in https://docs.github.com/en/rest/reference/git#trees
            mode: determineFileMode(file),
            // Always use base64 encoding where possible to avoid doubling a binary file in size
            // due to interpreting a binary file as utf-8 and sending github
            // the utf-8 encoded content. Symlinks are kept as utf-8 to avoid them
            // being formatted as a series of scrambled characters
            //
            // For example, the original gradle-wrapper.jar is 57.8k in https://github.com/kennethzfeng/pull-request-test/pull/5/files.
            // Its size could be doubled to 98.3K (See https://github.com/kennethzfeng/pull-request-test/pull/4/files)
            encoding: determineFileEncoding(file),
            content: file.content.toString(determineFileEncoding(file))
          }
        ])
      );
      if (ctx.isDryRun) {
        ctx.logger.info(`Performing dry run of creating pull request`);
        ctx.output("targetBranchName", branchName);
        ctx.output("remoteUrl", repoUrl);
        ctx.output("pullRequestNumber", 43);
        ctx.logger.info(`Dry run complete`);
        return;
      }
      try {
        const createOptions = {
          owner,
          repo,
          title,
          changes: [
            {
              files,
              commit: commitMessage ?? config?.getOptionalString("scaffolder.defaultCommitMessage") ?? title
            }
          ],
          body: description,
          head: branchName,
          draft,
          update,
          forceFork
        };
        const gitAuthorInfo = {
          name: gitAuthorName ?? config?.getOptionalString("scaffolder.defaultAuthor.name"),
          email: gitAuthorEmail ?? config?.getOptionalString("scaffolder.defaultAuthor.email")
        };
        if (!forceEmptyGitAuthor) {
          if (gitAuthorInfo.name || gitAuthorInfo.email) {
            if (Array.isArray(createOptions.changes)) {
              createOptions.changes = createOptions.changes.map((change) => ({
                ...change,
                author: {
                  name: gitAuthorInfo.name || "Scaffolder",
                  email: gitAuthorInfo.email || "scaffolder@backstage.io"
                }
              }));
            } else {
              createOptions.changes = {
                ...createOptions.changes,
                author: {
                  name: gitAuthorInfo.name || "Scaffolder",
                  email: gitAuthorInfo.email || "scaffolder@backstage.io"
                }
              };
            }
          }
        }
        if (targetBranchName) {
          createOptions.base = targetBranchName;
        }
        const response = await client.createPullRequest(createOptions);
        if (!response) {
          throw new GithubResponseError("null response from Github");
        }
        const pullRequestNumber = response.data.number;
        if (reviewers || teamReviewers) {
          const pullRequest = { owner, repo, number: pullRequestNumber };
          await requestReviewersOnPullRequest(
            pullRequest,
            reviewers,
            teamReviewers,
            client,
            ctx.logger
          );
        }
        const targetBranch = response.data.base.ref;
        ctx.output("targetBranchName", targetBranch);
        ctx.output("remoteUrl", response.data.html_url);
        ctx.output("pullRequestNumber", pullRequestNumber);
      } catch (e) {
        throw new GithubResponseError("Pull request creation failed", e);
      }
    }
  });
  async function requestReviewersOnPullRequest(pr, reviewers, teamReviewers, client, logger) {
    try {
      const result = await client.rest.pulls.requestReviewers({
        owner: pr.owner,
        repo: pr.repo,
        pull_number: pr.number,
        reviewers,
        team_reviewers: teamReviewers ? [...new Set(teamReviewers)] : void 0
      });
      const addedUsers = result.data.requested_reviewers?.join(", ") ?? "";
      const addedTeams = result.data.requested_teams?.join(", ") ?? "";
      logger.info(
        `Added users [${addedUsers}] and teams [${addedTeams}] as reviewers to Pull request ${pr.number}`
      );
    } catch (e) {
      logger.error(
        `Failure when adding reviewers to Pull request ${pr.number}`,
        e
      );
    }
  }
};

exports.createPublishGithubPullRequestAction = createPublishGithubPullRequestAction;
exports.defaultClientFactory = defaultClientFactory;
//# sourceMappingURL=githubPullRequest.cjs.js.map
