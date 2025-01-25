'use strict';

var KubernetesBuilder = require('./KubernetesBuilder.cjs.js');

async function createRouter(options) {
  const { router } = await KubernetesBuilder.KubernetesBuilder.createBuilder(options).setClusterSupplier(options.clusterSupplier).build();
  return router;
}

exports.createRouter = createRouter;
//# sourceMappingURL=router.cjs.js.map
