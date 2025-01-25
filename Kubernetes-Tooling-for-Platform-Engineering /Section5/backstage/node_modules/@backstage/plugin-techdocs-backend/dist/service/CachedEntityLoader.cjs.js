'use strict';

var catalogModel = require('@backstage/catalog-model');

class CachedEntityLoader {
  catalog;
  cache;
  readTimeout = 1e3;
  constructor({ catalog, cache }) {
    this.catalog = catalog;
    this.cache = cache;
  }
  async load(entityRef, token) {
    const cacheKey = this.getCacheKey(entityRef, token);
    let result = await this.getFromCache(cacheKey);
    if (result) {
      return result;
    }
    result = await this.catalog.getEntityByRef(entityRef, { token });
    if (result) {
      this.cache.set(cacheKey, result, { ttl: 5e3 });
    }
    return result;
  }
  async getFromCache(key) {
    return await Promise.race([
      this.cache.get(key),
      new Promise((cancelAfter) => setTimeout(cancelAfter, this.readTimeout))
    ]);
  }
  getCacheKey(entityName, token) {
    const key = ["catalog", catalogModel.stringifyEntityRef(entityName)];
    if (token) {
      key.push(token);
    }
    return key.join(":");
  }
}

exports.CachedEntityLoader = CachedEntityLoader;
//# sourceMappingURL=CachedEntityLoader.cjs.js.map
