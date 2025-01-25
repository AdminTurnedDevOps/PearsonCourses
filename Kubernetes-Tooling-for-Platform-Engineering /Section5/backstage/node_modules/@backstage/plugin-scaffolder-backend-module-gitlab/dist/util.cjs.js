'use strict';

var errors = require('@backstage/errors');
var rest = require('@gitbeaker/rest');

const parseRepoHost = (repoUrl) => {
  let parsed;
  try {
    parsed = new URL(`https://${repoUrl}`);
  } catch (error) {
    throw new errors.InputError(
      `Invalid repo URL passed to publisher, got ${repoUrl}, ${error}`
    );
  }
  return parsed.host;
};
const getToken = (config, integrations) => {
  const host = parseRepoHost(config.repoUrl);
  const integrationConfig = integrations.gitlab.byHost(host);
  if (!integrationConfig) {
    throw new errors.InputError(
      `No matching integration configuration for host ${host}, please check your integrations config`
    );
  }
  const token = config.token || integrationConfig.config.token;
  return { token, integrationConfig };
};
const parseRepoUrl = (repoUrl, integrations) => {
  let parsed;
  try {
    parsed = new URL(`https://${repoUrl}`);
  } catch (error) {
    throw new errors.InputError(
      `Invalid repo URL passed to publisher, got ${repoUrl}, ${error}`
    );
  }
  const host = parsed.host;
  const owner = parsed.searchParams.get("owner") ?? void 0;
  const repo = parsed.searchParams.get("repo");
  const type = integrations.byHost(host)?.type;
  if (!type) {
    throw new errors.InputError(
      `No matching integration configuration for host ${host}, please check your integrations config`
    );
  }
  return { host, owner, repo };
};
function getClient(props) {
  const { host, token, integrations } = props;
  const integrationConfig = integrations.gitlab.byHost(host);
  if (!integrationConfig) {
    throw new errors.InputError(
      `No matching integration configuration for host ${host}, please check your integrations config`
    );
  }
  const { config } = integrationConfig;
  if (!config.token && !token) {
    throw new errors.InputError(`No token available for host ${host}`);
  }
  const requestToken = token || config.token;
  const tokenType = token ? "oauthToken" : "token";
  const gitlabOptions = {
    host: config.baseUrl
  };
  gitlabOptions[tokenType] = requestToken;
  return new rest.Gitlab(gitlabOptions);
}
function convertDate(inputDate, defaultDate) {
  try {
    return inputDate ? new Date(inputDate).toISOString() : new Date(defaultDate).toISOString();
  } catch (error) {
    throw new errors.InputError(`Error converting input date - ${error}`);
  }
}
async function getTopLevelParentGroup(client, groupId) {
  try {
    const topParentGroup = await client.Groups.show(groupId);
    if (topParentGroup.parent_id) {
      return getTopLevelParentGroup(client, topParentGroup.parent_id);
    }
    return topParentGroup;
  } catch (error) {
    throw new errors.InputError(
      `Error finding top-level parent group ID: ${error.message}`
    );
  }
}
async function checkEpicScope(client, projectId, epicId) {
  try {
    const project = await client.Projects.show(projectId);
    if (!project) {
      throw new errors.InputError(
        `Project with id ${projectId} not found. Check your GitLab instance.`
      );
    }
    const topParentGroup = await getTopLevelParentGroup(
      client,
      project.namespace.id
    );
    if (!topParentGroup) {
      throw new errors.InputError(`Couldn't find a suitable top-level parent group.`);
    }
    const epic = (await client.Epics.all(topParentGroup.id)).find(
      (x) => x.id === epicId
    );
    if (!epic) {
      throw new errors.InputError(
        `Epic with id ${epicId} not found in the top-level parent group ${topParentGroup.name}.`
      );
    }
    const epicGroup = await client.Groups.show(epic.group_id);
    const projectNamespace = project.path_with_namespace;
    return projectNamespace.startsWith(epicGroup.full_path);
  } catch (error) {
    throw new errors.InputError(`Could not find epic scope: ${error.message}`);
  }
}

exports.checkEpicScope = checkEpicScope;
exports.convertDate = convertDate;
exports.getClient = getClient;
exports.getToken = getToken;
exports.getTopLevelParentGroup = getTopLevelParentGroup;
exports.parseRepoHost = parseRepoHost;
exports.parseRepoUrl = parseRepoUrl;
//# sourceMappingURL=util.cjs.js.map
