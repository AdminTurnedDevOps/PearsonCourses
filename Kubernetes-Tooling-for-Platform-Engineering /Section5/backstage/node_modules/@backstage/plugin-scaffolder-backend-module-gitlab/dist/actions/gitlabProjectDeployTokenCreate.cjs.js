'use strict';

var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var rest = require('@gitbeaker/rest');
var zod = require('zod');
var commonGitlabConfig = require('../commonGitlabConfig.cjs.js');
var util = require('../util.cjs.js');
var gitlabProjectDeployTokenCreate_examples = require('./gitlabProjectDeployTokenCreate.examples.cjs.js');

const createGitlabProjectDeployTokenAction = (options) => {
  const { integrations } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "gitlab:projectDeployToken:create",
    examples: gitlabProjectDeployTokenCreate_examples.examples,
    schema: {
      input: commonGitlabConfig.default.merge(
        zod.z.object({
          projectId: zod.z.union([zod.z.number(), zod.z.string()], {
            description: "Project ID"
          }),
          name: zod.z.string({ description: "Deploy Token Name" }),
          username: zod.z.string({ description: "Deploy Token Username" }).optional(),
          scopes: zod.z.array(zod.z.string(), { description: "Scopes" })
        })
      ),
      output: zod.z.object({
        deploy_token: zod.z.string({ description: "Deploy Token" }),
        user: zod.z.string({ description: "User" })
      })
    },
    async handler(ctx) {
      ctx.logger.info(`Creating Token for Project "${ctx.input.projectId}"`);
      const { projectId, name, username, scopes } = ctx.input;
      const { token, integrationConfig } = util.getToken(ctx.input, integrations);
      if (scopes.length === 0) {
        throw new errors.InputError(
          `Could not create token for project "${ctx.input.projectId}": scopes cannot be empty.`
        );
      }
      const api = new rest.Gitlab({
        host: integrationConfig.config.baseUrl,
        token
      });
      const deployToken = await api.DeployTokens.create(
        name,
        scopes,
        {
          projectId,
          username
        }
      );
      if (!deployToken.hasOwnProperty("token")) {
        throw new errors.InputError(`No deploy_token given from gitlab instance`);
      }
      ctx.output("deploy_token", deployToken.token);
      ctx.output("user", deployToken.username);
    }
  });
};

exports.createGitlabProjectDeployTokenAction = createGitlabProjectDeployTokenAction;
//# sourceMappingURL=gitlabProjectDeployTokenCreate.cjs.js.map
