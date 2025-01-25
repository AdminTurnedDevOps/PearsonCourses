'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Example 1: Create and store a Deploy Key",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:deployKey:create",
          name: "Create and store a Deploy Key",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            publicKey: "pubkey",
            privateKey: "privkey",
            deployKeyName: "Push Tags"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=githubDeployKey.examples.cjs.js.map
