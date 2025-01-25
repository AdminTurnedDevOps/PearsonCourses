'use strict';

var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var commonGitlabConfig = require('../commonGitlabConfig.cjs.js');
var gitlabIssueCreate_examples = require('./gitlabIssueCreate.examples.cjs.js');
var zod = require('zod');
var util = require('../util.cjs.js');
var helpers = require('./helpers.cjs.js');

const issueInputProperties = zod.z.object({
  projectId: zod.z.number().describe("Project Id"),
  title: zod.z.string({ description: "Title of the issue" }),
  assignees: zod.z.array(zod.z.number(), {
    description: "IDs of the users to assign the issue to."
  }).optional(),
  confidential: zod.z.boolean({ description: "Issue Confidentiality" }).optional(),
  description: zod.z.string().describe("Issue description").max(1048576).optional(),
  createdAt: zod.z.string().describe("Creation date/time").regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/,
    "Invalid date format. Use YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.SSSZ"
  ).optional(),
  dueDate: zod.z.string().describe("Due date/time").regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/,
    "Invalid date format. Use YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.SSSZ"
  ).optional(),
  discussionToResolve: zod.z.string({
    description: 'Id of a discussion to resolve. Use in combination with "merge_request_to_resolve_discussions_of"'
  }).optional(),
  epicId: zod.z.number({ description: "Id of the linked Epic" }).min(0, "Valid values should be equal or greater than zero").optional(),
  labels: zod.z.string({ description: "Labels to apply" }).optional(),
  issueType: zod.z.nativeEnum(commonGitlabConfig.IssueType, {
    description: "Type of the issue"
  }).optional(),
  mergeRequestToResolveDiscussionsOf: zod.z.number({
    description: "IID of a merge request in which to resolve all issues"
  }).optional(),
  milestoneId: zod.z.number({ description: "Global ID of a milestone to assign the issue" }).optional(),
  weight: zod.z.number({ description: "The issue weight" }).min(0).refine((value) => {
    const isValid = value >= 0;
    if (!isValid) {
      return {
        message: "Valid values should be equal or greater than zero"
      };
    }
    return isValid;
  }).optional()
});
const issueOutputProperties = zod.z.object({
  issueUrl: zod.z.string({ description: "Issue Url" }),
  issueId: zod.z.number({ description: "Issue Id" }),
  issueIid: zod.z.number({ description: "Issue Iid" })
});
const createGitlabIssueAction = (options) => {
  const { integrations } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "gitlab:issues:create",
    description: "Creates a Gitlab issue.",
    examples: gitlabIssueCreate_examples.examples,
    schema: {
      input: commonGitlabConfig.default.merge(issueInputProperties),
      output: issueOutputProperties
    },
    async handler(ctx) {
      try {
        const {
          repoUrl,
          projectId,
          title,
          description = "",
          confidential = false,
          assignees = [],
          createdAt = "",
          dueDate,
          discussionToResolve = "",
          epicId,
          labels = "",
          issueType,
          mergeRequestToResolveDiscussionsOf,
          milestoneId,
          weight,
          token
        } = commonGitlabConfig.default.merge(issueInputProperties).parse(ctx.input);
        const { host } = util.parseRepoUrl(repoUrl, integrations);
        const api = util.getClient({ host, integrations, token });
        let isEpicScoped = false;
        if (epicId) {
          isEpicScoped = await util.checkEpicScope(api, projectId, epicId);
          if (isEpicScoped) {
            ctx.logger.info("Epic is within Project Scope");
          } else {
            ctx.logger.warn(
              "Chosen epic is not within the Project Scope. The issue will be created without an associated epic."
            );
          }
        }
        const mappedCreatedAt = util.convertDate(
          String(createdAt),
          (/* @__PURE__ */ new Date()).toISOString()
        );
        const mappedDueDate = dueDate ? util.convertDate(String(dueDate), (/* @__PURE__ */ new Date()).toISOString()) : void 0;
        const issueOptions = {
          description,
          assigneeIds: assignees,
          confidential,
          epicId: isEpicScoped ? epicId : void 0,
          labels,
          createdAt: mappedCreatedAt,
          dueDate: mappedDueDate,
          discussionToResolve,
          issueType,
          mergeRequestToResolveDiscussionsOf,
          milestoneId,
          weight
        };
        const response = await api.Issues.create(
          projectId,
          title,
          issueOptions
        );
        ctx.output("issueId", response.id);
        ctx.output("issueUrl", response.web_url);
        ctx.output("issueIid", response.iid);
      } catch (error) {
        if (error instanceof zod.z.ZodError) {
          throw new errors.InputError(`Validation error: ${error.message}`, {
            validationErrors: error.errors
          });
        }
        throw new errors.InputError(
          `Failed to create GitLab issue: ${helpers.getErrorMessage(error)}`
        );
      }
    }
  });
};

exports.createGitlabIssueAction = createGitlabIssueAction;
//# sourceMappingURL=gitlabIssueCreate.cjs.js.map
