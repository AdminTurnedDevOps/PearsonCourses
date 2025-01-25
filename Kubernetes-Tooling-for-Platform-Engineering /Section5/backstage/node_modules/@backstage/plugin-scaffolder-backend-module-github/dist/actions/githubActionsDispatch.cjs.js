'use strict';

var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var octokit = require('octokit');
var helpers = require('./helpers.cjs.js');
var githubActionsDispatch_examples = require('./githubActionsDispatch.examples.cjs.js');

function createGithubActionsDispatchAction(options) {
  const { integrations, githubCredentialsProvider } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "github:actions:dispatch",
    description: "Dispatches a GitHub Action workflow for a given branch or tag",
    examples: githubActionsDispatch_examples.examples,
    schema: {
      input: {
        type: "object",
        required: ["repoUrl", "workflowId", "branchOrTagName"],
        properties: {
          repoUrl: {
            title: "Repository Location",
            description: `Accepts the format 'github.com?repo=reponame&owner=owner' where 'reponame' is the new repository name and 'owner' is an organization or username`,
            type: "string"
          },
          workflowId: {
            title: "Workflow ID",
            description: "The GitHub Action Workflow filename",
            type: "string"
          },
          branchOrTagName: {
            title: "Branch or Tag name",
            description: "The git branch or tag name used to dispatch the workflow",
            type: "string"
          },
          workflowInputs: {
            title: "Workflow Inputs",
            description: "Inputs keys and values to send to GitHub Action configured on the workflow file. The maximum number of properties is 10. ",
            type: "object"
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
        workflowId,
        branchOrTagName,
        workflowInputs,
        token: providedToken
      } = ctx.input;
      ctx.logger.info(
        `Dispatching workflow ${workflowId} for repo ${repoUrl} on ${branchOrTagName}`
      );
      const { owner, repo } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
      if (!owner) {
        throw new errors.InputError("Invalid repository owner provided in repoUrl");
      }
      const client = new octokit.Octokit(
        await helpers.getOctokitOptions({
          integrations,
          repoUrl,
          credentialsProvider: githubCredentialsProvider,
          token: providedToken
        })
      );
      await client.rest.actions.createWorkflowDispatch({
        owner,
        repo,
        workflow_id: workflowId,
        ref: branchOrTagName,
        inputs: workflowInputs
      });
      ctx.logger.info(`Workflow ${workflowId} dispatched successfully`);
    }
  });
}

exports.createGithubActionsDispatchAction = createGithubActionsDispatchAction;
//# sourceMappingURL=githubActionsDispatch.cjs.js.map
