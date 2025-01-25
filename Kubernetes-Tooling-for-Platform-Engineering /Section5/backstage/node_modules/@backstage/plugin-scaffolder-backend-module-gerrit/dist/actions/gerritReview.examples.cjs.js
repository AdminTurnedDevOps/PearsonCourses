'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Creates a new Gerrit review with minimal options",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit:review",
          name: "Publish new gerrit review",
          input: {
            repoUrl: "gerrithost.org?repo=repo&owner=owner",
            gitCommitMessage: "Initial Commit Message"
          }
        }
      ]
    })
  },
  {
    description: "Creates a new Gerrit review with gitAuthorName",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit:review",
          name: "Publish new gerrit review",
          input: {
            repoUrl: "gerrithost.org?repo=repo&owner=owner",
            gitCommitMessage: "Initial Commit Message",
            gitAuthorName: "Test User"
          }
        }
      ]
    })
  },
  {
    description: "Creates a new Gerrit review with gitAuthorEmail",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit:review",
          name: "Publish new gerrit review",
          input: {
            repoUrl: "gerrithost.org?repo=repo&owner=owner",
            gitCommitMessage: "Initial Commit Message",
            gitAuthorName: "Test User",
            gitAuthorEmail: "test.user@example.com"
          }
        }
      ]
    })
  },
  {
    description: "Creates a new Gerrit review with custom branch",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit:review",
          name: "Publish new gerrit review",
          input: {
            repoUrl: "gerrithost.org?repo=repo&owner=owner",
            gitCommitMessage: "Initial Commit Message",
            branch: "develop"
          }
        }
      ]
    })
  },
  {
    description: "Creates a new Gerrit review with custom sourcePath",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit:review",
          name: "Publish new gerrit review",
          input: {
            repoUrl: "gerrithost.org?repo=repo&owner=owner",
            gitCommitMessage: "Initial Commit Message",
            sourcePath: "./src"
          }
        }
      ]
    })
  },
  {
    description: "Creates a new Gerrit review with all properties",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit:review",
          name: "Publish new gerrit review",
          input: {
            repoUrl: "gerrithost.org?repo=repo&owner=owner",
            gitCommitMessage: "Initial Commit Message",
            gitAuthorName: "Test User",
            gitAuthorEmail: "test.user@example.com",
            branch: "develop",
            sourcePath: "./src"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gerritReview.examples.cjs.js.map
