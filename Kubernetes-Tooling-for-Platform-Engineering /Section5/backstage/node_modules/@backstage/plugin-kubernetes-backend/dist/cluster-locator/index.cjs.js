'use strict';

var ConfigClusterLocator = require('./ConfigClusterLocator.cjs.js');
var GkeClusterLocator = require('./GkeClusterLocator.cjs.js');
var CatalogClusterLocator = require('./CatalogClusterLocator.cjs.js');
var LocalKubectlProxyLocator = require('./LocalKubectlProxyLocator.cjs.js');

class CombinedClustersSupplier {
  constructor(clusterSuppliers, logger) {
    this.clusterSuppliers = clusterSuppliers;
    this.logger = logger;
  }
  async getClusters(options) {
    const clusters = await Promise.all(
      this.clusterSuppliers.map((supplier) => supplier.getClusters(options))
    ).then((res) => {
      return res.flat();
    }).catch((e) => {
      throw e;
    });
    return this.warnDuplicates(clusters);
  }
  warnDuplicates(clusters) {
    const clusterNames = /* @__PURE__ */ new Set();
    const duplicatedNames = /* @__PURE__ */ new Set();
    for (const clusterName of clusters.map((c) => c.name)) {
      if (clusterNames.has(clusterName)) {
        duplicatedNames.add(clusterName);
      } else {
        clusterNames.add(clusterName);
      }
    }
    for (const clusterName of duplicatedNames) {
      this.logger.warn(`Duplicate cluster name '${clusterName}'`);
    }
    return clusters;
  }
}
const getCombinedClusterSupplier = (rootConfig, catalogClient, authStrategy, logger, refreshInterval = void 0, auth) => {
  const clusterSuppliers = rootConfig.getConfigArray("kubernetes.clusterLocatorMethods").map((clusterLocatorMethod) => {
    const type = clusterLocatorMethod.getString("type");
    switch (type) {
      case "catalog":
        return CatalogClusterLocator.CatalogClusterLocator.fromConfig(catalogClient, auth);
      case "localKubectlProxy":
        return new LocalKubectlProxyLocator.LocalKubectlProxyClusterLocator();
      case "config":
        return ConfigClusterLocator.ConfigClusterLocator.fromConfig(
          clusterLocatorMethod,
          authStrategy
        );
      case "gke":
        return GkeClusterLocator.GkeClusterLocator.fromConfig(
          clusterLocatorMethod,
          refreshInterval
        );
      default:
        throw new Error(
          `Unsupported kubernetes.clusterLocatorMethods: "${type}"`
        );
    }
  });
  return new CombinedClustersSupplier(clusterSuppliers, logger);
};

exports.getCombinedClusterSupplier = getCombinedClusterSupplier;
//# sourceMappingURL=index.cjs.js.map
