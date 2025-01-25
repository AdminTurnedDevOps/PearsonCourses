'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Creating a GitLab project variable of type env_var",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createVariable",
          action: "gitlab:createGitlabProjectVariableAction",
          name: "Create GitLab Project Variable",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "123",
            key: "MY_VARIABLE",
            value: "my_value",
            variableType: "env_var"
          }
        }
      ]
    })
  },
  {
    description: "Creating a GitLab project variable of type file",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createVariable",
          action: "gitlab:createGitlabProjectVariableAction",
          name: "Create GitLab Project Variable",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "123",
            key: "MY_VARIABLE",
            value: "my-file-content",
            variableType: "file"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project variable that is protected.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createVariable",
          action: "gitlab:createGitlabProjectVariableAction",
          name: "Create GitLab Project Variable",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "456",
            key: "MY_VARIABLE",
            value: "my_value",
            variableType: "env_var",
            variableProtected: true
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project variable with masked flag as true",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createVariable",
          action: "gitlab:createGitlabProjectVariableAction",
          name: "Create GitLab Project Variable",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "789",
            key: "DB_PASSWORD",
            value: "password123",
            variableType: "env_var",
            masked: true
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project variable that is expandable.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createVariable",
          action: "gitlab:projectVariable:create",
          name: "Create GitLab Project Variable",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "123",
            key: "MY_VARIABLE",
            value: "my_value",
            variableType: "env_var",
            raw: true
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project variable with a specific environment scope.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createVariable",
          action: "gitlab:projectVariable:create",
          name: "Create GitLab Project Variable",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "123",
            key: "MY_VARIABLE",
            value: "my_value",
            variableType: "env_var",
            environmentScope: "production"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab project variable with a wildcard environment scope.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createVariable",
          action: "gitlab:projectVariable:create",
          name: "Create GitLab Project Variable",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            projectId: "123",
            key: "MY_VARIABLE",
            value: "my_value",
            variableType: "env_var",
            environmentScope: "*"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gitlabProjectVariableCreate.examples.cjs.js.map
