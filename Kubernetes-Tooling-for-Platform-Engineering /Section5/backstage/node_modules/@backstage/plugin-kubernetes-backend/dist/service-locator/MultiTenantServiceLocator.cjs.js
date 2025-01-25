'use strict';

class MultiTenantServiceLocator {
  clusterSupplier;
  constructor(clusterSupplier) {
    this.clusterSupplier = clusterSupplier;
  }
  // As this implementation always returns all clusters serviceId is ignored here
  getClustersByEntity(_entity, requestContext) {
    return this.clusterSupplier.getClusters({ credentials: requestContext.credentials }).then((clusters) => ({ clusters }));
  }
}

exports.MultiTenantServiceLocator = MultiTenantServiceLocator;
//# sourceMappingURL=MultiTenantServiceLocator.cjs.js.map
