'use strict';

var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var octokit = require('octokit');
var githubAutolinks_examples = require('./githubAutolinks.examples.cjs.js');
var helpers = require('./helpers.cjs.js');

function createGithubAutolinksAction(options) {
  const { integrations, githubCredentialsProvider } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "github:autolinks:create",
    description: "Create an autolink reference for a repository",
    examples: githubAutolinks_examples.examples,
    schema: {
      input: {
        type: "object",
        required: ["repoUrl", "keyPrefix", "urlTemplate"],
        properties: {
          repoUrl: {
            title: "Repository Location",
            description: `Accepts the format 'github.com?repo=reponame&owner=owner' where 'reponame' is the new repository name and 'owner' is an organization or username`,
            type: "string"
          },
          keyPrefix: {
            title: "Key Prefix",
            description: "This prefix appended by certain characters will generate a link any time it is found in an issue, pull request, or commit.",
            type: "string"
          },
          urlTemplate: {
            title: "URL Template",
            description: "The URL must contain <num> for the reference number. <num> matches different characters depending on the value of isAlphanumeric.",
            type: "string"
          },
          isAlphanumeric: {
            title: "Alphanumeric",
            description: "Whether this autolink reference matches alphanumeric characters. If true, the <num> parameter of the url_template matches alphanumeric characters A-Z (case insensitive), 0-9, and -. If false, this autolink reference only matches numeric characters. Default: true",
            type: "boolean"
          },
          token: {
            title: "Authentication Token",
            type: "string",
            description: "The token to use for authorization to GitHub"
          }
        }
      }
    },
    async handler(ctx) {
      const { repoUrl, keyPrefix, urlTemplate, isAlphanumeric, token } = ctx.input;
      ctx.logger.info(`Creating autolink reference for repo ${repoUrl}`);
      const { owner, repo } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
      if (!owner) {
        throw new errors.InputError("Invalid repository owner provided in repoUrl");
      }
      const client = new octokit.Octokit(
        await helpers.getOctokitOptions({
          integrations,
          repoUrl,
          credentialsProvider: githubCredentialsProvider,
          token
        })
      );
      await client.rest.repos.createAutolink({
        owner,
        repo,
        key_prefix: keyPrefix,
        url_template: urlTemplate,
        is_alphanumeric: isAlphanumeric
      });
      ctx.logger.info(`Autolink reference created successfully`);
    }
  });
}

exports.createGithubAutolinksAction = createGithubAutolinksAction;
//# sourceMappingURL=githubAutolinks.cjs.js.map
