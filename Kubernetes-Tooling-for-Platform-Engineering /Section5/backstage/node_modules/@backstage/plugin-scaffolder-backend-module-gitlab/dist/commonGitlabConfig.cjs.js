'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zod = require('zod');

const commonGitlabConfig = zod.z.object({
  repoUrl: zod.z.string({ description: "Repository Location" }),
  token: zod.z.string({ description: "The token to use for authorization to GitLab" }).optional()
});
const commonGitlabConfigExample = {
  repoUrl: "gitlab.com?owner=namespace-or-owner&repo=project-name",
  token: "${{ secrets.USER_OAUTH_TOKEN }}"
};
var IssueType = /* @__PURE__ */ ((IssueType2) => {
  IssueType2["ISSUE"] = "issue";
  IssueType2["INCIDENT"] = "incident";
  IssueType2["TEST"] = "test_case";
  IssueType2["TASK"] = "task";
  return IssueType2;
})(IssueType || {});
var IssueStateEvent = /* @__PURE__ */ ((IssueStateEvent2) => {
  IssueStateEvent2["CLOSE"] = "close";
  IssueStateEvent2["REOPEN"] = "reopen";
  return IssueStateEvent2;
})(IssueStateEvent || {});

exports.IssueStateEvent = IssueStateEvent;
exports.IssueType = IssueType;
exports.commonGitlabConfigExample = commonGitlabConfigExample;
exports.default = commonGitlabConfig;
//# sourceMappingURL=commonGitlabConfig.cjs.js.map
