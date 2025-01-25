'use strict';

class CatalogRelationServiceLocator {
  clusterSupplier;
  constructor(clusterSupplier) {
    this.clusterSupplier = clusterSupplier;
  }
  // As this implementation always returns all clusters serviceId is ignored here
  getClustersByEntity(entity, requestContext) {
    if (entity.relations && entity.relations.some(
      (r) => r.type === "dependsOn" && r.targetRef.includes("resource:")
    )) {
      return this.clusterSupplier.getClusters({ credentials: requestContext.credentials }).then((clusters) => {
        return {
          clusters: clusters.filter(
            (c) => this.doesEntityDependOnCluster(entity, c)
          )
        };
      });
    }
    return Promise.resolve({ clusters: [] });
  }
  doesEntityDependOnCluster(entity, cluster) {
    return entity.relations.some(
      (rel) => rel.type === "dependsOn" && rel.targetRef === `resource:${entity.metadata.namespace ?? "default"}/${cluster.name}`
    );
  }
}

exports.CatalogRelationServiceLocator = CatalogRelationServiceLocator;
//# sourceMappingURL=CatalogRelationServiceLocator.cjs.js.map
