'use strict';

var pluginKubernetesCommon = require('@backstage/plugin-kubernetes-common');
var errors = require('@backstage/errors');
var container = require('@google-cloud/container');
var runPeriodically = require('../service/runPeriodically.cjs.js');
var _package = require('../package.json.cjs.js');

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

class GkeClusterLocator {
  constructor(options, client, clusterDetails = void 0, hasClusterDetails = false) {
    this.options = options;
    this.client = client;
    this.clusterDetails = clusterDetails;
    this.hasClusterDetails = hasClusterDetails;
  }
  static fromConfigWithClient(config, client, refreshInterval) {
    const matchingResourceLabels = config.getOptionalConfigArray("matchingResourceLabels")?.map((mrl) => {
      return { key: mrl.getString("key"), value: mrl.getString("value") };
    }) ?? [];
    const storeAuthProviderString = config.getOptionalString("authProvider") === "googleServiceAccount" ? "googleServiceAccount" : "google";
    const options = {
      projectId: config.getString("projectId"),
      authProvider: storeAuthProviderString,
      region: config.getOptionalString("region") ?? "-",
      skipTLSVerify: config.getOptionalBoolean("skipTLSVerify") ?? false,
      skipMetricsLookup: config.getOptionalBoolean("skipMetricsLookup") ?? false,
      exposeDashboard: config.getOptionalBoolean("exposeDashboard") ?? false,
      matchingResourceLabels
    };
    const gkeClusterLocator = new GkeClusterLocator(options, client);
    if (refreshInterval) {
      runPeriodically.runPeriodically(
        () => gkeClusterLocator.refreshClusters(),
        refreshInterval.toMillis()
      );
    }
    return gkeClusterLocator;
  }
  // Added an `x-goog-api-client` header to API requests made by the GKE cluster locator to clearly identify API requests from this plugin.
  static fromConfig(config, refreshInterval = void 0) {
    return GkeClusterLocator.fromConfigWithClient(
      config,
      new container__namespace.v1.ClusterManagerClient({
        libName: `backstage/kubernetes-backend.GkeClusterLocator`,
        libVersion: _package.default.version
      }),
      refreshInterval
    );
  }
  async getClusters() {
    if (!this.hasClusterDetails) {
      await this.refreshClusters();
    }
    return this.clusterDetails ?? [];
  }
  // TODO pass caData into the object
  async refreshClusters() {
    const {
      projectId,
      region,
      authProvider,
      skipTLSVerify,
      skipMetricsLookup,
      exposeDashboard,
      matchingResourceLabels
    } = this.options;
    const request = {
      parent: `projects/${projectId}/locations/${region}`
    };
    try {
      const [response] = await this.client.listClusters(request);
      this.clusterDetails = (response.clusters ?? []).filter((r) => {
        return matchingResourceLabels?.every((mrl) => {
          if (!r.resourceLabels) {
            return false;
          }
          return r.resourceLabels[mrl.key] === mrl.value;
        });
      }).map((r) => ({
        // TODO filter out clusters which don't have name or endpoint
        name: r.name ?? "unknown",
        url: `https://${r.endpoint ?? ""}`,
        authMetadata: { [pluginKubernetesCommon.ANNOTATION_KUBERNETES_AUTH_PROVIDER]: authProvider },
        skipTLSVerify,
        skipMetricsLookup,
        ...exposeDashboard ? {
          dashboardApp: "gke",
          dashboardParameters: {
            projectId,
            region,
            clusterName: r.name
          }
        } : {}
      }));
      this.hasClusterDetails = true;
    } catch (e) {
      throw new errors.ForwardedError(
        `There was an error retrieving clusters from GKE for projectId=${projectId} region=${region}`,
        e
      );
    }
  }
}

exports.GkeClusterLocator = GkeClusterLocator;
//# sourceMappingURL=GkeClusterLocator.cjs.js.map
