'use strict';

var errors = require('@backstage/errors');
var integration = require('@backstage/integration');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var azureDevopsNodeApi = require('azure-devops-node-api');
var azure_examples = require('./azure.examples.cjs.js');

function createPublishAzureAction(options) {
  const { integrations, config } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "publish:azure",
    examples: azure_examples.examples,
    description: "Initializes a git repository of the content in the workspace, and publishes it to Azure.",
    schema: {
      input: {
        type: "object",
        required: ["repoUrl"],
        properties: {
          repoUrl: {
            title: "Repository Location",
            type: "string"
          },
          description: {
            title: "Repository Description",
            type: "string"
          },
          defaultBranch: {
            title: "Default Branch",
            type: "string",
            description: `Sets the default branch on the repository. The default value is 'master'`
          },
          gitCommitMessage: {
            title: "Git Commit Message",
            type: "string",
            description: `Sets the commit message on the repository. The default value is 'initial commit'`
          },
          gitAuthorName: {
            title: "Default Author Name",
            type: "string",
            description: `Sets the default author name for the commit. The default value is 'Scaffolder'`
          },
          gitAuthorEmail: {
            title: "Default Author Email",
            type: "string",
            description: `Sets the default author email for the commit.`
          },
          sourcePath: {
            title: "Source Path",
            description: "Path within the workspace that will be used as the repository root. If omitted, the entire workspace will be published as the repository.",
            type: "string"
          },
          token: {
            title: "Authentication Token",
            type: "string",
            description: "The token to use for authorization to Azure"
          }
        }
      },
      output: {
        type: "object",
        properties: {
          remoteUrl: {
            title: "A URL to the repository with the provider",
            type: "string"
          },
          repoContentsUrl: {
            title: "A URL to the root of the repository",
            type: "string"
          },
          repositoryId: {
            title: "The Id of the created repository",
            type: "string"
          },
          commitHash: {
            title: "The git commit hash of the initial commit",
            type: "string"
          }
        }
      }
    },
    async handler(ctx) {
      const {
        repoUrl,
        defaultBranch = "master",
        gitCommitMessage = "initial commit",
        gitAuthorName,
        gitAuthorEmail
      } = ctx.input;
      const { project, repo, host, organization } = pluginScaffolderNode.parseRepoUrl(
        repoUrl,
        integrations
      );
      if (!organization) {
        throw new errors.InputError(
          `Invalid URL provider was included in the repo URL to create ${ctx.input.repoUrl}, missing organization`
        );
      }
      const url = `https://${host}/${organization}`;
      const credentialProvider = integration.DefaultAzureDevOpsCredentialsProvider.fromIntegrations(integrations);
      const credentials = await credentialProvider.getCredentials({ url });
      if (credentials === void 0 && ctx.input.token === void 0) {
        throw new errors.InputError(
          `No credentials provided ${url}, please check your integrations config`
        );
      }
      const authHandler = ctx.input.token || credentials?.type === "pat" ? azureDevopsNodeApi.getPersonalAccessTokenHandler(ctx.input.token ?? credentials.token) : azureDevopsNodeApi.getBearerHandler(credentials.token);
      const webApi = new azureDevopsNodeApi.WebApi(url, authHandler);
      const client = await webApi.getGitApi();
      const createOptions = { name: repo };
      const returnedRepo = await client.createRepository(
        createOptions,
        project
      );
      if (!returnedRepo) {
        throw new errors.InputError(
          `Unable to create the repository with Organization ${organization}, Project ${project} and Repo ${repo}.
          Please make sure that both the Org and Project are typed corrected and exist.`
        );
      }
      const remoteUrl = returnedRepo.remoteUrl;
      if (!remoteUrl) {
        throw new errors.InputError(
          "No remote URL returned from create repository for Azure"
        );
      }
      const repositoryId = returnedRepo.id;
      if (!repositoryId) {
        throw new errors.InputError("No Id returned from create repository for Azure");
      }
      const repoContentsUrl = returnedRepo.webUrl;
      if (!repoContentsUrl) {
        throw new errors.InputError(
          "No web URL returned from create repository for Azure"
        );
      }
      const gitAuthorInfo = {
        name: gitAuthorName ? gitAuthorName : config.getOptionalString("scaffolder.defaultAuthor.name"),
        email: gitAuthorEmail ? gitAuthorEmail : config.getOptionalString("scaffolder.defaultAuthor.email")
      };
      const auth = {
        username: "notempty",
        password: ctx.input.token ?? credentials.token
      };
      const commitResult = await pluginScaffolderNode.initRepoAndPush({
        dir: pluginScaffolderNode.getRepoSourceDirectory(ctx.workspacePath, ctx.input.sourcePath),
        remoteUrl,
        defaultBranch,
        auth,
        logger: ctx.logger,
        commitMessage: gitCommitMessage ? gitCommitMessage : config.getOptionalString("scaffolder.defaultCommitMessage"),
        gitAuthorInfo
      });
      ctx.output("commitHash", commitResult?.commitHash);
      ctx.output("remoteUrl", remoteUrl);
      ctx.output("repoContentsUrl", repoContentsUrl);
      ctx.output("repositoryId", repositoryId);
    }
  });
}

exports.createPublishAzureAction = createPublishAzureAction;
//# sourceMappingURL=azure.cjs.js.map
