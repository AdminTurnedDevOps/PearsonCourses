'use strict';

var pluginKubernetesCommon = require('@backstage/plugin-kubernetes-common');

class OidcStrategy {
  async getCredential(clusterDetails, authConfig) {
    const oidcTokenProvider = clusterDetails.authMetadata[pluginKubernetesCommon.ANNOTATION_KUBERNETES_OIDC_TOKEN_PROVIDER];
    if (!oidcTokenProvider || oidcTokenProvider === "") {
      throw new Error(
        `oidc authProvider requires a configured oidcTokenProvider`
      );
    }
    const token = authConfig.oidc?.[oidcTokenProvider];
    if (!token) {
      throw new Error(
        `Auth token not found under oidc.${oidcTokenProvider} in request body`
      );
    }
    return { type: "bearer token", token };
  }
  validateCluster(authMetadata) {
    const oidcTokenProvider = authMetadata[pluginKubernetesCommon.ANNOTATION_KUBERNETES_OIDC_TOKEN_PROVIDER];
    if (!oidcTokenProvider || oidcTokenProvider === "") {
      return [new Error(`Must specify a token provider for 'oidc' strategy`)];
    }
    return [];
  }
  presentAuthMetadata(_authMetadata) {
    return {};
  }
}

exports.OidcStrategy = OidcStrategy;
//# sourceMappingURL=OidcStrategy.cjs.js.map
