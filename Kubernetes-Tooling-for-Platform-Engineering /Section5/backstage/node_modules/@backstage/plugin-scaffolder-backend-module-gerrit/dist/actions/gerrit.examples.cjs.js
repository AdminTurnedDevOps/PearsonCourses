'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Initializes a Gerrit repository of contents in workspace and publish it to Gerrit with default configuration.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit",
          name: "Publish to Gerrit",
          input: {
            repoUrl: "gerrit.com?repo=repo&owner=owner"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a Gerrit repository with a description.",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit",
          name: "Publish to Gerrit",
          input: {
            repoUrl: "gerrit.com?repo=repo&owner=owner",
            description: "Initialize a gerrit repository"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a Gerrit repository with a default Branch, if not set defaults to master",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit",
          name: "Publish to Gerrit",
          input: {
            repoUrl: "gerrit.com?repo=repo&owner=owner",
            defaultBranch: "staging"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a Gerrit repository with an initial commit message, if not set defaults to initial commit",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit",
          name: "Publish to Gerrit",
          input: {
            repoUrl: "gerrit.com?repo=repo&owner=owner",
            gitCommitMessage: "Initial Commit Message"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a Gerrit repository with a repo Author Name, if not set defaults to Scaffolder",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit",
          name: "Publish to Gerrit",
          input: {
            repoUrl: "gerrit.com?repo=repo&owner=owner",
            gitAuthorName: "John Doe"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a Gerrit repository with a repo Author Email",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit",
          name: "Publish to Gerrit",
          input: {
            repoUrl: "gerrit.com?repo=repo&owner=owner",
            gitAuthorEmail: "johndoe@email.com"
          }
        }
      ]
    })
  },
  {
    description: "Path within the workspace that will be used as the repository root. If omitted, the entire workspace will be published as the repository",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit",
          name: "Publish to Gerrit",
          input: {
            repoUrl: "gerrit.com?repo=repo&owner=owner",
            sourcePath: "repository/"
          }
        }
      ]
    })
  },
  {
    description: "Initializes a Gerrit repository with all proporties being set",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit",
          name: "Publish to Gerrit",
          input: {
            repoUrl: "gerrit.com?repo=repo&owner=owner",
            description: "Initialize a gerrit repository",
            defaultBranch: "staging",
            gitCommitMessage: "Initial Commit Message",
            gitAuthorName: "John Doe",
            gitAuthorEmail: "johndoe@email.com",
            sourcePath: "repository/"
          }
        }
      ]
    })
  },
  {
    description: "Initialize a Gerrit Repository with Custom Default Branch and Commit Message",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "publish",
          action: "publish:gerrit",
          name: "Publish to Gerrit",
          input: {
            repoUrl: "gerrit.com?repo=repo&owner=owner",
            defaultBranch: "feature-branch",
            gitCommitMessage: "Feature branch initialized"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gerrit.examples.cjs.js.map
