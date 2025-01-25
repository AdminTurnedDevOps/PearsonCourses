'use strict';

class AnonymousStrategy {
  async getCredential() {
    return { type: "anonymous" };
  }
  validateCluster() {
    return [];
  }
  presentAuthMetadata(_authMetadata) {
    return {};
  }
}

exports.AnonymousStrategy = AnonymousStrategy;
//# sourceMappingURL=AnonymousStrategy.cjs.js.map
