'use strict';

var pluginKubernetesCommon = require('@backstage/plugin-kubernetes-common');
var dns = require('node:dns');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var dns__default = /*#__PURE__*/_interopDefaultCompat(dns);

class LocalKubectlProxyClusterLocator {
  clusterDetails;
  // verbatim: when false, IPv4 addresses are placed before IPv6 addresses, ignoring the order from the DNS resolver
  // By default kubectl proxy listens on 127.0.0.1 instead of [::1]
  lookupPromise = dns__default.default.promises.lookup("localhost", { verbatim: false });
  constructor() {
    this.clusterDetails = [
      {
        name: "local",
        url: "http://localhost:8001",
        authMetadata: {
          [pluginKubernetesCommon.ANNOTATION_KUBERNETES_AUTH_PROVIDER]: "localKubectlProxy"
        },
        skipMetricsLookup: true
      }
    ];
  }
  async getClusters() {
    const lookupResolution = await this.lookupPromise;
    this.clusterDetails[0].url = `http://${lookupResolution.address}:8001`;
    return this.clusterDetails;
  }
}

exports.LocalKubectlProxyClusterLocator = LocalKubectlProxyClusterLocator;
//# sourceMappingURL=LocalKubectlProxyLocator.cjs.js.map
