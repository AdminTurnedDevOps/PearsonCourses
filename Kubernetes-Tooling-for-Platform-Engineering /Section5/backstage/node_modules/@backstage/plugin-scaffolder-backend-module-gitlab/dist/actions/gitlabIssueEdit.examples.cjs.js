'use strict';

var yaml = require('yaml');
var commonGitlabConfig = require('../commonGitlabConfig.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var yaml__default = /*#__PURE__*/_interopDefaultCompat(yaml);

const examples = [
  {
    description: "Edit a GitLab issue with minimal options",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Modified Test Issue",
            description: "This is a modified description of the issue"
          }
        }
      ]
    })
  },
  {
    description: "Edit a GitLab issue with assignees and date options",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Test Issue",
            assignees: [18],
            description: "This is the edited description of the issue",
            updatedAt: "2024-05-10T18:00:00.000Z",
            dueDate: "2024-09-28"
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
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Test Edit Issue",
            assignees: [18, 15],
            description: "This is the description of the issue",
            confidential: false,
            updatedAt: "2024-05-10T18:00:00.000Z",
            dueDate: "2024-09-28",
            discussionLocked: true,
            epicId: 1,
            labels: "phase1:label1,phase2:label2"
          }
        }
      ]
    })
  },
  {
    description: "Edit a gitlab issue to change  its state to close",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            stateEvent: "close"
          }
        }
      ]
    })
  },
  {
    description: "Edit a gitlab issue to change  its state to reopened",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            stateEvent: "reopen"
          }
        }
      ]
    })
  },
  {
    description: "Edit a gitlab issue to assign it to multiple users and set milestone",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Test issue with milestone",
            assignees: [18, 20],
            description: "This issue has milestone set",
            milestoneId: 5
          }
        }
      ]
    })
  },
  {
    description: "Edit a gitlab issue to add weight and update labels",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Issue with weight and labels",
            description: "This issue has weight and new labels",
            weight: 3,
            labels: "bug,urgent"
          }
        }
      ]
    })
  },
  {
    description: "Edit a gitlab issue to make it confidential",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Confidential Issue",
            description: "This issue is confidential",
            confidential: true
          }
        }
      ]
    })
  },
  {
    description: "Edit a gitlab issue to lock the discussion",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Locked Discussion Issue",
            description: "This discussion on this issue is locked",
            discussionLocked: true
          }
        }
      ]
    })
  },
  {
    description: "Edit a gitlab issue to remove labels and update milestone",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Issue with labels removed and milestone updated",
            description: "This issue has labels removed and milestone updated",
            removeLabels: "phase1:label1",
            milestoneId: 6
          }
        }
      ]
    })
  },
  {
    description: "Edit a gitlab issue to remove some labels and new ones",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Issue with labels updated",
            description: "This issue has labels removed and new ones added",
            removeLabels: "bug,urgent",
            labels: "enhancement:documentation"
          }
        }
      ]
    })
  },
  {
    description: "Edit a gitlab issue to change issue type and add labels",
    example: yaml__default.default.stringify({
      steps: [
        {
          id: "gitlabIssue",
          name: "EditIssues",
          action: "gitlab:issue:edit",
          input: {
            ...commonGitlabConfig.commonGitlabConfigExample,
            projectId: 12,
            title: "Issue with type and labels",
            description: "This issue has been changes and new labels added",
            labels: "task,high-priority",
            issueType: "task"
          }
        }
      ]
    })
  }
];

exports.examples = examples;
//# sourceMappingURL=gitlabIssueEdit.examples.cjs.js.map
