import { createPermission } from '@backstage/plugin-permission-common';

const RESOURCE_TYPE_SCAFFOLDER_TEMPLATE = "scaffolder-template";
const RESOURCE_TYPE_SCAFFOLDER_ACTION = "scaffolder-action";
const actionExecutePermission = createPermission({
  name: "scaffolder.action.execute",
  attributes: {},
  resourceType: RESOURCE_TYPE_SCAFFOLDER_ACTION
});
const templateParameterReadPermission = createPermission({
  name: "scaffolder.template.parameter.read",
  attributes: {
    action: "read"
  },
  resourceType: RESOURCE_TYPE_SCAFFOLDER_TEMPLATE
});
const templateStepReadPermission = createPermission({
  name: "scaffolder.template.step.read",
  attributes: {
    action: "read"
  },
  resourceType: RESOURCE_TYPE_SCAFFOLDER_TEMPLATE
});
const taskReadPermission = createPermission({
  name: "scaffolder.task.read",
  attributes: {
    action: "read"
  }
});
const taskCreatePermission = createPermission({
  name: "scaffolder.task.create",
  attributes: {
    action: "create"
  }
});
const taskCancelPermission = createPermission({
  name: "scaffolder.task.cancel",
  attributes: {}
});
const templateManagementPermission = createPermission({
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

export { RESOURCE_TYPE_SCAFFOLDER_ACTION, RESOURCE_TYPE_SCAFFOLDER_TEMPLATE, actionExecutePermission, scaffolderActionPermissions, scaffolderPermissions, scaffolderTaskPermissions, scaffolderTemplatePermissions, taskCancelPermission, taskCreatePermission, taskReadPermission, templateManagementPermission, templateParameterReadPermission, templateStepReadPermission };
//# sourceMappingURL=permissions.esm.js.map
