import * as _backstage_plugin_permission_common from '@backstage/plugin-permission-common';

/**
 * Permission resource type which corresponds to a scaffolder templates.
 *
 * @alpha
 */
declare const RESOURCE_TYPE_SCAFFOLDER_TEMPLATE = "scaffolder-template";
/**
 * Permission resource type which corresponds to a scaffolder action.
 *
 * @alpha
 */
declare const RESOURCE_TYPE_SCAFFOLDER_ACTION = "scaffolder-action";
/**
 * This permission is used to authorize actions that involve executing
 * an action from a template.
 *
 * @alpha
 */
declare const actionExecutePermission: _backstage_plugin_permission_common.ResourcePermission<"scaffolder-action">;
/**
 * This permission is used to authorize actions that involve reading
 * one or more parameters from a template.
 *
 * If this permission is not authorized, it will appear that the
 * parameter does not exist in the template — both in the frontend
 * and in API responses.
 *
 * @alpha
 */
declare const templateParameterReadPermission: _backstage_plugin_permission_common.ResourcePermission<"scaffolder-template">;
/**
 * This permission is used to authorize actions that involve reading
 * one or more steps from a template.
 *
 * If this permission is not authorized, it will appear that the
 * step does not exist in the template — both in the frontend
 * and in API responses. Steps will also not be executed.
 *
 * @alpha
 */
declare const templateStepReadPermission: _backstage_plugin_permission_common.ResourcePermission<"scaffolder-template">;
/**
 * This permission is used to authorize actions that involve reading one or more tasks in the scaffolder,
 * and reading logs of tasks
 *
 * @alpha
 */
declare const taskReadPermission: _backstage_plugin_permission_common.BasicPermission;
/**
 * This permission is used to authorize actions that involve the creation of tasks in the scaffolder.
 *
 * @alpha
 */
declare const taskCreatePermission: _backstage_plugin_permission_common.BasicPermission;
/**
 * This permission is used to authorize actions that involve the cancellation of tasks in the scaffolder.
 *
 * @alpha
 */
declare const taskCancelPermission: _backstage_plugin_permission_common.BasicPermission;
/**
 * This permission is used to authorize template management features.
 *
 * @alpha
 */
declare const templateManagementPermission: _backstage_plugin_permission_common.BasicPermission;
/**
 * List of the scaffolder permissions that are associated with template steps and parameters.
 * @alpha
 */
declare const scaffolderTemplatePermissions: _backstage_plugin_permission_common.ResourcePermission<"scaffolder-template">[];
/**
 * List of the scaffolder permissions that are associated with scaffolder actions.
 * @alpha
 */
declare const scaffolderActionPermissions: _backstage_plugin_permission_common.ResourcePermission<"scaffolder-action">[];
/**
 * List of the scaffolder permissions that are associated with scaffolder tasks.
 * @alpha
 */
declare const scaffolderTaskPermissions: _backstage_plugin_permission_common.BasicPermission[];
/**
 * List of all the scaffolder permissions
 * @alpha
 */
declare const scaffolderPermissions: (_backstage_plugin_permission_common.BasicPermission | _backstage_plugin_permission_common.ResourcePermission<"scaffolder-action"> | _backstage_plugin_permission_common.ResourcePermission<"scaffolder-template">)[];

export { RESOURCE_TYPE_SCAFFOLDER_ACTION, RESOURCE_TYPE_SCAFFOLDER_TEMPLATE, actionExecutePermission, scaffolderActionPermissions, scaffolderPermissions, scaffolderTaskPermissions, scaffolderTemplatePermissions, taskCancelPermission, taskCreatePermission, taskReadPermission, templateManagementPermission, templateParameterReadPermission, templateStepReadPermission };
