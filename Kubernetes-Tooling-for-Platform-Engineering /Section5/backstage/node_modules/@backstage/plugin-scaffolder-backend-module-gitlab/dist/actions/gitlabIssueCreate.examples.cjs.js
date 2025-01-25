'use strict';

var yaml = require('yaml');
var commonGitlabConfig = require('../commonGitlabConfig.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Create a GitLab issue with minimal options",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "Issues",
          action: "gitlab:issues:create",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Test Issue",
            description: "This is the description of the issue"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab issue with assignees and date options",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "Issues",
          action: "gitlab:issues:create",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Test Issue",
            assignees: [18],
            description: "This is the description of the issue",
            createdAt: "2022-09-27T18:00:00.000Z",
            dueDate: "2022-09-28T12:00:00.000Z"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab Issue with several options",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "Issues",
          action: "gitlab:issues:create",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Test Issue",
            assignees: [18, 15],
            description: "This is the description of the issue",
            confidential: false,
            createdAt: "2022-09-27T18:00:00.000Z",
            dueDate: "2022-09-28T12:00:00.000Z",
            discussionToResolve: "1",
            epicId: 1,
            labels: "phase1:label1,phase2:label2"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab issue with token",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "Issues",
          action: "gitlab:issues:create",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Test Issue",
            description: "This is the description of the issue",
            token: "sample token"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab issue with a specific milestone and weight",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "Issues",
          action: "gitlab:issues:create",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Test Issue with Milestone",
            description: "This is the description of the issue",
            milestoneId: 5,
            weight: 3
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab issue of type INCIDENT",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "Issues",
          action: "gitlab:issues:create",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Confidential Test Issue",
            description: "This is the description of the issue",
            issueType: "incident"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab issue of type TEST",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "Issues",
          action: "gitlab:issues:create",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Confidential Test Issue",
            description: "This is the description of the issue",
            issueType: "test_case"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab issue of type TASK with assignees",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "Issues",
          action: "gitlab:issues:create",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Confidential Test Issue",
            description: "This is the description of the issue",
            issueType: "task",
            assignees: [18, 22]
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab issue of type ISSUE and close it",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "Issues",
          action: "gitlab:issues:create",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Confidential Test Issue",
            description: "This is the description of the issue",
            issueType: "issue",
            stateEvent: "close"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab issue of type INCIDENT and reopen it",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "Issues",
          action: "gitlab:issues:create",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Confidential Test Issue",
            description: "This is the description of the issue",
            issueType: "incident",
            stateEvent: "reopen"
          }
        }
      ]
    })
  },
  {
    description: "Create a GitLab issue to resolve a discussion in a merge request",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "Issues",
          action: "gitlab:issues:create",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Test Issue for MR Discussion",
            description: "This is the description of the issue",
            mergeRequestToResolveDiscussionsOf: 42,
            discussionToResolve: "abc123"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gitlabIssueCreate.examples.cjs.js.map
