import * as _backstage_plugin_permission_common from '@backstage/plugin-permission-common';
import { ResourcePermission } from '@backstage/plugin-permission-common';

/**
 * Permission resource type which corresponds to catalog entities.
 *
 * {@link https://backstage.io/docs/features/software-catalog/}
 * @alpha
 */
declare const RESOURCE_TYPE_CATALOG_ENTITY = "catalog-entity";
/**
 * Convenience type for catalog entity
 * {@link @backstage/plugin-permission-common#ResourcePermission}s.
 * @alpha
 */
type CatalogEntityPermission = ResourcePermission<typeof RESOURCE_TYPE_CATALOG_ENTITY>;
/**
 * This permission is used to authorize actions that involve reading one or more
 * entities from the catalog.
 *
 * If this permission is not authorized, it will appear that the entity does not
 * exist in the catalog — both in the frontend and in API responses.
 * @alpha
 */
declare const catalogEntityReadPermission: ResourcePermission<"catalog-entity">;
/**
 * This permission is used to authorize actions that involve creating a new
 * catalog entity. This includes registering an existing component into the
 * catalog.
 * @alpha
 */
declare const catalogEntityCreatePermission: _backstage_plugin_permission_common.BasicPermission;
/**
 * This permission is used to designate actions that involve removing one or
 * more entities from the catalog.
 * @alpha
 */
declare const catalogEntityDeletePermission: ResourcePermission<"catalog-entity">;
/**
 * This permission is used to designate refreshing one or more entities from the
 * catalog.
 * @alpha
 */
declare const catalogEntityRefreshPermission: ResourcePermission<"catalog-entity">;
/**
 * This permission is used to authorize validating catalog entities.
 * @alpha
 */
declare const catalogEntityValidatePermission: _backstage_plugin_permission_common.BasicPermission;
/**
 * This permission is used to designate actions that involve reading one or more
 * locations from the catalog.
 *
 * If this permission is not authorized, it will appear that the location does
 * not exist in the catalog — both in the frontend and in API responses.
 * @alpha
 */
declare const catalogLocationReadPermission: _backstage_plugin_permission_common.BasicPermission;
/**
 * This permission is used to designate actions that involve creating catalog
 * locations.
 * @alpha
 */
declare const catalogLocationCreatePermission: _backstage_plugin_permission_common.BasicPermission;
/**
 * This permission is used to authorize analyzing catalog locations.
 * @alpha
 */
declare const catalogLocationAnalyzePermission: _backstage_plugin_permission_common.BasicPermission;
/**
 * This permission is used to designate actions that involve deleting locations
 * from the catalog.
 * @alpha
 */
declare const catalogLocationDeletePermission: _backstage_plugin_permission_common.BasicPermission;
/**
 * List of all catalog permissions.
 * @alpha
 */
declare const catalogPermissions: (_backstage_plugin_permission_common.BasicPermission | ResourcePermission<"catalog-entity">)[];

export { type CatalogEntityPermission, RESOURCE_TYPE_CATALOG_ENTITY, catalogEntityCreatePermission, catalogEntityDeletePermission, catalogEntityReadPermission, catalogEntityRefreshPermission, catalogEntityValidatePermission, catalogLocationAnalyzePermission, catalogLocationCreatePermission, catalogLocationDeletePermission, catalogLocationReadPermission, catalogPermissions };
