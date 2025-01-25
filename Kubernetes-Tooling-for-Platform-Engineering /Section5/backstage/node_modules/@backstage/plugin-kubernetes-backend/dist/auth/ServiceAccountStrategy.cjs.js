'use strict';

var clientNode = require('@kubernetes/client-node');
var fs = require('fs-extra');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);

class ServiceAccountStrategy {
  async getCredential(clusterDetails) {
    const token = clusterDetails.authMetadata.serviceAccountToken;
    if (token) {
      return { type: "bearer token", token };
    }
    const kc = new clientNode.KubeConfig();
    kc.loadFromCluster();
    const user = kc.getCurrentUser();
    return {
      type: "bearer token",
      token: fs__default.default.readFileSync(user.authProvider.config.tokenFile).toString()
    };
  }
  validateCluster() {
    return [];
  }
  presentAuthMetadata(_authMetadata) {
    return {};
  }
}

exports.ServiceAccountStrategy = ServiceAccountStrategy;
//# sourceMappingURL=ServiceAccountStrategy.cjs.js.map
