'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Initializes a git repository with the content in the workspace, and publishes it to GitHub with the default configuration.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:github",
          name: "Publish to GitHub",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a GitHub repository with a description.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:github",
          name: "Publish to GitHub",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            description: "Initialize a git repository"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a GitHub repository with public repo visibility, if not set defaults to private",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:github",
          name: "Publish to GitHub",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            repoVisibility: "public"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=github.examples.cjs.js.map
