'use strict';

var errors = require('@backstage/errors');
var util = require('../util.cjs.js');

function createHandleAutocompleteRequest(options) {
  return async function handleAutocompleteRequest({
    resource,
    token,
    context
  }) {
    const { integrations } = options;
    const client = util.getClient({
      host: context.host ?? "gitlab.com",
      integrations,
      token
    });
    switch (resource) {
      case "groups": {
        let groups = [];
        let page = 1;
        const perPage = 100;
        let response = [];
        let continueFetch = true;
        while (continueFetch) {
          response = await client.Groups.all({
            pagination: "offset",
            page,
            perPage
          });
          groups = groups.concat(response);
          if (response.length < perPage) continueFetch = false;
          page++;
        }
        const result = {
          results: groups.map((group) => ({
            title: group.full_path,
            id: group.id.toString()
          }))
        };
        const user = await client.Users.showCurrentUser();
        result.results.push({
          title: user.username,
          id: user.id.toString()
        });
        return result;
      }
      case "repositories": {
        if (!context.id)
          throw new errors.InputError("Missing groupId and userId context parameter");
        let response;
        if (context.id === (await client.Users.showCurrentUser())?.id.toString()) {
          response = await client.Users.allProjects(context.id);
        } else {
          response = await client.Groups.allProjects(context.id);
        }
        return {
          results: response.map((project) => ({
            title: project.name.trim(),
            id: project.id.toString()
          }))
        };
      }
      default:
        throw new errors.InputError(`Invalid resource: ${resource}`);
    }
  };
}

exports.createHandleAutocompleteRequest = createHandleAutocompleteRequest;
//# sourceMappingURL=autocomplete.cjs.js.map
