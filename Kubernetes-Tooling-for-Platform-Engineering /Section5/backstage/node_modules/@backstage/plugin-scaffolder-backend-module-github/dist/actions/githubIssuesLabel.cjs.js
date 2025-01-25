'use strict';

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var errors = require('@backstage/errors');
var octokit = require('octokit');
var helpers = require('./helpers.cjs.js');
var githubIssuesLabel_examples = require('./githubIssuesLabel.examples.cjs.js');

function createGithubIssuesLabelAction(options) {
  const { integrations, githubCredentialsProvider } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "github:issues:label",
    description: "Adds labels to a pull request or issue on GitHub.",
    examples: githubIssuesLabel_examples.examples,
    schema: {
      input: {
        type: "object",
        required: ["repoUrl", "number", "labels"],
        properties: {
          repoUrl: {
            title: "Repository Location",
            description: `Accepts the format 'github.com?repo=reponame&owner=owner' where 'reponame' is the repository name and 'owner' is an organization or username`,
            type: "string"
          },
          number: {
            title: "Pull Request or issue number",
            description: "The pull request or issue number to add labels to",
            type: "number"
          },
          labels: {
            title: "Labels",
            description: "The labels to add to the pull request or issue",
            type: "array",
            items: {
              type: "string"
            }
          },
          token: {
            title: "Authentication Token",
            type: "string",
            description: "The GITHUB_TOKEN to use for authorization to GitHub"
          }
        }
      }
    },
    async handler(ctx) {
      const { repoUrl, number, labels, token: providedToken } = ctx.input;
      const { owner, repo } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
      ctx.logger.info(`Adding labels to ${number} issue on repo ${repo}`);
      if (!owner) {
        throw new errors.InputError("Invalid repository owner provided in repoUrl");
      }
      const client = new octokit.Octokit(
        await helpers.getOctokitOptions({
          integrations,
          credentialsProvider: githubCredentialsProvider,
          repoUrl,
          token: providedToken
        })
      );
      try {
        await client.rest.issues.addLabels({
          owner,
          repo,
          issue_number: number,
          labels
        });
      } catch (e) {
        errors.assertError(e);
        ctx.logger.warn(
          `Failed: adding labels to issue: '${number}' on repo: '${repo}', ${e.message}`
        );
      }
    }
  });
}

exports.createGithubIssuesLabelAction = createGithubIssuesLabelAction;
//# sourceMappingURL=githubIssuesLabel.cjs.js.map
