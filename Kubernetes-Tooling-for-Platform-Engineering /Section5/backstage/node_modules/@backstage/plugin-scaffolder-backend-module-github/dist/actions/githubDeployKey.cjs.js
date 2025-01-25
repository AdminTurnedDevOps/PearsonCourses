'use strict';

var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var helpers = require('./helpers.cjs.js');
var octokit = require('octokit');
var Sodium = require('libsodium-wrappers');
var githubDeployKey_examples = require('./githubDeployKey.examples.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var Sodium__default = /*#__PURE__*/_interopDefaultCompat(Sodium);

function createGithubDeployKeyAction(options) {
  const { integrations } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "github:deployKey:create",
    description: "Creates and stores Deploy Keys",
    examples: githubDeployKey_examples.examples,
    schema: {
      input: {
        type: "object",
        required: ["repoUrl", "publicKey", "privateKey", "deployKeyName"],
        properties: {
          repoUrl: {
            title: "Repository Location",
            description: `Accepts the format 'github.com?repo=reponame&owner=owner' where 'reponame' is the new repository name and 'owner' is an organization or username`,
            type: "string"
          },
          publicKey: {
            title: "SSH Public Key",
            description: `Generated from ssh-keygen.  Begins with 'ssh-rsa', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521', 'ssh-ed25519', 'sk-ecdsa-sha2-nistp256@openssh.com', or 'sk-ssh-ed25519@openssh.com'.`,
            type: "string"
          },
          privateKey: {
            title: "SSH Private Key",
            description: `SSH Private Key generated from ssh-keygen`,
            type: "string"
          },
          deployKeyName: {
            title: "Deploy Key Name",
            description: `Name of the Deploy Key`,
            type: "string"
          },
          privateKeySecretName: {
            title: "Private Key GitHub Secret Name",
            description: `Name of the GitHub Secret to store the private key related to the Deploy Key.  Defaults to: 'KEY_NAME_PRIVATE_KEY' where 'KEY_NAME' is the name of the Deploy Key`,
            type: "string"
          },
          token: {
            title: "Authentication Token",
            type: "string",
            description: "The token to use for authorization to GitHub"
          }
        }
      },
      output: {
        type: "object",
        properties: {
          privateKeySecretName: {
            title: "The GitHub Action Repo Secret Name for the Private Key",
            type: "string"
          }
        }
      }
    },
    async handler(ctx) {
      const {
        repoUrl,
        publicKey,
        privateKey,
        deployKeyName,
        privateKeySecretName = `${deployKeyName.split(" ").join("_").toLocaleUpperCase("en-US")}_PRIVATE_KEY`,
        token: providedToken
      } = ctx.input;
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
      await client.rest.repos.createDeployKey({
        owner,
        repo,
        title: deployKeyName,
        key: publicKey
      });
      const publicKeyResponse = await client.rest.actions.getRepoPublicKey({
        owner,
        repo
      });
      await Sodium__default.default.ready;
      const binaryKey = Sodium__default.default.from_base64(
        publicKeyResponse.data.key,
        Sodium__default.default.base64_variants.ORIGINAL
      );
      const binarySecret = Sodium__default.default.from_string(privateKey);
      const encryptedBinarySecret = Sodium__default.default.crypto_box_seal(
        binarySecret,
        binaryKey
      );
      const encryptedBase64Secret = Sodium__default.default.to_base64(
        encryptedBinarySecret,
        Sodium__default.default.base64_variants.ORIGINAL
      );
      await client.rest.actions.createOrUpdateRepoSecret({
        owner,
        repo,
        secret_name: privateKeySecretName,
        encrypted_value: encryptedBase64Secret,
        key_id: publicKeyResponse.data.key_id
      });
      ctx.output("privateKeySecretName", privateKeySecretName);
    }
  });
}

exports.createGithubDeployKeyAction = createGithubDeployKeyAction;
//# sourceMappingURL=githubDeployKey.cjs.js.map
