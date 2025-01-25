'use strict';

var pluginKubernetesCommon = require('@backstage/plugin-kubernetes-common');
var pluginPermissionNode = require('@backstage/plugin-permission-node');
var express = require('express');
var Router = require('express-promise-router');
var luxon = require('luxon');
var AksStrategy = require('../auth/AksStrategy.cjs.js');
var AnonymousStrategy = require('../auth/AnonymousStrategy.cjs.js');
var AwsIamStrategy = require('../auth/AwsIamStrategy.cjs.js');
var AzureIdentityStrategy = require('../auth/AzureIdentityStrategy.cjs.js');
var GoogleStrategy = require('../auth/GoogleStrategy.cjs.js');
var GoogleServiceAccountStrategy = require('../auth/GoogleServiceAccountStrategy.cjs.js');
var DispatchStrategy = require('../auth/DispatchStrategy.cjs.js');
var ServiceAccountStrategy = require('../auth/ServiceAccountStrategy.cjs.js');
var OidcStrategy = require('../auth/OidcStrategy.cjs.js');
var index = require('../cluster-locator/index.cjs.js');
var backendCommon = require('@backstage/backend-common');
var resourcesRoutes = require('../routes/resourcesRoutes.cjs.js');
var CatalogRelationServiceLocator = require('../service-locator/CatalogRelationServiceLocator.cjs.js');
var MultiTenantServiceLocator = require('../service-locator/MultiTenantServiceLocator.cjs.js');
var SingleTenantServiceLocator = require('../service-locator/SingleTenantServiceLocator.cjs.js');
var KubernetesFanOutHandler = require('./KubernetesFanOutHandler.cjs.js');
var KubernetesFetcher = require('./KubernetesFetcher.cjs.js');
var KubernetesProxy = require('./KubernetesProxy.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var express__default = /*#__PURE__*/_interopDefaultCompat(express);
var Router__default = /*#__PURE__*/_interopDefaultCompat(Router);

class KubernetesBuilder {
  constructor(env) {
    this.env = env;
  }
  clusterSupplier;
  defaultClusterRefreshInterval = luxon.Duration.fromObject({
    minutes: 60
  });
  objectsProvider;
  fetcher;
  serviceLocator;
  proxy;
  authStrategyMap;
  static createBuilder(env) {
    return new KubernetesBuilder(env);
  }
  async build() {
    const logger = this.env.logger;
    const config = this.env.config;
    const permissions = this.env.permissions;
    logger.info("Initializing Kubernetes backend");
    if (!config.has("kubernetes")) {
      if (process.env.NODE_ENV !== "development") {
        throw new Error("Kubernetes configuration is missing");
      }
      logger.warn(
        "Failed to initialize kubernetes backend: kubernetes config is missing"
      );
      return {
        router: Router__default.default()
      };
    }
    const { auth, httpAuth } = backendCommon.createLegacyAuthAdapters({
      auth: this.env.auth,
      httpAuth: this.env.httpAuth,
      discovery: this.env.discovery
    });
    const customResources = this.buildCustomResources();
    const fetcher = this.getFetcher();
    const clusterSupplier = this.getClusterSupplier();
    const authStrategyMap = this.getAuthStrategyMap();
    const proxy = this.getProxy(
      logger,
      clusterSupplier,
      this.env.discovery,
      httpAuth
    );
    const serviceLocator = this.getServiceLocator();
    const objectsProvider = this.getObjectsProvider({
      logger,
      fetcher,
      config,
      serviceLocator,
      customResources,
      objectTypesToFetch: this.getObjectTypesToFetch()
    });
    const router = this.buildRouter(
      objectsProvider,
      clusterSupplier,
      this.env.catalogApi,
      proxy,
      permissions,
      auth,
      httpAuth
    );
    return {
      clusterSupplier,
      customResources,
      fetcher,
      proxy,
      objectsProvider,
      router,
      serviceLocator,
      authStrategyMap
    };
  }
  setClusterSupplier(clusterSupplier) {
    this.clusterSupplier = clusterSupplier;
    return this;
  }
  setDefaultClusterRefreshInterval(refreshInterval) {
    this.defaultClusterRefreshInterval = refreshInterval;
    return this;
  }
  setObjectsProvider(objectsProvider) {
    this.objectsProvider = objectsProvider;
    return this;
  }
  setFetcher(fetcher) {
    this.fetcher = fetcher;
    return this;
  }
  setServiceLocator(serviceLocator) {
    this.serviceLocator = serviceLocator;
    return this;
  }
  setProxy(proxy) {
    this.proxy = proxy;
    return this;
  }
  setAuthStrategyMap(authStrategyMap) {
    this.authStrategyMap = authStrategyMap;
  }
  addAuthStrategy(key, strategy) {
    if (key.includes("-")) {
      throw new Error("Strategy name can not include dashes");
    }
    this.getAuthStrategyMap()[key] = strategy;
    return this;
  }
  buildCustomResources() {
    const customResources = (this.env.config.getOptionalConfigArray("kubernetes.customResources") ?? []).map(
      (c) => ({
        group: c.getString("group"),
        apiVersion: c.getString("apiVersion"),
        plural: c.getString("plural"),
        objectType: "customresources"
      })
    );
    this.env.logger.info(
      `action=LoadingCustomResources numOfCustomResources=${customResources.length}`
    );
    return customResources;
  }
  buildClusterSupplier(refreshInterval) {
    const config = this.env.config;
    const { auth } = backendCommon.createLegacyAuthAdapters(this.env);
    this.clusterSupplier = index.getCombinedClusterSupplier(
      config,
      this.env.catalogApi,
      new DispatchStrategy.DispatchStrategy({ authStrategyMap: this.getAuthStrategyMap() }),
      this.env.logger,
      refreshInterval,
      auth
    );
    return this.clusterSupplier;
  }
  buildObjectsProvider(options) {
    const authStrategyMap = this.getAuthStrategyMap();
    this.objectsProvider = new KubernetesFanOutHandler.KubernetesFanOutHandler({
      ...options,
      authStrategy: new DispatchStrategy.DispatchStrategy({
        authStrategyMap
      })
    });
    return this.objectsProvider;
  }
  buildFetcher() {
    this.fetcher = new KubernetesFetcher.KubernetesClientBasedFetcher({
      logger: this.env.logger
    });
    return this.fetcher;
  }
  buildServiceLocator(method, clusterSupplier) {
    switch (method) {
      case "multiTenant":
        this.serviceLocator = this.buildMultiTenantServiceLocator(clusterSupplier);
        break;
      case "singleTenant":
        this.serviceLocator = this.buildSingleTenantServiceLocator(clusterSupplier);
        break;
      case "catalogRelation":
        this.serviceLocator = this.buildCatalogRelationServiceLocator(clusterSupplier);
        break;
      case "http":
        this.serviceLocator = this.buildHttpServiceLocator(clusterSupplier);
        break;
      default:
        throw new Error(
          `Unsupported kubernetes.serviceLocatorMethod "${method}"`
        );
    }
    return this.serviceLocator;
  }
  buildMultiTenantServiceLocator(clusterSupplier) {
    return new MultiTenantServiceLocator.MultiTenantServiceLocator(clusterSupplier);
  }
  buildSingleTenantServiceLocator(clusterSupplier) {
    return new SingleTenantServiceLocator.SingleTenantServiceLocator(clusterSupplier);
  }
  buildCatalogRelationServiceLocator(clusterSupplier) {
    return new CatalogRelationServiceLocator.CatalogRelationServiceLocator(clusterSupplier);
  }
  buildHttpServiceLocator(_clusterSupplier) {
    throw new Error("not implemented");
  }
  buildProxy(logger, clusterSupplier, discovery, httpAuth) {
    const authStrategyMap = this.getAuthStrategyMap();
    const authStrategy = new DispatchStrategy.DispatchStrategy({
      authStrategyMap
    });
    this.proxy = new KubernetesProxy.KubernetesProxy({
      logger,
      clusterSupplier,
      authStrategy,
      discovery,
      httpAuth
    });
    return this.proxy;
  }
  buildRouter(objectsProvider, clusterSupplier, catalogApi, proxy, permissionApi, authService, httpAuth) {
    const logger = this.env.logger;
    const router = Router__default.default();
    router.use("/proxy", proxy.createRequestHandler({ permissionApi }));
    router.use(express__default.default.json());
    router.use(
      pluginPermissionNode.createPermissionIntegrationRouter({
        permissions: pluginKubernetesCommon.kubernetesPermissions
      })
    );
    router.post("/services/:serviceId", async (req, res) => {
      const serviceId = req.params.serviceId;
      const requestBody = req.body;
      try {
        const response = await objectsProvider.getKubernetesObjectsByEntity(
          {
            entity: requestBody.entity,
            auth: requestBody.auth || {}
          },
          { credentials: await httpAuth.credentials(req) }
        );
        res.json(response);
      } catch (e) {
        logger.error(
          `action=retrieveObjectsByServiceId service=${serviceId}, error=${e}`
        );
        res.status(500).json({ error: e.message });
      }
    });
    router.get("/clusters", async (req, res) => {
      const credentials = await httpAuth.credentials(req);
      const clusterDetails = await this.fetchClusterDetails(clusterSupplier, {
        credentials
      });
      res.json({
        items: clusterDetails.map((cd) => {
          const oidcTokenProvider = cd.authMetadata[pluginKubernetesCommon.ANNOTATION_KUBERNETES_OIDC_TOKEN_PROVIDER];
          const authProvider = cd.authMetadata[pluginKubernetesCommon.ANNOTATION_KUBERNETES_AUTH_PROVIDER];
          const strategy = this.getAuthStrategyMap()[authProvider];
          let auth = {};
          if (strategy) {
            auth = strategy.presentAuthMetadata(cd.authMetadata);
          }
          return {
            name: cd.name,
            title: cd.title,
            dashboardUrl: cd.dashboardUrl,
            authProvider,
            ...oidcTokenProvider && { oidcTokenProvider },
            ...auth && Object.keys(auth).length !== 0 && { auth }
          };
        })
      });
    });
    resourcesRoutes.addResourceRoutesToRouter(
      router,
      catalogApi,
      objectsProvider,
      authService,
      httpAuth
    );
    return router;
  }
  buildAuthStrategyMap() {
    this.authStrategyMap = {
      aks: new AksStrategy.AksStrategy(),
      aws: new AwsIamStrategy.AwsIamStrategy({ config: this.env.config }),
      azure: new AzureIdentityStrategy.AzureIdentityStrategy(this.env.logger),
      google: new GoogleStrategy.GoogleStrategy(),
      googleServiceAccount: new GoogleServiceAccountStrategy.GoogleServiceAccountStrategy(),
      localKubectlProxy: new AnonymousStrategy.AnonymousStrategy(),
      oidc: new OidcStrategy.OidcStrategy(),
      serviceAccount: new ServiceAccountStrategy.ServiceAccountStrategy()
    };
    return this.authStrategyMap;
  }
  async fetchClusterDetails(clusterSupplier, options) {
    const clusterDetails = await clusterSupplier.getClusters(options);
    this.env.logger.info(
      `action=loadClusterDetails numOfClustersLoaded=${clusterDetails.length}`
    );
    return clusterDetails;
  }
  getServiceLocatorMethod() {
    return this.env.config.getString(
      "kubernetes.serviceLocatorMethod.type"
    );
  }
  getFetcher() {
    return this.fetcher ?? this.buildFetcher();
  }
  getClusterSupplier() {
    return this.clusterSupplier ?? this.buildClusterSupplier(this.defaultClusterRefreshInterval);
  }
  getServiceLocator() {
    return this.serviceLocator ?? this.buildServiceLocator(
      this.getServiceLocatorMethod(),
      this.getClusterSupplier()
    );
  }
  getObjectsProvider(options) {
    return this.objectsProvider ?? this.buildObjectsProvider(options);
  }
  getObjectTypesToFetch() {
    const objectTypesToFetchStrings = this.env.config.getOptionalStringArray(
      "kubernetes.objectTypes"
    );
    const apiVersionOverrides = this.env.config.getOptionalConfig(
      "kubernetes.apiVersionOverrides"
    );
    let objectTypesToFetch;
    if (objectTypesToFetchStrings) {
      objectTypesToFetch = KubernetesFanOutHandler.DEFAULT_OBJECTS.filter(
        (obj) => objectTypesToFetchStrings.includes(obj.objectType)
      );
    }
    if (apiVersionOverrides) {
      objectTypesToFetch = objectTypesToFetch ?? KubernetesFanOutHandler.DEFAULT_OBJECTS;
      for (const obj of objectTypesToFetch) {
        if (apiVersionOverrides.has(obj.objectType)) {
          obj.apiVersion = apiVersionOverrides.getString(obj.objectType);
        }
      }
    }
    return objectTypesToFetch;
  }
  getProxy(logger, clusterSupplier, discovery, httpAuth) {
    return this.proxy ?? this.buildProxy(logger, clusterSupplier, discovery, httpAuth);
  }
  getAuthStrategyMap() {
    return this.authStrategyMap ?? this.buildAuthStrategyMap();
  }
}

exports.KubernetesBuilder = KubernetesBuilder;
//# sourceMappingURL=KubernetesBuilder.cjs.js.map
