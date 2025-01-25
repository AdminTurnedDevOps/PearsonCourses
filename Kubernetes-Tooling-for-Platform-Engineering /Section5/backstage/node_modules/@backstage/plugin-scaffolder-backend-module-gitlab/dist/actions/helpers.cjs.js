'use strict';

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var errors = require('@backstage/errors');
var rest = require('@gitbeaker/rest');

function createGitlabApi(options) {
  const { integrations, token: providedToken, repoUrl } = options;
  const { host } = pluginScaffolderNode.parseRepoUrl(repoUrl, integrations);
  const integrationConfig = integrations.gitlab.byHost(host);
  if (!integrationConfig) {
    throw new errors.InputError(
      `No matching integration configuration for host ${host}, please check your integrations config`
    );
  }
  if (!integrationConfig.config.token && !providedToken) {
    throw new errors.InputError(`No token available for host ${host}`);
  }
  const token = providedToken ?? integrationConfig.config.token;
  const tokenType = providedToken ? "oauthToken" : "token";
  return new rest.Gitlab({
    host: integrationConfig.config.baseUrl,
    [tokenType]: token
  });
}
function isGitlabError(e) {
  return errors.isError(e) && "description" in e && typeof e.description === "string";
}
function getErrorMessage(e) {
  if (isGitlabError(e)) return `${e} - ${e.description}`;
  return String(e);
}

exports.createGitlabApi = createGitlabApi;
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=helpers.cjs.js.map
