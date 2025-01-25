'use strict';

var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var rest = require('@gitbeaker/rest');
var luxon = require('luxon');
var zod = require('zod');
var util = require('../util.cjs.js');
var gitlabProjectAccessTokenCreate_examples = require('./gitlabProjectAccessTokenCreate.examples.cjs.js');

const createGitlabProjectAccessTokenAction = (options) => {
  const { integrations } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "gitlab:projectAccessToken:create",
    examples: gitlabProjectAccessTokenCreate_examples.examples,
    schema: {
      input: zod.z.object({
        projectId: zod.z.union([zod.z.number(), zod.z.string()], {
          description: "Project ID/Name(slug) of the Gitlab Project"
        }),
        token: zod.z.string({
          description: "The token to use for authorization to GitLab"
        }).optional(),
        name: zod.z.string({ description: "Name of Access Key" }).optional(),
        repoUrl: zod.z.string({ description: "URL to gitlab instance" }),
        accessLevel: zod.z.number({
          description: "Access Level of the Token, 10 (Guest), 20 (Reporter), 30 (Developer), 40 (Maintainer), and 50 (Owner)"
        }).optional(),
        scopes: zod.z.string({
          description: "Scopes for a project access token"
        }).array().optional(),
        expiresAt: zod.z.string({
          description: "Expiration date of the access token in ISO format (YYYY-MM-DD). If Empty, it will set to the maximum of 365 days."
        }).optional()
      }),
      output: zod.z.object({
        access_token: zod.z.string({ description: "Access Token" })
      })
    },
    async handler(ctx) {
      ctx.logger.info(`Creating Token for Project "${ctx.input.projectId}"`);
      const {
        projectId,
        name = "tokenname",
        accessLevel = 40,
        scopes = ["read_repository"],
        expiresAt
      } = ctx.input;
      const { token, integrationConfig } = util.getToken(ctx.input, integrations);
      if (!integrationConfig.config.token && token) {
        throw new errors.InputError(
          `No token available for host ${integrationConfig.config.baseUrl}`
        );
      }
      let api;
      if (!ctx.input.token) {
        api = new rest.Gitlab({
          host: integrationConfig.config.baseUrl,
          token
        });
      } else {
        api = new rest.Gitlab({
          host: integrationConfig.config.baseUrl,
          oauthToken: token
        });
      }
      const response = await api.ProjectAccessTokens.create(
        projectId,
        name,
        scopes,
        expiresAt || luxon.DateTime.now().plus({ days: 365 }).toISODate(),
        {
          accessLevel
        }
      );
      if (!response.token) {
        throw new Error("Could not create project access token");
      }
      ctx.output("access_token", response.token);
    }
  });
};

exports.createGitlabProjectAccessTokenAction = createGitlabProjectAccessTokenAction;
//# sourceMappingURL=gitlabProjectAccessTokenCreate.cjs.js.map
