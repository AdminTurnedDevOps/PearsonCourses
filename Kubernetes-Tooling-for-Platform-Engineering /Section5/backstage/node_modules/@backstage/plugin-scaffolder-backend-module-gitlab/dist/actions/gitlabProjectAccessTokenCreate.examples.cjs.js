'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Create a GitLab project access token with minimal options.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "456"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with custom scopes.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "789",
            scopes: ["read_registry", "write_repository"]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with a specified name.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "101112",
            name: "my-custom-token"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with a numeric project ID.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: 42
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with a specified expired Date.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "123",
            expiresAt: "2024-06-25"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with an access level",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "456",
            accessLevel: 30
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with multiple options",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "456",
            accessLevel: 40,
            name: "full-access-token",
            expiresAt: "2024-12-31"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with a token for authorization",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "101112",
            token: "personal-access-token"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with read-only scopes",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "101112",
            scopes: ["read_repository", "read_api"]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with guest access level",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "101112",
            accessLevel: 10
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with maintainer access level",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "101112",
            accessLevel: 40
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with owner access level",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "101112",
            accessLevel: 50
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token with a specified name and no expiration date",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "101112",
            name: "no-expiry-token"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project access token for a specific gitlab instance",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createAccessToken",
          action: "gitlab:projectAccessToken:create",
          name: "Create GitLab Project Access Token",
          input: {
            repoUrl: "gitlab.example.com?repo=repo&owner=owner",
            projectId: "101112"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gitlabProjectAccessTokenCreate.examples.cjs.js.map
