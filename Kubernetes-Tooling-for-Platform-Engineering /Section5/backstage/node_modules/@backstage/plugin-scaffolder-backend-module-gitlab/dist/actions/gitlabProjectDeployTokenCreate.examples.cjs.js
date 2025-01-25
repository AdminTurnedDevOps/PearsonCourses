'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Create a GitLab project deploy token with minimal options.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createDeployToken",
          action: "gitlab:projectDeployToken:create",
          name: "Create GitLab Project Deploy Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "456",
            name: "tokenname",
            scopes: ["read_registry"]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project deploy token with many custom scopes.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createDeployToken",
          action: "gitlab:projectDeployToken:create",
          name: "Create GitLab Project Deploy Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "789",
            name: "tokenname",
            scopes: ["read_registry", "write_repository"]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project deploy token with a specified name.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createDeployToken",
          action: "gitlab:projectDeployToken:create",
          name: "Create GitLab Project Deploy Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "101112",
            name: "my-custom-token",
            scopes: ["read_registry"]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project deploy token with a numeric project ID.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createDeployToken",
          action: "gitlab:projectDeployToken:create",
          name: "Create GitLab Project Deploy Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: 42,
            name: "tokenname",
            scopes: ["read_registry"]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project deploy token with a custom username",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createDeployToken",
          action: "gitlab:projectDeployToken:create",
          name: "Create GitLab Project Deploy Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: 42,
            name: "tokenname",
            username: "tokenuser",
            scopes: ["read_registry"]
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gitlabProjectDeployTokenCreate.examples.cjs.js.map
