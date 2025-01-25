'use strict';

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var path = require('path');
var errors = require('@backstage/errors');
var backendPluginApi = require('@backstage/backend-plugin-api');
var helpers = require('./helpers.cjs.js');
var gitlabRepoPush_examples = require('./gitlabRepoPush.examples.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var path__default = /*#__PURE__*/_interopDefaultCompat(path);

const createGitlabRepoPushAction = (options) => {
  const { integrations } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "gitlab:repo:push",
    examples: gitlabRepoPush_examples.examples,
    schema: {
      input: {
        required: ["repoUrl", "branchName", "commitMessage"],
        type: "object",
        properties: {
          repoUrl: {
            type: "string",
            title: "Repository Location",
            description: `Accepts the format 'gitlab.com?repo=project_name&owner=group_name' where 'project_name' is the repository name and 'group_name' is a group or username`
          },
          branchName: {
            type: "string",
            title: "Source Branch Name",
            description: "The branch name for the commit"
          },
          commitMessage: {
            type: "string",
            title: "Commit Message",
            description: `The commit message`
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
            description: "The token to use for authorization to GitLab"
          },
          commitAction: {
            title: "Commit action",
            type: "string",
            enum: ["create", "update", "delete"],
            description: "The action to be used for git commit. Defaults to create."
          }
        }
      },
      output: {
        type: "object",
        properties: {
          projectid: {
            title: "Gitlab Project id/Name(slug)",
            type: "string"
          },
          projectPath: {
            title: "Gitlab Project path",
            type: "string"
          },
          commitHash: {
            title: "The git commit hash of the commit",
            type: "string"
          }
        }
      }
    },
    async handler(ctx) {
      const {
        branchName,
        repoUrl,
        targetPath,
        sourcePath,
        token,
        commitAction
      } = ctx.input;
      const { owner, repo, project } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
      const repoID = project ? project : `${owner}/${repo}`;
      const api = helpers.createGitlabApi({
        integrations,
        token,
        repoUrl
      });
      let fileRoot;
      if (sourcePath) {
        fileRoot = backendPluginApi.resolveSafeChildPath(ctx.workspacePath, sourcePath);
      } else {
        fileRoot = ctx.workspacePath;
      }
      const fileContents = await pluginScaffolderNode.serializeDirectoryContents(fileRoot, {
        gitignore: true
      });
      const actions = fileContents.map((file) => ({
        action: commitAction ?? "create",
        filePath: targetPath ? path__default.default.posix.join(targetPath, file.path) : file.path,
        encoding: "base64",
        content: file.content.toString("base64"),
        execute_filemode: file.executable
      }));
      let branchExists = false;
      try {
        await api.Branches.show(repoID, branchName);
        branchExists = true;
      } catch (e) {
        if (e.response?.statusCode !== 404) {
          throw new errors.InputError(
            `Failed to check status of branch '${branchName}'. Please make sure that branch already exists or Backstage has permissions to create one. ${helpers.getErrorMessage(
              e
            )}`
          );
        }
      }
      if (!branchExists) {
        try {
          const projects = await api.Projects.show(repoID);
          const { default_branch: defaultBranch } = projects;
          await api.Branches.create(repoID, branchName, String(defaultBranch));
        } catch (e) {
          throw new errors.InputError(
            `The branch '${branchName}' was not found and creation failed with error. Please make sure that branch already exists or Backstage has permissions to create one. ${helpers.getErrorMessage(
              e
            )}`
          );
        }
      }
      try {
        const commit = await api.Commits.create(
          repoID,
          branchName,
          ctx.input.commitMessage,
          actions
        );
        ctx.output("projectid", repoID);
        ctx.output("projectPath", repoID);
        ctx.output("commitHash", commit.id);
      } catch (e) {
        throw new errors.InputError(
          `Committing the changes to ${branchName} failed. Please check that none of the files created by the template already exists. ${helpers.getErrorMessage(
            e
          )}`
        );
      }
    }
  });
};

exports.createGitlabRepoPushAction = createGitlabRepoPushAction;
//# sourceMappingURL=gitlabRepoPush.cjs.js.map
