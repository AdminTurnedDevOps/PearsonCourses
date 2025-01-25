'use strict';

var errors = require('@backstage/errors');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var commonGitlabConfig = require('../commonGitlabConfig.cjs.js');
var gitlabIssueEdit_examples = require('./gitlabIssueEdit.examples.cjs.js');
var zod = require('zod');
var util = require('../util.cjs.js');
var helpers = require('./helpers.cjs.js');

const editIssueInputProperties = zod.z.object({
  projectId: zod.z.number().describe(
    "The global ID or URL-encoded path of the project owned by the authenticated user."
  ),
  issueIid: zod.z.number().describe("The internal ID of a project's issue"),
  addLabels: zod.z.string({
    description: "Comma-separated label names to add to an issue. If a label does not already exist, this creates a new project label and assigns it to the issue."
  }).optional(),
  assignees: zod.z.array(zod.z.number(), {
    description: "IDs of the users to assign the issue to."
  }).optional(),
  confidential: zod.z.boolean({ description: "Updates an issue to be confidential." }).optional(),
  description: zod.z.string().describe("The description of an issue. Limited to 1,048,576 characters.").max(1048576).optional(),
  discussionLocked: zod.z.boolean({
    description: "Flag indicating if the issue\u2019s discussion is locked. If the discussion is locked only project members can add or edit comments."
  }).optional(),
  dueDate: zod.z.string().describe(
    "The due date. Date time string in the format YYYY-MM-DD, for example 2016-03-11."
  ).regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD").optional(),
  epicId: zod.z.number({
    description: "ID of the epic to add the issue to. Valid values are greater than or equal to 0."
  }).min(0, "Valid values should be equal or greater than zero").optional(),
  issueType: zod.z.nativeEnum(commonGitlabConfig.IssueType, {
    description: "Updates the type of issue. One of issue, incident, test_case or task."
  }).optional(),
  labels: zod.z.string({
    description: "Comma-separated label names for an issue. Set to an empty string to unassign all labels. If a label does not already exist, this creates a new project label and assigns it to the issue."
  }).optional(),
  milestoneId: zod.z.number({
    description: "The global ID of a milestone to assign the issue to. Set to 0 or provide an empty value to unassign a milestone"
  }).optional(),
  removeLabels: zod.z.string({
    description: "Comma-separated label names to remove from an issue."
  }).optional(),
  stateEvent: zod.z.nativeEnum(commonGitlabConfig.IssueStateEvent, {
    description: "The state event of an issue. To close the issue, use close, and to reopen it, use reopen."
  }).optional(),
  title: zod.z.string().describe("The title of an issue.").optional(),
  updatedAt: zod.z.string().describe(
    "When the issue was updated. Date time string, ISO 8601 formatted"
  ).regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/,
    "Invalid date format. Use YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.SSSZ"
  ).optional(),
  weight: zod.z.number({ description: "The issue weight" }).min(0, "Valid values should be equal or greater than zero").max(10, "Valid values should be equal or less than 10").optional()
});
const editIssueOutputProperties = zod.z.object({
  issueUrl: zod.z.string({ description: "Issue WebUrl" }),
  projectId: zod.z.number({
    description: "The project id the issue belongs to WebUrl"
  }),
  issueId: zod.z.number({ description: "The issues Id" }),
  issueIid: zod.z.number({
    description: "The issues internal ID of a project's issue"
  }),
  state: zod.z.string({ description: "The state event of an issue" }),
  title: zod.z.string({ description: "The title of an issue." }),
  updatedAt: zod.z.string({ description: "The last updated time of the issue." })
});
const editGitlabIssueAction = (options) => {
  const { integrations } = options;
  return pluginScaffolderNode.createTemplateAction({
    id: "gitlab:issue:edit",
    description: "Edit a Gitlab issue.",
    examples: gitlabIssueEdit_examples.examples,
    schema: {
      input: commonGitlabConfig.default.merge(editIssueInputProperties),
      output: editIssueOutputProperties
    },
    async handler(ctx) {
      try {
        const {
          repoUrl,
          projectId,
          title,
          addLabels,
          removeLabels,
          issueIid,
          description,
          confidential = false,
          assignees = [],
          updatedAt = "",
          dueDate,
          discussionLocked = false,
          epicId,
          labels,
          issueType,
          milestoneId,
          stateEvent,
          weight,
          token
        } = commonGitlabConfig.default.merge(editIssueInputProperties).parse(ctx.input);
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
        const mappedUpdatedAt = util.convertDate(
          String(updatedAt),
          (/* @__PURE__ */ new Date()).toISOString()
        );
        const editIssueOptions = {
          addLabels,
          assigneeIds: assignees,
          confidential,
          description,
          discussionLocked,
          dueDate,
          epicId: isEpicScoped ? epicId : void 0,
          issueType,
          labels,
          milestoneId,
          removeLabels,
          stateEvent,
          title,
          updatedAt: mappedUpdatedAt,
          weight
        };
        const response = await api.Issues.edit(
          projectId,
          issueIid,
          editIssueOptions
        );
        ctx.output("issueId", response.id);
        ctx.output("projectId", response.project_id);
        ctx.output("issueUrl", response.web_url);
        ctx.output("issueIid", response.iid);
        ctx.output("title", response.title);
        ctx.output("state", response.state);
        ctx.output("updatedAt", response.updated_at);
      } catch (error) {
        if (error instanceof zod.z.ZodError) {
          throw new errors.InputError(`Validation error: ${error.message}`, {
            validationErrors: error.errors
          });
        }
        throw new errors.InputError(
          `Failed to edit/modify GitLab issue: ${helpers.getErrorMessage(error)}`
        );
      }
    }
  });
};

exports.editGitlabIssueAction = editGitlabIssueAction;
//# sourceMappingURL=gitlabIssueEdit.cjs.js.map
