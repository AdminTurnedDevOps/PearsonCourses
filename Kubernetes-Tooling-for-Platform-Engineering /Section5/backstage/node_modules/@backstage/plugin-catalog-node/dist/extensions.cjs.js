'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');

const catalogLocationsExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "catalog.locations"
});
const catalogProcessingExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "catalog.processing"
});
const catalogAnalysisExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "catalog.analysis"
});
const catalogModelExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "catalog.model"
});
const catalogPermissionExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "catalog.permission"
});

exports.catalogAnalysisExtensionPoint = catalogAnalysisExtensionPoint;
exports.catalogLocationsExtensionPoint = catalogLocationsExtensionPoint;
exports.catalogModelExtensionPoint = catalogModelExtensionPoint;
exports.catalogPermissionExtensionPoint = catalogPermissionExtensionPoint;
exports.catalogProcessingExtensionPoint = catalogProcessingExtensionPoint;
//# sourceMappingURL=extensions.cjs.js.map
