'use strict';

class GoogleStrategy {
  async getCredential(_, requestAuth) {
    const token = requestAuth.google;
    if (!token) {
      throw new Error(
        "Google token not found under auth.google in request body"
      );
    }
    return { type: "bearer token", token };
  }
  validateCluster() {
    return [];
  }
  presentAuthMetadata(_authMetadata) {
    return {};
  }
}

exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=GoogleStrategy.cjs.js.map
