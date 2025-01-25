'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');

const kubernetesObjectsProviderExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "kubernetes.objects-provider"
});
const kubernetesClusterSupplierExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "kubernetes.cluster-supplier"
});
const kubernetesAuthStrategyExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "kubernetes.auth-strategy"
});
const kubernetesFetcherExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "kubernetes.fetcher"
});
const kubernetesServiceLocatorExtensionPoint = backendPluginApi.createExtensionPoint({
  id: "kubernetes.service-locator"
});

exports.kubernetesAuthStrategyExtensionPoint = kubernetesAuthStrategyExtensionPoint;
exports.kubernetesClusterSupplierExtensionPoint = kubernetesClusterSupplierExtensionPoint;
exports.kubernetesFetcherExtensionPoint = kubernetesFetcherExtensionPoint;
exports.kubernetesObjectsProviderExtensionPoint = kubernetesObjectsProviderExtensionPoint;
exports.kubernetesServiceLocatorExtensionPoint = kubernetesServiceLocatorExtensionPoint;
//# sourceMappingURL=extensions.cjs.js.map
