'use strict';

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var zod = require('zod');
var commonGitlabConfig = require('../commonGitlabConfig.cjs.js');
var util = require('../util.cjs.js');
var gitlabGroupEnsureExists_examples = require('./gitlabGroupEnsureExists.examples.cjs.js');

const createGitlabGroupEnsureExistsAction = (options) => {
  const { integrations } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "gitlab:group:ensureExists",
    description: "Ensures a Gitlab group exists",
    supportsDryRun: true,
    examples: gitlabGroupEnsureExists_examples.examples,
    schema: {
      input: commonGitlabConfig.default.merge(
        zod.z.object({
          path: zod.z.array(zod.z.string(), {
            description: "A path of group names that is ensured to exist"
          }).min(1)
        })
      ),
      output: zod.z.object({
        groupId: zod.z.number({ description: "The id of the innermost sub-group" }).optional()
      })
    },
    async handler(ctx) {
      if (ctx.isDryRun) {
        ctx.output("groupId", 42);
        return;
      }
      const { token, repoUrl, path } = ctx.input;
      const { host } = util.parseRepoUrl(repoUrl, integrations);
      const api = util.getClient({ host, integrations, token });
      let currentPath = null;
      let parentId = null;
      for (const pathElement of path) {
        const fullPath = currentPath ? `${currentPath}/${pathElement}` : pathElement;
        const result = await api.Groups.search(
          fullPath
        );
        const subGroup = result.find(
          (searchPathElem) => searchPathElem.full_path === fullPath
        );
        if (!subGroup) {
          ctx.logger.info(`creating missing group ${fullPath}`);
          parentId = (await api.Groups.create(
            pathElement,
            pathElement,
            parentId ? {
              parentId
            } : {}
          ))?.id;
        } else {
          parentId = subGroup.id;
        }
        currentPath = fullPath;
      }
      if (parentId !== null) {
        ctx.output("groupId", parentId);
      }
    }
  });
};

exports.createGitlabGroupEnsureExistsAction = createGitlabGroupEnsureExistsAction;
//# sourceMappingURL=gitlabGroupEnsureExists.cjs.js.map
