'use strict';

var errors = require('@backstage/errors');
var pluginBitbucketCloudCommon = require('@backstage/plugin-bitbucket-cloud-common');

async function handleAutocompleteRequest({
  resource,
  token,
  context
}) {
  const client = pluginBitbucketCloudCommon.BitbucketCloudClient.fromConfig({
    host: "bitbucket.org",
    apiBaseUrl: "https://api.bitbucket.org/2.0",
    token
  });
  switch (resource) {
    case "workspaces": {
      const results = [];
      for await (const page of client.listWorkspaces().iteratePages()) {
        const slugs = [...page.values].map((p) => ({
          id: p.slug
        }));
        results.push(...slugs);
      }
      return { results };
    }
    case "projects": {
      if (!context.workspace)
        throw new errors.InputError("Missing workspace context parameter");
      const results = [];
      for await (const page of client.listProjectsByWorkspace(context.workspace).iteratePages()) {
        const keys = [...page.values].map((p) => ({
          id: p.key
        }));
        results.push(...keys);
      }
      return { results };
    }
    case "repositories": {
      if (!context.workspace || !context.project)
        throw new errors.InputError(
          "Missing workspace and/or project context parameter"
        );
      const results = [];
      for await (const page of client.listRepositoriesByWorkspace(context.workspace, {
        q: `project.key="${context.project}"`
      }).iteratePages()) {
        const slugs = [...page.values].map((p) => ({
          id: p.slug
        }));
        results.push(...slugs);
      }
      return { results };
    }
    case "branches": {
      if (!context.workspace || !context.repository)
        throw new errors.InputError(
          "Missing workspace and/or repository context parameter"
        );
      const results = [];
      for await (const page of client.listBranchesByRepository(context.repository, context.workspace).iteratePages()) {
        const names = [...page.values].map((p) => ({
          id: p.name
        }));
        results.push(...names);
      }
      return { results };
    }
    default:
      throw new errors.InputError(`Invalid resource: ${resource}`);
  }
}

exports.handleAutocompleteRequest = handleAutocompleteRequest;
//# sourceMappingURL=autocomplete.cjs.js.map
