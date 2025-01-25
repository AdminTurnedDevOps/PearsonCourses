'use strict';

var pluginKubernetesCommon = require('@backstage/plugin-kubernetes-common');

class ConfigClusterLocator {
  clusterDetails;
  constructor(clusterDetails) {
    this.clusterDetails = clusterDetails;
  }
  static fromConfig(config, authStrategy) {
    const clusterNames = /* @__PURE__ */ new Set();
    return new ConfigClusterLocator(
      config.getConfigArray("clusters").map((c) => {
        const authMetadataBlock = c.getOptional("authMetadata");
        const name = c.getString("name");
        if (clusterNames.has(name)) {
          throw new Error(`Duplicate cluster name '${name}'`);
        }
        clusterNames.add(name);
        const authProvider = authMetadataBlock?.[pluginKubernetesCommon.ANNOTATION_KUBERNETES_AUTH_PROVIDER] ?? c.getOptionalString("authProvider");
        if (!authProvider) {
          throw new Error(
            `cluster '${name}' has no auth provider configured; this must be specified via the 'authProvider' or 'authMetadata.${pluginKubernetesCommon.ANNOTATION_KUBERNETES_AUTH_PROVIDER}' parameter`
          );
        }
        const title = c.getOptionalString("title");
        const clusterDetails = {
          name,
          ...title && { title },
          url: c.getString("url"),
          skipTLSVerify: c.getOptionalBoolean("skipTLSVerify") ?? false,
          skipMetricsLookup: c.getOptionalBoolean("skipMetricsLookup") ?? false,
          caData: c.getOptionalString("caData"),
          caFile: c.getOptionalString("caFile"),
          authMetadata: {
            [pluginKubernetesCommon.ANNOTATION_KUBERNETES_AUTH_PROVIDER]: authProvider,
            ...ConfigClusterLocator.parseAuthMetadata(c),
            ...authMetadataBlock
          }
        };
        const customResources = c.getOptionalConfigArray("customResources");
        if (customResources) {
          clusterDetails.customResources = customResources.map((cr) => {
            return {
              group: cr.getString("group"),
              apiVersion: cr.getString("apiVersion"),
              plural: cr.getString("plural")
            };
          });
        }
        const dashboardUrl = c.getOptionalString("dashboardUrl");
        if (dashboardUrl) {
          clusterDetails.dashboardUrl = dashboardUrl;
        }
        const dashboardApp = c.getOptionalString("dashboardApp");
        if (dashboardApp) {
          clusterDetails.dashboardApp = dashboardApp;
        }
        if (c.has("dashboardParameters")) {
          clusterDetails.dashboardParameters = c.get("dashboardParameters");
        }
        const validationErrors = authStrategy.validateCluster(
          clusterDetails.authMetadata
        );
        if (validationErrors.length !== 0) {
          throw new Error(
            `Invalid cluster '${clusterDetails.name}': ${validationErrors.map((e) => e.message).join(", ")}`
          );
        }
        return clusterDetails;
      })
    );
  }
  static parseAuthMetadata(clusterConfig) {
    const serviceAccountToken = clusterConfig.getOptionalString(
      "serviceAccountToken"
    );
    const assumeRole = clusterConfig.getOptionalString("assumeRole");
    const externalId = clusterConfig.getOptionalString("externalId");
    const oidcTokenProvider = clusterConfig.getOptionalString("oidcTokenProvider");
    return serviceAccountToken || assumeRole || externalId || oidcTokenProvider ? {
      ...serviceAccountToken && { serviceAccountToken },
      ...assumeRole && {
        [pluginKubernetesCommon.ANNOTATION_KUBERNETES_AWS_ASSUME_ROLE]: assumeRole
      },
      ...externalId && {
        [pluginKubernetesCommon.ANNOTATION_KUBERNETES_AWS_EXTERNAL_ID]: externalId
      },
      ...oidcTokenProvider && {
        [pluginKubernetesCommon.ANNOTATION_KUBERNETES_OIDC_TOKEN_PROVIDER]: oidcTokenProvider
      }
    } : void 0;
  }
  async getClusters() {
    return this.clusterDetails;
  }
}

exports.ConfigClusterLocator = ConfigClusterLocator;
//# sourceMappingURL=ConfigClusterLocator.cjs.js.map
