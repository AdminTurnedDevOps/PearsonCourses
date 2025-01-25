'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var testUtils = require('@backstage/catalog-client/testUtils');
var pluginCatalogNode = require('@backstage/plugin-catalog-node');

function simpleMock(ref, mockFactory) {
  return (partialImpl) => {
    const mock = mockFactory();
    if (partialImpl) {
      for (const [key, impl] of Object.entries(partialImpl)) {
        if (typeof impl === "function") {
          mock[key].mockImplementation(impl);
        } else {
          mock[key] = impl;
        }
      }
    }
    return Object.assign(mock, {
      factory: backendPluginApi.createServiceFactory({
        service: ref,
        deps: {},
        factory: () => mock
      })
    });
  };
}
function catalogServiceMock(options) {
  return new testUtils.InMemoryCatalogClient(options);
}
((catalogServiceMock2) => {
  catalogServiceMock2.factory = (options) => backendPluginApi.createServiceFactory({
    service: pluginCatalogNode.catalogServiceRef,
    deps: {},
    factory: () => new testUtils.InMemoryCatalogClient(options)
  });
  catalogServiceMock2.mock = simpleMock(pluginCatalogNode.catalogServiceRef, () => ({
    getEntities: jest.fn(),
    getEntitiesByRefs: jest.fn(),
    queryEntities: jest.fn(),
    getEntityAncestors: jest.fn(),
    getEntityByRef: jest.fn(),
    removeEntityByUid: jest.fn(),
    refreshEntity: jest.fn(),
    getEntityFacets: jest.fn(),
    getLocationById: jest.fn(),
    getLocationByRef: jest.fn(),
    addLocation: jest.fn(),
    removeLocationById: jest.fn(),
    getLocationByEntity: jest.fn(),
    validateEntity: jest.fn()
  }));
})(catalogServiceMock || (catalogServiceMock = {}));

exports.catalogServiceMock = catalogServiceMock;
//# sourceMappingURL=catalogServiceMock.cjs.js.map
