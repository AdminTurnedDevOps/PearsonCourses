'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Creating pull request on bitbucket server with required fields",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:bitbucketServer:pull-request",
          id: "publish-bitbucket-server-pull-request-minimal",
          name: "Creating pull request on bitbucket server",
          input: {
            repoUrl: "hosted.bitbucket.com?project=project&repo=repo",
            title: "My pull request",
            sourceBranch: "my-feature-branch"
          }
        }
      ]
    })
  },
  {
    description: "Creating pull request on bitbucket server with custom descriptions",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:bitbucketServer:pull-request",
          id: "publish-bitbucket-server-pull-request-minimal",
          name: "Creating pull request on bitbucket server",
          input: {
            repoUrl: "hosted.bitbucket.com?project=project&repo=repo",
            title: "My pull request",
            sourceBranch: "my-feature-branch",
            description: "This is a detailed description of my pull request"
          }
        }
      ]
    })
  },
  {
    description: "Creating pull request on bitbucket server with different target branch",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:bitbucketServer:pull-request",
          id: "publish-bitbucket-server-pull-request-target-branch",
          name: "Creating pull request on bitbucket server",
          input: {
            repoUrl: "hosted.bitbucket.com?project=project&repo=repo",
            title: "My pull request",
            sourceBranch: "my-feature-branch",
            targetBranch: "development"
          }
        }
      ]
    })
  },
  {
    description: "Creating pull request on bitbucket server with authorization token",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:bitbucketServer:pull-request",
          id: "publish-bitbucket-server-pull-request-minimal",
          name: "Creating pull request on bitbucket server",
          input: {
            repoUrl: "no-credentials.bitbucket.com?project=project&repo=repo",
            title: "My pull request",
            sourceBranch: "my-feature-branch",
            token: "my-auth-token"
          }
        }
      ]
    })
  },
  {
    description: "Creating pull request on bitbucket server with all fields",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:bitbucketServer:pull-request",
          id: "publish-bitbucket-server-pull-request-minimal",
          name: "Creating pull request on bitbucket server",
          input: {
            repoUrl: "no-credentials.bitbucket.com?project=project&repo=repo",
            title: "My pull request",
            sourceBranch: "my-feature-branch",
            targetBranch: "development",
            description: "This is a detailed description of my pull request",
            reviewers: ["reviewer1", "reviewer2"],
            token: "my-auth-token",
            gitAuthorName: "test-user",
            gitAuthorEmail: "test-user@sample.com"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=bitbucketServerPullRequest.examples.cjs.js.map
