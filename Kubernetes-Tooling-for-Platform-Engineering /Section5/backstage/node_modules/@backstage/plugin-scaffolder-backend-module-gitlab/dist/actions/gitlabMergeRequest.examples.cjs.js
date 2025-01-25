'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Create a merge request with a specific assignee",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createMergeRequest",
          action: "publish:gitlab:merge-request",
          name: "Create a Merge Request",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            title: "Create my new MR",
            description: "This MR is really good",
            sourcePath: "./path/to/my/changes",
            branchName: "new-mr",
            assignee: "my-assignee"
          }
        }
      ]
    })
  },
  {
    description: "Create a merge request with removal of source branch after merge",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createMergeRequest",
          action: "publish:gitlab:merge-request",
          name: "Create a Merge Request",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            title: "Create my new MR",
            description: "This MR is really good",
            sourcePath: "./path/to/my/changes",
            branchName: "new-mr",
            removeSourceBranch: true
          }
        }
      ]
    })
  },
  {
    description: "Create a merge request with a target branch",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createMergeRequest",
          action: "publish:gitlab:merge-request",
          name: "Create a Merge Request",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            title: "Create my new MR",
            description: "This MR is really good",
            sourcePath: "./path/to/my/changes",
            branchName: "new-mr",
            targetBranchName: "test",
            targetPath: "Subdirectory"
          }
        }
      ]
    })
  },
  {
    description: "Create a merge request with a commit action as create",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createMergeRequest",
          action: "publish:gitlab:merge-request",
          name: "Create a Merge Request",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            title: "Create my new MR",
            branchName: "new-mr",
            description: "MR description",
            commitAction: "create",
            targetPath: "source"
          }
        }
      ]
    })
  },
  {
    description: "Create a merge request with a commit action as delete",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createMergeRequest",
          action: "publish:gitlab:merge-request",
          name: "Create a Merge Request",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            title: "Create my new MR",
            branchName: "new-mr",
            description: "MR description",
            commitAction: "delete",
            targetPath: "source"
          }
        }
      ]
    })
  },
  {
    description: "Create a merge request with a commit action as update",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "createMergeRequest",
          action: "publish:gitlab:merge-request",
          name: "Create a Merge Request",
          input: {
            repoUrl: "gitlab.com?repo=repo&owner=owner",
            title: "Create my new MR",
            branchName: "new-mr",
            description: "MR description",
            commitAction: "update",
            targetPath: "source"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gitlabMergeRequest.examples.cjs.js.map
