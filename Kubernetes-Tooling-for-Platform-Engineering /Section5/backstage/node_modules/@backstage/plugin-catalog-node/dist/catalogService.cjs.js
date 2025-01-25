'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var catalogClient = require('@backstage/catalog-client');

class DefaultCatalogService {
  #auth;
  #catalogApi;
  constructor({
    catalogApi,
    auth
  }) {
    this.#catalogApi = catalogApi;
    this.#auth = auth;
  }
  async getEntities(request, options) {
    return this.#catalogApi.getEntities(
      request,
      await this.#getOptions(options)
    );
  }
  async getEntitiesByRefs(request, options) {
    return this.#catalogApi.getEntitiesByRefs(
      request,
      await this.#getOptions(options)
    );
  }
  async queryEntities(request, options) {
    return this.#catalogApi.queryEntities(
      request,
      await this.#getOptions(options)
    );
  }
  async getEntityAncestors(request, options) {
    return this.#catalogApi.getEntityAncestors(
      request,
      await this.#getOptions(options)
    );
  }
  async getEntityByRef(entityRef, options) {
    return this.#catalogApi.getEntityByRef(
      entityRef,
      await this.#getOptions(options)
    );
  }
  async removeEntityByUid(uid, options) {
    return this.#catalogApi.removeEntityByUid(
      uid,
      await this.#getOptions(options)
    );
  }
  async refreshEntity(entityRef, options) {
    return this.#catalogApi.refreshEntity(
      entityRef,
      await this.#getOptions(options)
    );
  }
  async getEntityFacets(request, options) {
    return this.#catalogApi.getEntityFacets(
      request,
      await this.#getOptions(options)
    );
  }
  async getLocationById(id, options) {
    return this.#catalogApi.getLocationById(
      id,
      await this.#getOptions(options)
    );
  }
  async getLocationByRef(locationRef, options) {
    return this.#catalogApi.getLocationByRef(
      locationRef,
      await this.#getOptions(options)
    );
  }
  async addLocation(location, options) {
    return this.#catalogApi.addLocation(
      location,
      await this.#getOptions(options)
    );
  }
  async removeLocationById(id, options) {
    return this.#catalogApi.removeLocationById(
      id,
      await this.#getOptions(options)
    );
  }
  async getLocationByEntity(entityRef, options) {
    return this.#catalogApi.getLocationByEntity(
      entityRef,
      await this.#getOptions(options)
    );
  }
  async validateEntity(entity, locationRef, options) {
    return this.#catalogApi.validateEntity(
      entity,
      locationRef,
      await this.#getOptions(options)
    );
  }
  async #getOptions(options) {
    return this.#auth.getPluginRequestToken({
      onBehalfOf: options.credentials,
      targetPluginId: "catalog"
    });
  }
}
const catalogServiceRef = backendPluginApi.createServiceRef({
  id: "catalog-client",
  defaultFactory: async (service) => backendPluginApi.createServiceFactory({
    service,
    deps: {
      auth: backendPluginApi.coreServices.auth,
      discoveryApi: backendPluginApi.coreServices.discovery
    },
    async factory({ auth, discoveryApi }) {
      return new DefaultCatalogService({
        auth,
        catalogApi: new catalogClient.CatalogClient({ discoveryApi })
      });
    }
  })
});

exports.catalogServiceRef = catalogServiceRef;
//# sourceMappingURL=catalogService.cjs.js.map
