'use strict';

var container = require('@google-cloud/container');

function _interopNamespaceCompat(e) {
  if (e && typeof e === 'object' && 'default' in e) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var container__namespace = /*#__PURE__*/_interopNamespaceCompat(container);

class GoogleServiceAccountStrategy {
  async getCredential() {
    const client = new container__namespace.v1.ClusterManagerClient();
    const token = await client.auth.getAccessToken();
    if (!token) {
      throw new Error(
        "Unable to obtain access token for the current Google Application Default Credentials"
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

exports.GoogleServiceAccountStrategy = GoogleServiceAccountStrategy;
//# sourceMappingURL=GoogleServiceAccountStrategy.cjs.js.map
