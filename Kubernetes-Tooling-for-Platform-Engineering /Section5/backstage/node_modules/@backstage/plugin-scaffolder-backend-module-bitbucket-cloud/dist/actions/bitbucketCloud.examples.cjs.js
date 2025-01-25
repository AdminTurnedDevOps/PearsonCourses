'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Initializes a git repository with the content in the workspace, and publishes it to Bitbucket Cloud with the default configuration.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:bitbucketCloud",
          name: "Publish to Bitbucket Cloud",
          input: {
            repoUrl: "bitbucket.org?repo=repo&workspace=workspace&project=project"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a Bitbucket Cloud repository with a description.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:bitbucketCloud",
          name: "Publish to Bitbucket Cloud",
          input: {
            repoUrl: "bitbucket.org?repo=repo&workspace=workspace&project=project",
            description: "Initialize a git repository"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a Bitbucket Cloud repository with public repo visibility, if not set defaults to private",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:bitbucketCloud",
          name: "Publish to Bitbucket Cloud",
          input: {
            repoUrl: "bitbucket.org?repo=repo&workspace=workspace&project=project",
            repoVisibility: "public"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a Bitbucket Cloud repository with a default Branch, if not set defaults to master",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:bitbucketCloud",
          name: "Publish to Bitbucket Cloud",
          input: {
            repoUrl: "bitbucket.org?repo=repo&workspace=workspace&project=project",
            defaultBranch: "main"
          }
        }
      ]
    })
  },
  {
    description: "Path within the workspace that will be used as the repository root. If omitted, the entire workspace will be published as the repository",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:bitbucketCloud",
          name: "Publish to Bitbucket Cloud",
          input: {
            repoUrl: "bitbucket.org?repo=repo&workspace=workspace&project=project",
            sourcePath: "./repoRoot"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a Bitbucket Cloud repository with a custom authentication token",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:bitbucketCloud",
          name: "Publish to Bitbucket Cloud",
          input: {
            repoUrl: "bitbucket.org?repo=repo&workspace=workspace&project=project",
            token: "your-custom-auth-token"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a Bitbucket Cloud repository with all proporties being set",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:bitbucketCloud",
          name: "Publish to Bitbucket Cloud",
          input: {
            repoUrl: "bitbucket.org?repo=repo&workspace=workspace&project=project",
            description: "Initialize a git repository",
            repoVisibility: "public",
            defaultBranch: "main",
            token: "your-custom-auth-token"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=bitbucketCloud.examples.cjs.js.map
