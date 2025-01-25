'use strict';

var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var zod = require('zod');
var commonGitlabConfig = require('../commonGitlabConfig.cjs.js');
var util = require('../util.cjs.js');
var gitlabPipelineTrigger_examples = require('./gitlabPipelineTrigger.examples.cjs.js');
var helpers = require('./helpers.cjs.js');

const pipelineInputProperties = zod.z.object({
  projectId: zod.z.number().describe("Project Id"),
  tokenDescription: zod.z.string().describe("Pipeline token description"),
  branch: zod.z.string().describe("Project branch"),
  variables: zod.z.record(zod.z.string(), zod.z.string()).optional().describe(
    "A object/record of key-valued strings containing the pipeline variables."
  )
});
const pipelineOutputProperties = zod.z.object({
  pipelineUrl: zod.z.string({ description: "Pipeline Url" })
});
const createTriggerGitlabPipelineAction = (options) => {
  const { integrations } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "gitlab:pipeline:trigger",
    description: "Triggers a GitLab Pipeline.",
    examples: gitlabPipelineTrigger_examples.examples,
    schema: {
      input: commonGitlabConfig.default.merge(pipelineInputProperties),
      output: pipelineOutputProperties
    },
    async handler(ctx) {
      let pipelineTokenResponse = null;
      const { repoUrl, projectId, tokenDescription, token, branch, variables } = commonGitlabConfig.default.merge(pipelineInputProperties).parse(ctx.input);
      const { host } = util.parseRepoUrl(repoUrl, integrations);
      const api = util.getClient({ host, integrations, token });
      try {
        pipelineTokenResponse = await api.PipelineTriggerTokens.create(
          projectId,
          tokenDescription
        );
        if (!pipelineTokenResponse.token) {
          ctx.logger.error("Failed to create pipeline token.");
          return;
        }
        ctx.logger.info(
          `Pipeline token id ${pipelineTokenResponse.id} created.`
        );
        const pipelineTriggerResponse = await api.PipelineTriggerTokens.trigger(
          projectId,
          branch,
          pipelineTokenResponse.token,
          { variables }
        );
        if (!pipelineTriggerResponse.id) {
          ctx.logger.error("Failed to trigger pipeline.");
          return;
        }
        ctx.logger.info(`Pipeline id ${pipelineTriggerResponse.id} triggered.`);
        ctx.output("pipelineUrl", pipelineTriggerResponse.web_url);
      } catch (error) {
        if (error instanceof zod.z.ZodError) {
          throw new errors.InputError(`Validation error: ${error.message}`, {
            validationErrors: error.errors
          });
        }
        throw new errors.InputError(
          `Failed to trigger Pipeline: ${helpers.getErrorMessage(error)}`
        );
      } finally {
        if (pipelineTokenResponse && pipelineTokenResponse.id) {
          try {
            await api.PipelineTriggerTokens.remove(
              projectId,
              pipelineTokenResponse.id
            );
            ctx.logger.info(
              `Deleted pipeline token ${pipelineTokenResponse.id}.`
            );
          } catch (error) {
            ctx.logger.error(
              `Failed to delete pipeline token id ${pipelineTokenResponse.id}.`
            );
          }
        }
      }
    }
  });
};

exports.createTriggerGitlabPipelineAction = createTriggerGitlabPipelineAction;
//# sourceMappingURL=gitlabPipelineTrigger.cjs.js.map
