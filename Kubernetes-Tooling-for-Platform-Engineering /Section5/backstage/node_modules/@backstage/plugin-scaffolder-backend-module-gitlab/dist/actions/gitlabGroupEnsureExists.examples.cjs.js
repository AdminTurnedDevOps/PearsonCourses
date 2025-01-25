'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Creating a group at the top level",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabGroup",
          name: "Group",
          action: "gitlab:group:ensureExists",
          input: {
            repoUrl: "gitlab.com",
            path: ["group1"]
          }
        }
      ]
    })
  },
  {
    description: "Create a group nested within another group",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabGroup",
          name: "Group",
          action: "gitlab:group:ensureExists",
          input: {
            repoUrl: "gitlab.com",
            path: ["group1", "group2"]
          }
        }
      ]
    })
  },
  {
    description: "Create a group nested within multiple other groups",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabGroup",
          name: "Group",
          action: "gitlab:group:ensureExists",
          input: {
            repoUrl: "gitlab.com",
            path: ["group1", "group2", "group3"]
          }
        }
      ]
    })
  },
  {
    description: "Create a group in dry run mode",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabGroup",
          name: "Group",
          action: "gitlab:group:ensureExists",
          isDryRun: true,
          input: {
            repoUrl: "https://gitlab.com/my-repo",
            path: ["group1", "group2", "group3"]
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gitlabGroupEnsureExists.examples.cjs.js.map
