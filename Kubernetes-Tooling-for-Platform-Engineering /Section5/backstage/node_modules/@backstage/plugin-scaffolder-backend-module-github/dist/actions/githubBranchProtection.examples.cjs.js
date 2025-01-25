'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: `GitHub Branch Protection for repository's default branch.`,
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:branch-protection:create",
          name: "Setup Branch Protection",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner"
          }
        }
      ]
    })
  },
  {
    description: `GitHub Branch Protection for a specific branch.`,
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:branch-protection:create",
          name: "Setup Branch Protection",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            branch: "my-awesome-branch"
          }
        }
      ]
    })
  },
  {
    description: `GitHub Branch Protection and required commit signing on default branch.`,
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:branch-protection:create",
          name: "Setup Branch Protection",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            requireCodeOwnerReviews: true,
            requiredStatusCheckContexts: ["test"],
            dismissStaleReviews: true,
            requireLastPushApproval: true,
            requiredConversationResolution: true,
            requiredCommitSigning: true
          }
        }
      ]
    })
  },
  {
    description: `GitHub Branch Protection and required linear history on default branch.`,
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:branch-protection:create",
          name: "Setup Branch Protection",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            requireCodeOwnerReviews: true,
            requiredStatusCheckContexts: ["test"],
            dismissStaleReviews: true,
            requireLastPushApproval: true,
            requiredConversationResolution: true,
            requiredCommitSigning: true,
            requiredLinearHistory: true
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=githubBranchProtection.examples.cjs.js.map
