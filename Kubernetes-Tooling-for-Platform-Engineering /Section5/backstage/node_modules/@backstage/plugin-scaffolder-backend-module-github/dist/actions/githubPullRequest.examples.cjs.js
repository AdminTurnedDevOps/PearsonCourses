'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Create a pull request",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good"
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request with target branch name",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest with target branch name",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            targetBranchName: "test"
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request as draft",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest as draft",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            draft: true
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request with target path",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest with target path",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            targetPath: "targetPath"
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request with source path",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest with source path",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            sourcePath: "source"
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request with token",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            token: "gph_YourGitHubToken"
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request with reviewers",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest with reviewers",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            reviewers: ["foobar"]
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request with team reviewers",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest with team reviewers",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            teamReviewers: ["team-foo"]
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request with commit message",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            commitMessage: "Custom commit message"
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request with a git author name and email",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            gitAuthorName: "Foo Bar",
            gitAuthorEmail: "foo@bar.example"
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request with a git author name",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            // gitAuthorEmail will be 'scaffolder@backstage.io'
            // once one author attribute has been set we need to set both
            gitAuthorName: "Foo Bar"
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request with a git author email",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            // gitAuthorName will be 'Scaffolder'
            // once one author attribute has been set we need to set both
            gitAuthorEmail: "foo@bar.example"
          }
        }
      ]
    })
  },
  {
    description: "Create a pull request with all parameters",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "publish:github:pull-request",
          name: "Create a pull reuqest",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branchName: "new-app",
            title: "Create my new app",
            description: "This PR is really good",
            targetBranchName: "test",
            draft: true,
            targetPath: "targetPath",
            sourcePath: "source",
            token: "gph_YourGitHubToken",
            reviewers: ["foobar"],
            teamReviewers: ["team-foo"],
            commitMessage: "Commit for foo changes",
            gitAuthorName: "Foo Bar",
            gitAuthorEmail: "foo@bar.example"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=githubPullRequest.examples.cjs.js.map
