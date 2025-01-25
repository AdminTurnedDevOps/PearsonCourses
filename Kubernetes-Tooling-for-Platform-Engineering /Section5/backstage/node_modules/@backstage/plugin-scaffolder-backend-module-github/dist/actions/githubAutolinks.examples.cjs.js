'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "GitHub alphanumric autolink reference",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:autolinks:create",
          name: "Create an autolink reference",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            keyPrefix: "TICKET-",
            urlTemplate: "https://example.com/TICKET?query=<num>",
            isAlphanumeric: false
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=githubAutolinks.examples.cjs.js.map
