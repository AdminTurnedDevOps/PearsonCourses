'use strict';

var pluginPermissionCommon = require('@backstage/plugin-permission-common');

const RESOURCE_TYPE_SCAFFOLDER_TEMPLATE = "scaffolder-template";
const RESOURCE_TYPE_SCAFFOLDER_ACTION = "scaffolder-action";
const actionExecutePermission = pluginPermissionCommon.createPermission({
  name: "scaffolder.action.execute",
  attributes: {},
  resourceType: RESOURCE_TYPE_SCAFFOLDER_ACTION
});
const templateParameterReadPermission = pluginPermissionCommon.createPermission({
  name: "scaffolder.template.parameter.read",
  attributes: {
    action: "read"
  },
  resourceType: RESOURCE_TYPE_SCAFFOLDER_TEMPLATE
});
const templateStepReadPermission = pluginPermissionCommon.createPermission({
  name: "scaffolder.template.step.read",
  attributes: {
    action: "read"
  },
  resourceType: RESOURCE_TYPE_SCAFFOLDER_TEMPLATE
});
const taskReadPermission = pluginPermissionCommon.createPermission({
  name: "scaffolder.task.read",
  attributes: {
    action: "read"
  }
});
const taskCreatePermission = pluginPermissionCommon.createPermission({
  name: "scaffolder.task.create",
  attributes: {
    action: "create"
  }
});
const taskCancelPermission = pluginPermissionCommon.createPermission({
  name: "scaffolder.task.cancel",
  attributes: {}
});
const templateManagementPermission = pluginPermissionCommon.createPermission({
  name: "scaffolder.template.management",
  attributes: {}
});
const scaffolderTemplatePermissions = [
  templateParameterReadPermission,
  templateStepReadPermission
];
const scaffolderActionPermissions = [actionExecutePermission];
const scaffolderTaskPermissions = [
  taskCancelPermission,
  taskCreatePermission,
  taskReadPermission
];
const scaffolderPermissions = [
  ...scaffolderTemplatePermissions,
  ...scaffolderActionPermissions,
  ...scaffolderTaskPermissions,
  templateManagementPermission
];

exports.RESOURCE_TYPE_SCAFFOLDER_ACTION = RESOURCE_TYPE_SCAFFOLDER_ACTION;
exports.RESOURCE_TYPE_SCAFFOLDER_TEMPLATE = RESOURCE_TYPE_SCAFFOLDER_TEMPLATE;
exports.actionExecutePermission = actionExecutePermission;
exports.scaffolderActionPermissions = scaffolderActionPermissions;
exports.scaffolderPermissions = scaffolderPermissions;
exports.scaffolderTaskPermissions = scaffolderTaskPermissions;
exports.scaffolderTemplatePermissions = scaffolderTemplatePermissions;
exports.taskCancelPermission = taskCancelPermission;
exports.taskCreatePermission = taskCreatePermission;
exports.taskReadPermission = taskReadPermission;
exports.templateManagementPermission = templateManagementPermission;
exports.templateParameterReadPermission = templateParameterReadPermission;
exports.templateStepReadPermission = templateStepReadPermission;
//# sourceMappingURL=permissions.cjs.js.map
