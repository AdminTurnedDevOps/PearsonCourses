'use strict';

class AksStrategy {
  async getCredential(_, requestAuth) {
    const token = requestAuth.aks;
    return token ? { type: "bearer token", token } : { type: "anonymous" };
  }
  validateCluster() {
    return [];
  }
  presentAuthMetadata(_authMetadata) {
    return {};
  }
}

exports.AksStrategy = AksStrategy;
//# sourceMappingURL=AksStrategy.cjs.js.map
