'use strict';

var pluginPermissionCommon = require('@backstage/plugin-permission-common');

const RESOURCE_TYPE_CATALOG_ENTITY = "catalog-entity";
const catalogEntityReadPermission = pluginPermissionCommon.createPermission({
  name: "catalog.entity.read",
  attributes: {
    action: "read"
  },
  resourceType: RESOURCE_TYPE_CATALOG_ENTITY
});
const catalogEntityCreatePermission = pluginPermissionCommon.createPermission({
  name: "catalog.entity.create",
  attributes: {
    action: "create"
  }
});
const catalogEntityDeletePermission = pluginPermissionCommon.createPermission({
  name: "catalog.entity.delete",
  attributes: {
    action: "delete"
  },
  resourceType: RESOURCE_TYPE_CATALOG_ENTITY
});
const catalogEntityRefreshPermission = pluginPermissionCommon.createPermission({
  name: "catalog.entity.refresh",
  attributes: {
    action: "update"
  },
  resourceType: RESOURCE_TYPE_CATALOG_ENTITY
});
const catalogEntityValidatePermission = pluginPermissionCommon.createPermission({
  name: "catalog.entity.validate",
  attributes: {}
});
const catalogLocationReadPermission = pluginPermissionCommon.createPermission({
  name: "catalog.location.read",
  attributes: {
    action: "read"
  }
});
const catalogLocationCreatePermission = pluginPermissionCommon.createPermission({
  name: "catalog.location.create",
  attributes: {
    action: "create"
  }
});
const catalogLocationAnalyzePermission = pluginPermissionCommon.createPermission({
  name: "catalog.location.analyze",
  attributes: {}
});
const catalogLocationDeletePermission = pluginPermissionCommon.createPermission({
  name: "catalog.location.delete",
  attributes: {
    action: "delete"
  }
});
const catalogPermissions = [
  catalogEntityReadPermission,
  catalogEntityCreatePermission,
  catalogEntityDeletePermission,
  catalogEntityRefreshPermission,
  catalogEntityValidatePermission,
  catalogLocationReadPermission,
  catalogLocationCreatePermission,
  catalogLocationDeletePermission,
  catalogLocationAnalyzePermission
];

exports.RESOURCE_TYPE_CATALOG_ENTITY = RESOURCE_TYPE_CATALOG_ENTITY;
exports.catalogEntityCreatePermission = catalogEntityCreatePermission;
exports.catalogEntityDeletePermission = catalogEntityDeletePermission;
exports.catalogEntityReadPermission = catalogEntityReadPermission;
exports.catalogEntityRefreshPermission = catalogEntityRefreshPermission;
exports.catalogEntityValidatePermission = catalogEntityValidatePermission;
exports.catalogLocationAnalyzePermission = catalogLocationAnalyzePermission;
exports.catalogLocationCreatePermission = catalogLocationCreatePermission;
exports.catalogLocationDeletePermission = catalogLocationDeletePermission;
exports.catalogLocationReadPermission = catalogLocationReadPermission;
exports.catalogPermissions = catalogPermissions;
//# sourceMappingURL=permissions.cjs.js.map
