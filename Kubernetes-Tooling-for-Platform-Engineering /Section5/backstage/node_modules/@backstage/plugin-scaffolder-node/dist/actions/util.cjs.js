'use strict';

var errors = require('@backstage/errors');
var backendPluginApi = require('@backstage/backend-plugin-api');
var path = require('path');

const getRepoSourceDirectory = (workspacePath, sourcePath) => {
  if (sourcePath) {
    const safeSuffix = path.normalize(sourcePath).replace(
      /^(\.\.(\/|\\|$))+/,
      ""
    );
    const path$1 = path.join(workspacePath, safeSuffix);
    if (!backendPluginApi.isChildPath(workspacePath, path$1)) {
      throw new Error("Invalid source path");
    }
    return path$1;
  }
  return workspacePath;
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
  const organization = parsed.searchParams.get("organization") ?? void 0;
  const workspace = parsed.searchParams.get("workspace") ?? void 0;
  const project = parsed.searchParams.get("project") ?? void 0;
  const type = integrations.byHost(host)?.type;
  if (!type) {
    throw new errors.InputError(
      `No matching integration configuration for host ${host}, please check your integrations config`
    );
  }
  const repo = parsed.searchParams.get("repo");
  switch (type) {
    case "bitbucket": {
      if (host === "www.bitbucket.org") {
        checkRequiredParams(parsed, "workspace");
      }
      checkRequiredParams(parsed, "project", "repo");
      break;
    }
    case "azure": {
      checkRequiredParams(parsed, "project", "repo");
      break;
    }
    case "gitlab": {
      if (!project) {
        checkRequiredParams(parsed, "owner", "repo");
      }
      break;
    }
    case "gitea": {
      checkRequiredParams(parsed, "repo");
      break;
    }
    case "gerrit": {
      checkRequiredParams(parsed, "repo");
      break;
    }
    default: {
      checkRequiredParams(parsed, "repo", "owner");
      break;
    }
  }
  return { host, owner, repo, organization, workspace, project };
};
function checkRequiredParams(repoUrl, ...params) {
  for (let i = 0; i < params.length; i++) {
    if (!repoUrl.searchParams.get(params[i])) {
      throw new errors.InputError(
        `Invalid repo URL passed to publisher: ${repoUrl.toString()}, missing ${params[i]}`
      );
    }
  }
}

exports.getRepoSourceDirectory = getRepoSourceDirectory;
exports.parseRepoUrl = parseRepoUrl;
//# sourceMappingURL=util.cjs.js.map
