'use strict';

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var zod = require('zod');
var commonGitlabConfig = require('../commonGitlabConfig.cjs.js');
var util = require('../util.cjs.js');
var gitlabProjectVariableCreate_examples = require('./gitlabProjectVariableCreate.examples.cjs.js');

const createGitlabProjectVariableAction = (options) => {
  const { integrations } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "gitlab:projectVariable:create",
    examples: gitlabProjectVariableCreate_examples.examples,
    schema: {
      input: commonGitlabConfig.default.merge(
        zod.z.object({
          projectId: zod.z.union([zod.z.number(), zod.z.string()], {
            description: "Project ID"
          }),
          key: zod.z.string({
            description: "The key of a variable; must have no more than 255 characters; only A-Z, a-z, 0-9, and _ are allowed"
          }).regex(/^[A-Za-z0-9_]{1,255}$/),
          value: zod.z.string({ description: "The value of a variable" }),
          variableType: zod.z.string({
            description: "Variable Type (env_var or file)"
          }),
          variableProtected: zod.z.boolean({ description: "Whether the variable is protected" }).default(false).optional(),
          masked: zod.z.boolean({ description: "Whether the variable is masked" }).default(false).optional(),
          raw: zod.z.boolean({ description: "Whether the variable is expandable" }).default(false).optional(),
          environmentScope: zod.z.string({ description: "The environment_scope of the variable" }).default("*").optional()
        })
      )
    },
    async handler(ctx) {
      const {
        repoUrl,
        projectId,
        key,
        value,
        variableType,
        variableProtected = false,
        masked = false,
        raw = false,
        environmentScope = "*",
        token
      } = ctx.input;
      const { host } = util.parseRepoUrl(repoUrl, integrations);
      const api = util.getClient({ host, integrations, token });
      await api.ProjectVariables.create(projectId, key, value, {
        variableType,
        protected: variableProtected,
        masked,
        raw,
        environmentScope
      });
    }
  });
};

exports.createGitlabProjectVariableAction = createGitlabProjectVariableAction;
//# sourceMappingURL=gitlabProjectVariableCreate.cjs.js.map
