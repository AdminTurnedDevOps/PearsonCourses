'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Initializes a git repository with the content in the workspace, and publishes it to Azure DevOps with the default configuration.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:azure",
          name: "Publish to Azure",
          input: {
            repoUrl: "dev.azure.com?organization=organization&project=project&repo=repo"
          }
        }
      ]
    })
  },
  {
    description: "Initializes an Azure DevOps repository with a description.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:azure",
          name: "Publish to Azure",
          input: {
            repoUrl: "dev.azure.com?organization=organization&project=project&repo=repo",
            description: "Initialize a git repository"
          }
        }
      ]
    })
  },
  {
    description: "Initializes an Azure DevOps repository with a default branch, if not set defaults to master",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:azure",
          name: "Publish to Azure",
          input: {
            repoUrl: "dev.azure.com?organization=organization&project=project&repo=repo",
            defaultBranch: "main"
          }
        }
      ]
    })
  },
  {
    description: "Initializes an Azure DevOps repository with a custom commit message",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:azure",
          name: "Publish to Azure",
          input: {
            repoUrl: "dev.azure.com?organization=organization&project=project&repo=repo",
            gitCommitMessage: "Initial setup and configuration"
          }
        }
      ]
    })
  },
  {
    description: "Initializes an Azure DevOps repository with a custom author name and email",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:azure",
          name: "Publish to Azure",
          input: {
            repoUrl: "dev.azure.com?organization=organization&project=project&repo=repo",
            gitAuthorName: "John Doe",
            gitAuthorEmail: "john.doe@example.com"
          }
        }
      ]
    })
  },
  {
    description: "Initializes an Azure DevOps repository using a specific source path",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:azure",
          name: "Publish to Azure",
          input: {
            repoUrl: "dev.azure.com?organization=organization&project=project&repo=repo",
            sourcePath: "path/to/source"
          }
        }
      ]
    })
  },
  {
    description: "Initializes an Azure DevOps repository using an authentication token",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:azure",
          name: "Publish to Azure",
          input: {
            repoUrl: "dev.azure.com?organization=organization&project=project&repo=repo",
            token: "personal-access-token"
          }
        }
      ]
    })
  },
  {
    description: "Initializes an Azure DevOps repository using an custom repo url",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:azure",
          name: "Publish to Azure",
          input: {
            repoUrl: "test.azure.com?organization=organization&project=project&repo=repo"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=azure.examples.cjs.js.map
