'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Create a GitHub webhook for a repository",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:webhook",
          name: "Create GitHub Webhook",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            webhookUrl: "https://example.com/my-webhook",
            webhookSecret: "mysecret",
            events: ["push"],
            active: true,
            contentType: "json",
            insecureSsl: false,
            token: "my-github-token"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub webhook with minimal configuration",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:webhook",
          name: "Create GitHub Webhook",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            webhookUrl: "https://example.com/my-webhook"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub webhook with custom events",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:webhook",
          name: "Create GitHub Webhook",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            webhookUrl: "https://example.com/my-webhook",
            events: ["push", "pull_request"]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub webhook with JSON content type",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:webhook",
          name: "Create GitHub Webhook",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            webhookUrl: "https://example.com/my-webhook",
            contentType: "json"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub webhook with insecure SSL",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:webhook",
          name: "Create GitHub Webhook",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            webhookUrl: "https://example.com/my-webhook",
            insecureSsl: true
          }
        }
      ]
    })
  },
  {
    description: "Create an inactive GitHub webhook",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:webhook",
          name: "Create GitHub Webhook",
          input: {
            repoUrl: "github.com?repo=repo&owner=owner",
            webhookUrl: "https://example.com/my-webhook",
            active: false
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=githubWebhook.examples.cjs.js.map
