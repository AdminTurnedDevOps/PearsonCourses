'use strict';

var yaml = require('yaml');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Create a GitHub Environment (No Policies, No Variables, No Secrets)",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Protected Branch Policy",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            deploymentBranchPolicy: {
              protected_branches: true,
              custom_branch_policies: false
            }
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Custom Branch Policies",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            deploymentBranchPolicy: {
              protected_branches: false,
              custom_branch_policies: true
            },
            customBranchPolicyNames: ["main", "*.*.*"]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Environment Variables and Secrets",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            environmentVariables: {
              key1: "val1",
              key2: "val2"
            },
            secrets: {
              secret1: "supersecret1",
              secret2: "supersecret2"
            }
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Custom Tag Policies",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            customTagPolicyNames: ["release/*/*", "v*.*.*"]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Both Branch and Tag Policies",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            deploymentBranchPolicy: {
              protected_branches: false,
              custom_branch_policies: true
            },
            customBranchPolicyNames: ["feature/*", "hotfix/*"],
            customTagPolicyNames: ["release/*", "v*"]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Full Configuration",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            deploymentBranchPolicy: {
              protected_branches: false,
              custom_branch_policies: true
            },
            customBranchPolicyNames: ["dev/*", "test/*"],
            customTagPolicyNames: ["v1.*", "v2.*"],
            environmentVariables: {
              API_KEY: "123456789",
              NODE_ENV: "production"
            },
            secrets: {
              DATABASE_URL: "supersecretdatabaseurl",
              API_SECRET: "supersecretapisecret"
            },
            token: "ghp_abcdef1234567890"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Only Token Authentication",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            token: "ghp_abcdef1234567890"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with No Deployment Policies",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            deploymentBranchPolicy: null
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Custom Branch and Tag Policies",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            deploymentBranchPolicy: {
              protected_branches: false,
              custom_branch_policies: true
            },
            customBranchPolicyNames: ["release/*", "hotfix/*"],
            customTagPolicyNames: ["v*", "release-*"]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Environment Variables Only",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            environmentVariables: {
              VAR1: "value1",
              VAR2: "value2"
            }
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Deployment Secrets Only",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            secrets: {
              SECRET1: "secretvalue1",
              SECRET2: "secretvalue2"
            }
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Deployment Branch Policy and Token",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            deploymentBranchPolicy: {
              protected_branches: true,
              custom_branch_policies: false
            },
            token: "ghp_abcdef1234567890"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Environment Variables, Secrets, and Token",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            environmentVariables: {
              VAR1: "value1",
              VAR2: "value2"
            },
            secrets: {
              SECRET1: "secretvalue1",
              SECRET2: "secretvalue2"
            },
            token: "ghp_abcdef1234567890"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Wait Timer",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            waitTimer: 1e3
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Prevent Self Review",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            preventSelfReview: true
          }
        }
      ]
    })
  },
  {
    description: "Create a GitHub Environment with Reviewers",
    example: yaml__default.default.stringify({
      steps: [
        {
          action: "github:environment:create",
          name: "Create Environment",
          input: {
            repoUrl: "github.com?repo=repository&owner=owner",
            name: "envname",
            reviewers: ["group:default/team-a", "user:default/johndoe"]
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gitHubEnvironment.examples.cjs.js.map
