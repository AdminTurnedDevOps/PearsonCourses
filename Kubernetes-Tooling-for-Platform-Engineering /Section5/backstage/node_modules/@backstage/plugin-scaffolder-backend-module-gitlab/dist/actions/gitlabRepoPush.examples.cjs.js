'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Push changes to gitlab repository with minimal changes",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "pushChanges",
          action: "gitlab:repo:push",
          name: "Push changes to gitlab repository",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            commitMessage: "Initial Commit",
            branchName: "feature-branch"
          }
        }
      ]
    })
  },
  {
    description: "Push changes to gitlab repository with a specific source and target path",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "pushChanges",
          action: "gitlab:repo:push",
          name: "Push changes to gitlab repository",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            commitMessage: "Initial Commit",
            branchName: "feature-branch",
            sourcePath: "src",
            targetPath: "dest"
          }
        }
      ]
    })
  },
  {
    description: "Push changes to gitlab repository with a specific commit action",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "pushChanges",
          action: "gitlab:repo:push",
          name: "Push changes to gitlab repository",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            commitMessage: "Initial Commit",
            branchName: "feature-branch",
            commitAction: "update"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gitlabRepoPush.examples.cjs.js.map
