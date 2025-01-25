'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var alpha = require('@backstage/plugin-catalog-node/alpha');
var KubernetesBuilder = require('./service/KubernetesBuilder.cjs.js');
require('@backstage/errors');
require('@backstage/plugin-kubernetes-common');
require('@backstage/plugin-permission-common');
require('@kubernetes/client-node');
require('http-proxy-middleware');
require('fs-extra');
require('@backstage/backend-common');
var pluginKubernetesNode = require('@backstage/plugin-kubernetes-node');

class ObjectsProvider {
  objectsProvider;
  getObjectsProvider() {
    return this.objectsProvider;
  }
  addObjectsProvider(provider) {
    if (this.objectsProvider) {
      throw new Error(
        "Multiple Kubernetes objects provider is not supported at this time"
      );
    }
    this.objectsProvider = provider;
  }
}
class ClusterSuplier {
  clusterSupplier;
  getClusterSupplier() {
    return this.clusterSupplier;
  }
  addClusterSupplier(clusterSupplier) {
    if (this.clusterSupplier) {
      throw new Error(
        "Multiple Kubernetes Cluster Suppliers is not supported at this time"
      );
    }
    this.clusterSupplier = clusterSupplier;
  }
}
class Fetcher {
  fetcher;
  getFetcher() {
    return this.fetcher;
  }
  addFetcher(fetcher) {
    if (this.fetcher) {
      throw new Error(
        "Multiple Kubernetes Fetchers is not supported at this time"
      );
    }
    this.fetcher = fetcher;
  }
}
class ServiceLocator {
  serviceLocator;
  getServiceLocator() {
    return this.serviceLocator;
  }
  addServiceLocator(serviceLocator) {
    if (this.serviceLocator) {
      throw new Error(
        "Multiple Kubernetes Service Locators is not supported at this time"
      );
    }
    this.serviceLocator = serviceLocator;
  }
}
class AuthStrategy {
  authStrategies;
  constructor() {
    this.authStrategies = new Array();
  }
  static addAuthStrategiesFromArray(authStrategies, builder) {
    authStrategies.forEach((st) => builder.addAuthStrategy(st.key, st.strategy));
  }
  getAuthenticationStrategies() {
    return this.authStrategies;
  }
  addAuthStrategy(key, authStrategy) {
    this.authStrategies.push({ key, strategy: authStrategy });
  }
}
const kubernetesPlugin = backendPluginApi.createBackendPlugin({
  pluginId: "kubernetes",
  register(env) {
    const extPointObjectsProvider = new ObjectsProvider();
    const extPointClusterSuplier = new ClusterSuplier();
    const extPointAuthStrategy = new AuthStrategy();
    const extPointFetcher = new Fetcher();
    const extPointServiceLocator = new ServiceLocator();
    env.registerExtensionPoint(
      pluginKubernetesNode.kubernetesObjectsProviderExtensionPoint,
      extPointObjectsProvider
    );
    env.registerExtensionPoint(
      pluginKubernetesNode.kubernetesClusterSupplierExtensionPoint,
      extPointClusterSuplier
    );
    env.registerExtensionPoint(
      pluginKubernetesNode.kubernetesAuthStrategyExtensionPoint,
      extPointAuthStrategy
    );
    env.registerExtensionPoint(
      pluginKubernetesNode.kubernetesFetcherExtensionPoint,
      extPointFetcher
    );
    env.registerExtensionPoint(
      pluginKubernetesNode.kubernetesServiceLocatorExtensionPoint,
      extPointServiceLocator
    );
    env.registerInit({
      deps: {
        http: backendPluginApi.coreServices.httpRouter,
        logger: backendPluginApi.coreServices.logger,
        config: backendPluginApi.coreServices.rootConfig,
        discovery: backendPluginApi.coreServices.discovery,
        catalogApi: alpha.catalogServiceRef,
        permissions: backendPluginApi.coreServices.permissions,
        auth: backendPluginApi.coreServices.auth,
        httpAuth: backendPluginApi.coreServices.httpAuth
      },
      async init({
        http,
        logger,
        config,
        discovery,
        catalogApi,
        permissions,
        auth,
        httpAuth
      }) {
        if (config.has("kubernetes")) {
          const builder = KubernetesBuilder.KubernetesBuilder.createBuilder({
            logger,
            config,
            catalogApi,
            permissions,
            discovery,
            auth,
            httpAuth
          }).setObjectsProvider(extPointObjectsProvider.getObjectsProvider()).setClusterSupplier(extPointClusterSuplier.getClusterSupplier()).setFetcher(extPointFetcher.getFetcher()).setServiceLocator(extPointServiceLocator.getServiceLocator());
          AuthStrategy.addAuthStrategiesFromArray(
            extPointAuthStrategy.getAuthenticationStrategies(),
            builder
          );
          const { router } = await builder.build();
          http.use(router);
        } else {
          logger.warn(
            "Failed to initialize kubernetes backend: valid kubernetes config is missing"
          );
        }
      }
    });
  }
});

exports.kubernetesPlugin = kubernetesPlugin;
//# sourceMappingURL=plugin.cjs.js.map
