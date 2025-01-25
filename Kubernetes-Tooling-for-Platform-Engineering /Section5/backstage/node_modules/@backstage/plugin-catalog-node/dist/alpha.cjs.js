'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var catalogClient = require('@backstage/catalog-client');
var extensions = require('./extensions.cjs.js');

const catalogServiceRef = backendPluginApi.createServiceRef({
  id: "catalog-client",
  defaultFactory: async (service) => backendPluginApi.createServiceFactory({
    service,
    deps: {
      discoveryApi: backendPluginApi.coreServices.discovery
    },
    async factory({ discoveryApi }) {
      return new catalogClient.CatalogClient({ discoveryApi });
    }
  })
});

exports.catalogAnalysisExtensionPoint = extensions.catalogAnalysisExtensionPoint;
exports.catalogLocationsExtensionPoint = extensions.catalogLocationsExtensionPoint;
exports.catalogModelExtensionPoint = extensions.catalogModelExtensionPoint;
exports.catalogPermissionExtensionPoint = extensions.catalogPermissionExtensionPoint;
exports.catalogProcessingExtensionPoint = extensions.catalogProcessingExtensionPoint;
exports.catalogServiceRef = catalogServiceRef;
//# sourceMappingURL=alpha.cjs.js.map
