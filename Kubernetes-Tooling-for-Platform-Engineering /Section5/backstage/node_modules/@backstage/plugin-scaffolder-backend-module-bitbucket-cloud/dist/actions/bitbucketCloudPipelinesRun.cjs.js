'use strict';

var bitbucketCloudPipelinesRun_examples = require('./bitbucketCloudPipelinesRun.examples.cjs.js');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var inputProperties = require('./inputProperties.cjs.js');
var helpers = require('./helpers.cjs.js');

const id = "bitbucket:pipelines:run";
const createBitbucketPipelinesRunAction = (options) => {
  const { integrations } = options;
  return pluginScaffolderNode.createTemplateAction({
    id,
    description: "Run a bitbucket cloud pipeline",
    examples: bitbucketCloudPipelinesRun_examples.examples,
    schema: {
      input: {
        type: "object",
        required: ["workspace", "repo_slug"],
        properties: {
          workspace: inputProperties.workspace,
          repo_slug: inputProperties.repo_slug,
          body: inputProperties.pipelinesRunBody,
          token: inputProperties.token
        }
      },
      output: {
        type: "object",
        properties: {
          buildNumber: {
            title: "Build number",
            type: "number"
          },
          repoUrl: {
            title: "A URL to the pipeline repositry",
            type: "string"
          },
          repoContentsUrl: {
            title: "A URL to the pipeline",
            type: "string"
          }
        }
      }
    },
    supportsDryRun: false,
    async handler(ctx) {
      const { workspace, repo_slug, body, token } = ctx.input;
      const host = "bitbucket.org";
      const integrationConfig = integrations.bitbucketCloud.byHost(host);
      const authorization = helpers.getAuthorizationHeader(
        token ? { token } : integrationConfig.config
      );
      let response;
      try {
        response = await fetch(
          `https://api.bitbucket.org/2.0/repositories/${workspace}/${repo_slug}/pipelines`,
          {
            method: "POST",
            headers: {
              Authorization: authorization,
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body) ?? {}
          }
        );
      } catch (e) {
        throw new Error(`Unable to run pipeline, ${e}`);
      }
      if (response.status !== 201) {
        throw new Error(
          `Unable to run pipeline, ${response.status} ${response.statusText}, ${await response.text()}`
        );
      }
      const responseObject = await response.json();
      ctx.output("buildNumber", responseObject.build_number);
      ctx.output("repoUrl", responseObject.repository.links.html.href);
      ctx.output(
        "pipelinesUrl",
        `${responseObject.repository.links.html.href}/pipelines`
      );
    }
  });
};

exports.createBitbucketPipelinesRunAction = createBitbucketPipelinesRunAction;
//# sourceMappingURL=bitbucketCloudPipelinesRun.cjs.js.map
