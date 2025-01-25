'use strict';

const workspace = {
  title: "Workspace",
  description: `The workspace name`,
  type: "string"
};
const repo_slug = {
  title: "Repository name",
  description: "The repository name",
  type: "string"
};
const ref_type = {
  title: "ref_type",
  type: "string"
};
const type = {
  title: "type",
  type: "string"
};
const ref_name = {
  title: "ref_name",
  type: "string"
};
const source = {
  title: "source",
  type: "string"
};
const destination = {
  title: "destination",
  type: "string"
};
const hash = {
  title: "hash",
  type: "string"
};
const pattern = {
  title: "pattern",
  type: "string"
};
const id = {
  title: "id",
  type: "string"
};
const key = {
  title: "key",
  type: "string"
};
const value = {
  title: "value",
  type: "string"
};
const secured = {
  title: "secured",
  type: "boolean"
};
const token = {
  title: "Authentication Token",
  type: "string",
  description: "The token to use for authorization to BitBucket Cloud"
};
const destination_commit = {
  title: "destination_commit",
  type: "object",
  properties: {
    hash
  }
};
const commit = {
  title: "commit",
  type: "object",
  properties: {
    type,
    hash
  }
};
const selector = {
  title: "selector",
  type: "object",
  properties: {
    type,
    pattern
  }
};
const pull_request = {
  title: "pull_request",
  type: "object",
  properties: {
    id
  }
};
const pipelinesRunBody = {
  title: "Request Body",
  description: "Request body properties: see Bitbucket Cloud Rest API documentation for more details",
  type: "object",
  properties: {
    target: {
      title: "target",
      type: "object",
      properties: {
        ref_type,
        type,
        ref_name,
        source,
        destination,
        destination_commit,
        commit,
        selector,
        pull_request
      }
    },
    variables: {
      title: "variables",
      type: "array",
      items: {
        type: "object",
        properties: {
          key,
          value,
          secured
        }
      }
    }
  }
};

exports.pipelinesRunBody = pipelinesRunBody;
exports.repo_slug = repo_slug;
exports.token = token;
exports.workspace = workspace;
//# sourceMappingURL=inputProperties.cjs.js.map
