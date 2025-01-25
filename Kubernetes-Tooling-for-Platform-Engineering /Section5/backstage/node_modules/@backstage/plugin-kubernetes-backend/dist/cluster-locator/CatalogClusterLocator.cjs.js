'use strict';

var catalogClient = require('@backstage/catalog-client');
var pluginKubernetesCommon = require('@backstage/plugin-kubernetes-common');

function isObject(obj) {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
class CatalogClusterLocator {
  catalogClient;
  auth;
  constructor(catalogClient, auth) {
    this.catalogClient = catalogClient;
    this.auth = auth;
  }
  static fromConfig(catalogApi, auth) {
    return new CatalogClusterLocator(catalogApi, auth);
  }
  async getClusters(options) {
    const apiServerKey = `metadata.annotations.${pluginKubernetesCommon.ANNOTATION_KUBERNETES_API_SERVER}`;
    const apiServerCaKey = `metadata.annotations.${pluginKubernetesCommon.ANNOTATION_KUBERNETES_API_SERVER_CA}`;
    const authProviderKey = `metadata.annotations.${pluginKubernetesCommon.ANNOTATION_KUBERNETES_AUTH_PROVIDER}`;
    const filter = {
      kind: "Resource",
      "spec.type": "kubernetes-cluster",
      [apiServerKey]: catalogClient.CATALOG_FILTER_EXISTS,
      [apiServerCaKey]: catalogClient.CATALOG_FILTER_EXISTS,
      [authProviderKey]: catalogClient.CATALOG_FILTER_EXISTS
    };
    const clusters = await this.catalogClient.getEntities(
      {
        filter: [filter]
      },
      options?.credentials ? {
        token: (await this.auth.getPluginRequestToken({
          onBehalfOf: options.credentials,
          targetPluginId: "catalog"
        })).token
      } : void 0
    );
    return clusters.items.map((entity) => {
      const annotations = entity.metadata.annotations;
      const clusterDetails = {
        name: entity.metadata.name,
        title: entity.metadata.title,
        url: annotations[pluginKubernetesCommon.ANNOTATION_KUBERNETES_API_SERVER],
        authMetadata: annotations,
        caData: annotations[pluginKubernetesCommon.ANNOTATION_KUBERNETES_API_SERVER_CA],
        skipMetricsLookup: annotations[pluginKubernetesCommon.ANNOTATION_KUBERNETES_SKIP_METRICS_LOOKUP] === "true",
        skipTLSVerify: annotations[pluginKubernetesCommon.ANNOTATION_KUBERNETES_SKIP_TLS_VERIFY] === "true",
        dashboardUrl: annotations[pluginKubernetesCommon.ANNOTATION_KUBERNETES_DASHBOARD_URL],
        dashboardApp: annotations[pluginKubernetesCommon.ANNOTATION_KUBERNETES_DASHBOARD_APP],
        dashboardParameters: this.getDashboardParameters(annotations)
      };
      return clusterDetails;
    });
  }
  getDashboardParameters(annotations) {
    const dashboardParamsString = annotations[pluginKubernetesCommon.ANNOTATION_KUBERNETES_DASHBOARD_PARAMETERS];
    if (dashboardParamsString) {
      try {
        const dashboardParams = JSON.parse(dashboardParamsString);
        return isObject(dashboardParams) ? dashboardParams : void 0;
      } catch {
        return void 0;
      }
    }
    return void 0;
  }
}

exports.CatalogClusterLocator = CatalogClusterLocator;
//# sourceMappingURL=CatalogClusterLocator.cjs.js.map
