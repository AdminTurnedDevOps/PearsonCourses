'use strict';

var errors = require('@backstage/errors');
var octokit = require('octokit');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var githubPagesEnable_examples = require('./githubPagesEnable.examples.cjs.js');
var pluginScaffolderBackendModuleGithub = require('@backstage/plugin-scaffolder-backend-module-github');

function createGithubPagesEnableAction(options) {
  const { integrations, githubCredentialsProvider } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "github:pages:enable",
    examples: githubPagesEnable_examples.examples,
    description: "Enables GitHub Pages for a repository.",
    schema: {
      input: {
        type: "object",
        required: ["repoUrl"],
        properties: {
          repoUrl: {
            title: "Repository Location",
            description: `Accepts the format 'github.com?repo=reponame&owner=owner' where 'reponame' is the new repository name and 'owner' is an organization or username`,
            type: "string"
          },
          buildType: {
            title: "Build Type",
            type: "string",
            description: 'The GitHub Pages build type - "legacy" or "workflow". Default is "workflow'
          },
          sourceBranch: {
            title: "Source Branch",
            type: "string",
            description: 'The GitHub Pages source branch. Default is "main"'
          },
          sourcePath: {
            title: "Source Path",
            type: "string",
            description: 'The GitHub Pages source path - "/" or "/docs". Default is "/"'
          },
          token: {
            title: "Authorization Token",
            type: "string",
            description: "The token to use for authorization to GitHub"
          }
        }
      }
    },
    async handler(ctx) {
      const {
        repoUrl,
        buildType = "workflow",
        sourceBranch = "main",
        sourcePath = "/",
        token: providedToken
      } = ctx.input;
      const octokitOptions = await pluginScaffolderBackendModuleGithub.getOctokitOptions({
        integrations,
        credentialsProvider: githubCredentialsProvider,
        token: providedToken,
        repoUrl
      });
      const client = new octokit.Octokit(octokitOptions);
      const { owner, repo } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
      if (!owner) {
        throw new errors.InputError("Invalid repository owner provided in repoUrl");
      }
      ctx.logger.info(
        `Attempting to enable GitHub Pages for ${owner}/${repo} with "${buildType}" build type, on source branch "${sourceBranch}" and source path "${sourcePath}"`
      );
      await client.request("POST /repos/{owner}/{repo}/pages", {
        owner,
        repo,
        build_type: buildType,
        source: {
          branch: sourceBranch,
          path: sourcePath
        },
        headers: {
          "X-GitHub-Api-Version": "2022-11-28"
        }
      });
      ctx.logger.info("Completed enabling GitHub Pages");
    }
  });
}

exports.createGithubPagesEnableAction = createGithubPagesEnableAction;
//# sourceMappingURL=githubPagesEnable.cjs.js.map
