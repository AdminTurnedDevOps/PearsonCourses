'use strict';

var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var helpers = require('./helpers.cjs.js');
var octokit = require('octokit');
var Sodium = require('libsodium-wrappers');
var gitHubEnvironment_examples = require('./gitHubEnvironment.examples.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var Sodium__default = /*#__PURE__*/_interopDefaultCompat(Sodium);

function createGithubEnvironmentAction(options) {
  const { integrations, catalogClient, auth } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "github:environment:create",
    description: "Creates Deployment Environments",
    examples: gitHubEnvironment_examples.examples,
    schema: {
      input: {
        type: "object",
        required: ["repoUrl", "name"],
        properties: {
          repoUrl: {
            title: "Repository Location",
            description: `Accepts the format 'github.com?repo=reponame&owner=owner' where 'reponame' is the new repository name and 'owner' is an organization or username`,
            type: "string"
          },
          name: {
            title: "Environment Name",
            description: `Name of the deployment environment to create`,
            type: "string"
          },
          deploymentBranchPolicy: {
            title: "Deployment Branch Policy",
            description: `The type of deployment branch policy for this environment. To allow all branches to deploy, set to null.`,
            type: "object",
            required: ["protected_branches", "custom_branch_policies"],
            properties: {
              protected_branches: {
                title: "Protected Branches",
                description: `Whether only branches with branch protection rules can deploy to this environment. If protected_branches is true, custom_branch_policies must be false; if protected_branches is false, custom_branch_policies must be true.`,
                type: "boolean"
              },
              custom_branch_policies: {
                title: "Custom Branch Policies",
                description: `Whether only branches that match the specified name patterns can deploy to this environment. If custom_branch_policies is true, protected_branches must be false; if custom_branch_policies is false, protected_branches must be true.`,
                type: "boolean"
              }
            }
          },
          customBranchPolicyNames: {
            title: "Custom Branch Policy Name",
            description: `The name pattern that branches must match in order to deploy to the environment.

            Wildcard characters will not match /. For example, to match branches that begin with release/ and contain an additional single slash, use release/*/*. For more information about pattern matching syntax, see the Ruby File.fnmatch documentation.`,
            type: "array",
            items: {
              type: "string"
            }
          },
          customTagPolicyNames: {
            title: "Custom Tag Policy Name",
            description: `The name pattern that tags must match in order to deploy to the environment.

            Wildcard characters will not match /. For example, to match tags that begin with release/ and contain an additional single slash, use release/*/*. For more information about pattern matching syntax, see the Ruby File.fnmatch documentation.`,
            type: "array",
            items: {
              type: "string"
            }
          },
          environmentVariables: {
            title: "Environment Variables",
            description: `Environment variables attached to the deployment environment`,
            type: "object"
          },
          secrets: {
            title: "Deployment Secrets",
            description: `Secrets attached to the deployment environment`,
            type: "object"
          },
          token: {
            title: "Authentication Token",
            type: "string",
            description: "The token to use for authorization to GitHub"
          },
          waitTimer: {
            title: "Wait Timer",
            type: "integer",
            description: "The time to wait before creating or updating the environment (in milliseconds)"
          },
          preventSelfReview: {
            title: "Prevent Self Review",
            type: "boolean",
            description: "Whether to prevent self-review for this environment"
          },
          reviewers: {
            title: "Reviewers",
            type: "array",
            description: "Reviewers for this environment. Must be a list of Backstage entity references.",
            items: {
              type: "string"
            }
          }
        }
      }
    },
    async handler(ctx) {
      const {
        repoUrl,
        name,
        deploymentBranchPolicy,
        customBranchPolicyNames,
        customTagPolicyNames,
        environmentVariables,
        secrets,
        token: providedToken,
        waitTimer,
        preventSelfReview,
        reviewers
      } = ctx.input;
      const { token } = await auth?.getPluginRequestToken({
        onBehalfOf: await ctx.getInitiatorCredentials(),
        targetPluginId: "catalog"
      }) ?? { token: ctx.secrets?.backstageToken };
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      const octokitOptions = await helpers.getOctokitOptions({
        integrations,
        token: providedToken,
        repoUrl
      });
      const { owner, repo } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
      if (!owner) {
        throw new errors.InputError(`No owner provided for repo ${repoUrl}`);
      }
      const client = new octokit.Octokit(octokitOptions);
      const repository = await client.rest.repos.get({
        owner,
        repo
      });
      const githubReviewers = [];
      if (reviewers) {
        let reviewersEntityRefs = [];
        const catalogResponse = await catalogClient?.getEntitiesByRefs(
          {
            entityRefs: reviewers
          },
          {
            token
          }
        );
        if (catalogResponse?.items?.length) {
          reviewersEntityRefs = catalogResponse.items;
        }
        for (const reviewerEntityRef of reviewersEntityRefs) {
          if (reviewerEntityRef?.kind === "User") {
            try {
              const user = await client.rest.users.getByUsername({
                username: reviewerEntityRef.metadata.name
              });
              githubReviewers.push({
                type: "User",
                id: user.data.id
              });
            } catch (error) {
              ctx.logger.error("User not found:", error);
            }
          } else if (reviewerEntityRef?.kind === "Group") {
            try {
              const team = await client.rest.teams.getByName({
                org: owner,
                team_slug: reviewerEntityRef.metadata.name
              });
              githubReviewers.push({
                type: "Team",
                id: team.data.id
              });
            } catch (error) {
              ctx.logger.error("Team not found:", error);
            }
          }
        }
      }
      await client.rest.repos.createOrUpdateEnvironment({
        owner,
        repo,
        environment_name: name,
        deployment_branch_policy: deploymentBranchPolicy ?? null,
        wait_timer: waitTimer ?? 0,
        prevent_self_review: preventSelfReview ?? false,
        reviewers: githubReviewers.length ? githubReviewers : null
      });
      if (customBranchPolicyNames) {
        for (const item of customBranchPolicyNames) {
          await client.rest.repos.createDeploymentBranchPolicy({
            owner,
            repo,
            type: "branch",
            environment_name: name,
            name: item
          });
        }
      }
      if (customTagPolicyNames) {
        for (const item of customTagPolicyNames) {
          await client.rest.repos.createDeploymentBranchPolicy({
            owner,
            repo,
            type: "tag",
            environment_name: name,
            name: item
          });
        }
      }
      for (const [key, value] of Object.entries(environmentVariables ?? {})) {
        await client.rest.actions.createEnvironmentVariable({
          repository_id: repository.data.id,
          owner,
          repo,
          environment_name: name,
          name: key,
          value
        });
      }
      if (secrets) {
        const publicKeyResponse = await client.rest.actions.getEnvironmentPublicKey({
          repository_id: repository.data.id,
          owner,
          repo,
          environment_name: name
        });
        await Sodium__default.default.ready;
        const binaryKey = Sodium__default.default.from_base64(
          publicKeyResponse.data.key,
          Sodium__default.default.base64_variants.ORIGINAL
        );
        for (const [key, value] of Object.entries(secrets)) {
          const binarySecret = Sodium__default.default.from_string(value);
          const encryptedBinarySecret = Sodium__default.default.crypto_box_seal(
            binarySecret,
            binaryKey
          );
          const encryptedBase64Secret = Sodium__default.default.to_base64(
            encryptedBinarySecret,
            Sodium__default.default.base64_variants.ORIGINAL
          );
          await client.rest.actions.createOrUpdateEnvironmentSecret({
            repository_id: repository.data.id,
            owner,
            repo,
            environment_name: name,
            secret_name: key,
            encrypted_value: encryptedBase64Secret,
            key_id: publicKeyResponse.data.key_id
          });
        }
      }
    }
  });
}

exports.createGithubEnvironmentAction = createGithubEnvironmentAction;
//# sourceMappingURL=githubEnvironment.cjs.js.map
