'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Add labels to pull request or issue",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:issues:label",
          name: "Add labels to pull request or issue",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            number: "1",
            labels: ["bug"]
          }
        }
      ]
    })
  },
  {
    description: "Add labels to pull request or issue with specific token",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:issues:label",
          name: "Add labels to pull request or issue with token",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            number: "1",
            labels: ["bug", "documentation"],
            token: "gph_YourGitHubToken"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=githubIssuesLabel.examples.cjs.js.map
