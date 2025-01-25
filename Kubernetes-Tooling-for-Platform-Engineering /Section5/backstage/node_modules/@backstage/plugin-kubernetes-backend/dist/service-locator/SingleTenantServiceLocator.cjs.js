'use strict';

class SingleTenantServiceLocator {
  clusterSupplier;
  constructor(clusterSupplier) {
    this.clusterSupplier = clusterSupplier;
  }
  // As this implementation always returns all clusters serviceId is ignored here
  getClustersByEntity(_entity, requestContext) {
    return this.clusterSupplier.getClusters({ credentials: requestContext.credentials }).then((clusters) => {
      if (_entity.metadata?.annotations?.["backstage.io/kubernetes-cluster"]) {
        return {
          clusters: clusters.filter(
            (c) => c.name === _entity.metadata?.annotations?.["backstage.io/kubernetes-cluster"]
          )
        };
      }
      return { clusters };
    });
  }
}

exports.SingleTenantServiceLocator = SingleTenantServiceLocator;
//# sourceMappingURL=SingleTenantServiceLocator.cjs.js.map
