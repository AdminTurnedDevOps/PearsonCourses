'use strict';

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var webhooks = require('@octokit/webhooks');
var errors = require('@backstage/errors');
var octokit = require('octokit');
var helpers = require('./helpers.cjs.js');
var githubWebhook_examples = require('./githubWebhook.examples.cjs.js');

function createGithubWebhookAction(options) {
  const { integrations, defaultWebhookSecret, githubCredentialsProvider } = options;
  const eventNames = webhooks.emitterEventNames.filter((event) => !event.includes("."));
  return pluginScaffolderNode.createTemplateAction({
    id: "github:webhook",
    description: "Creates webhook for a repository on GitHub.",
    examples: githubWebhook_examples.examples,
    supportsDryRun: true,
    schema: {
      input: {
        type: "object",
        required: ["repoUrl", "webhookUrl"],
        properties: {
          repoUrl: {
            title: "Repository Location",
            description: `Accepts the format 'github.com?repo=reponame&owner=owner' where 'reponame' is the new repository name and 'owner' is an organization or username`,
            type: "string"
          },
          webhookUrl: {
            title: "Webhook URL",
            description: "The URL to which the payloads will be delivered",
            type: "string"
          },
          webhookSecret: {
            title: "Webhook Secret",
            description: "Webhook secret value. The default can be provided internally in action creation",
            type: "string"
          },
          events: {
            title: "Triggering Events",
            description: "Determines what events the hook is triggered for. Default: push",
            type: "array",
            oneOf: [
              {
                items: {
                  type: "string",
                  enum: eventNames
                }
              },
              {
                items: {
                  type: "string",
                  const: "*"
                }
              }
            ]
          },
          active: {
            title: "Active",
            type: "boolean",
            description: `Determines if notifications are sent when the webhook is triggered. Default: true`
          },
          contentType: {
            title: "Content Type",
            type: "string",
            enum: ["form", "json"],
            description: `The media type used to serialize the payloads. The default is 'form'`
          },
          insecureSsl: {
            title: "Insecure SSL",
            type: "boolean",
            description: `Determines whether the SSL certificate of the host for url will be verified when delivering payloads. Default 'false'`
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
      const {
        repoUrl,
        webhookUrl,
        webhookSecret = defaultWebhookSecret,
        events = ["push"],
        active = true,
        contentType = "form",
        insecureSsl = false,
        token: providedToken
      } = ctx.input;
      ctx.logger.info(`Creating webhook ${webhookUrl} for repo ${repoUrl}`);
      const { owner, repo } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
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
      if (ctx.isDryRun) {
        ctx.logger.info(`Dry run complete`);
        return;
      }
      try {
        const insecure_ssl = insecureSsl ? "1" : "0";
        await client.rest.repos.createWebhook({
          owner,
          repo,
          config: {
            url: webhookUrl,
            content_type: contentType,
            secret: webhookSecret,
            insecure_ssl
          },
          events,
          active
        });
        ctx.logger.info(`Webhook '${webhookUrl}' created successfully`);
      } catch (e) {
        errors.assertError(e);
        ctx.logger.warn(
          `Failed: create webhook '${webhookUrl}' on repo: '${repo}', ${e.message}`
        );
      }
    }
  });
}

exports.createGithubWebhookAction = createGithubWebhookAction;
//# sourceMappingURL=githubWebhook.cjs.js.map
