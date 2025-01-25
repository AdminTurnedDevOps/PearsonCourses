'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Setup repo with no modifications to branch protection rules",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:repo:push",
          name: "Create test repo with testuser as owner.",
          input: {
            repoUrl: "github.com?repo=test&owner=testuser"
          }
        }
      ]
    })
  },
  {
    description: "Setup repo with required codeowners check",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:repo:push",
          name: "Require codeowner branch protection rule",
          input: {
            repoUrl: "github.com?repo=reponame&owner=owner",
            requireCodeOwnerReviews: true
          }
        }
      ]
    })
  },
  {
    description: "Change the default required number of approvals",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:repo:push",
          name: "Require two approvals before merging",
          input: {
            repoUrl: "github.com?repo=reponame&owner=owner",
            requiredApprovingReviewCount: 2
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=githubRepoPush.examples.cjs.js.map
