'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "GitHub Action Workflow Without Inputs.",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:actions:dispatch",
          name: "Dispatch Github Action Workflow",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            workflowId: "WORKFLOW_ID",
            branchOrTagName: "main"
          }
        }
      ]
    })
  },
  {
    description: "GitHub Action Workflow With Inputs",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:actions:dispatch",
          name: "Dispatch Github Action Workflow with inputs",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            workflowId: "WORKFLOW_ID",
            branchOrTagName: "main",
            workflowInputs: {
              input1: "value1",
              input2: "value2"
            }
          }
        }
      ]
    })
  },
  {
    description: "GitHub Action Workflow With Custom Token",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:actions:dispatch",
          name: "Dispatch GitHub Action Workflow (custom token)",
          input: {
            repoUrl: "github.com?repo=reponame&owner=owner",
            workflowId: "WORKFLOW_ID",
            branchOrTagName: "release-1.0",
            token: "${{ secrets.MY_CUSTOM_TOKEN }}"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=githubActionsDispatch.examples.cjs.js.map
