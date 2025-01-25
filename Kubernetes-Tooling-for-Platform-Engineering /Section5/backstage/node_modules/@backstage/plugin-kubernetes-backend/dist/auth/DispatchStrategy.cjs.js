'use strict';

var pluginKubernetesCommon = require('@backstage/plugin-kubernetes-common');

class DispatchStrategy {
  strategyMap;
  constructor(options) {
    this.strategyMap = options.authStrategyMap;
  }
  getCredential(clusterDetails, auth) {
    const authProvider = clusterDetails.authMetadata[pluginKubernetesCommon.ANNOTATION_KUBERNETES_AUTH_PROVIDER];
    if (this.strategyMap[authProvider]) {
      return this.strategyMap[authProvider].getCredential(clusterDetails, auth);
    }
    throw new Error(
      `authProvider "${authProvider}" has no AuthenticationStrategy associated with it`
    );
  }
  validateCluster(authMetadata) {
    const authProvider = authMetadata[pluginKubernetesCommon.ANNOTATION_KUBERNETES_AUTH_PROVIDER];
    const strategy = this.strategyMap[authProvider];
    if (!strategy) {
      return [
        new Error(
          `authProvider "${authProvider}" has no config associated with it`
        )
      ];
    }
    return strategy.validateCluster(authMetadata);
  }
  presentAuthMetadata(_authMetadata) {
    return {};
  }
}

exports.DispatchStrategy = DispatchStrategy;
//# sourceMappingURL=DispatchStrategy.cjs.js.map
