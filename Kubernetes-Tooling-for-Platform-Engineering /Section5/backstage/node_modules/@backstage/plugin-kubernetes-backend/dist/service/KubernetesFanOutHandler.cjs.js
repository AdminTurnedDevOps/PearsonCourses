'use strict';

const DEFAULT_OBJECTS = [
  {
    group: "",
    apiVersion: "v1",
    plural: "pods",
    objectType: "pods"
  },
  {
    group: "",
    apiVersion: "v1",
    plural: "services",
    objectType: "services"
  },
  {
    group: "",
    apiVersion: "v1",
    plural: "configmaps",
    objectType: "configmaps"
  },
  {
    group: "",
    apiVersion: "v1",
    plural: "limitranges",
    objectType: "limitranges"
  },
  {
    group: "",
    apiVersion: "v1",
    plural: "resourcequotas",
    objectType: "resourcequotas"
  },
  {
    group: "apps",
    apiVersion: "v1",
    plural: "deployments",
    objectType: "deployments"
  },
  {
    group: "apps",
    apiVersion: "v1",
    plural: "replicasets",
    objectType: "replicasets"
  },
  {
    group: "autoscaling",
    apiVersion: "v2",
    plural: "horizontalpodautoscalers",
    objectType: "horizontalpodautoscalers"
  },
  {
    group: "batch",
    apiVersion: "v1",
    plural: "jobs",
    objectType: "jobs"
  },
  {
    group: "batch",
    apiVersion: "v1",
    plural: "cronjobs",
    objectType: "cronjobs"
  },
  {
    group: "networking.k8s.io",
    apiVersion: "v1",
    plural: "ingresses",
    objectType: "ingresses"
  },
  {
    group: "apps",
    apiVersion: "v1",
    plural: "statefulsets",
    objectType: "statefulsets"
  },
  {
    group: "apps",
    apiVersion: "v1",
    plural: "daemonsets",
    objectType: "daemonsets"
  }
];
const isPodFetchResponse = (fr) => fr.type === "pods" || fr.type === "customresources" && fr.resources.length > 0 && fr.resources[0].apiVersion === "v1" && fr.resources[0].kind === "Pod";
const isString = (str) => str !== void 0;
const numberOrBigIntToNumberOrString = (value) => {
  return typeof value === "bigint" ? value.toString() : value;
};
const toClientSafeResource = (current) => {
  return {
    currentUsage: numberOrBigIntToNumberOrString(current.CurrentUsage),
    requestTotal: numberOrBigIntToNumberOrString(current.RequestTotal),
    limitTotal: numberOrBigIntToNumberOrString(current.LimitTotal)
  };
};
const toClientSafeContainer = (container) => {
  return {
    container: container.Container,
    cpuUsage: toClientSafeResource(container.CPUUsage),
    memoryUsage: toClientSafeResource(container.MemoryUsage)
  };
};
const toClientSafePodMetrics = (podMetrics) => {
  return podMetrics.map((r) => r.resources).flat().map((pd) => {
    return {
      pod: pd.Pod,
      memory: toClientSafeResource(pd.Memory),
      cpu: toClientSafeResource(pd.CPU),
      containers: pd.Containers.map(toClientSafeContainer)
    };
  });
};
class KubernetesFanOutHandler {
  logger;
  fetcher;
  serviceLocator;
  customResources;
  objectTypesToFetch;
  authStrategy;
  constructor({
    logger,
    fetcher,
    serviceLocator,
    customResources,
    objectTypesToFetch = DEFAULT_OBJECTS,
    authStrategy
  }) {
    this.logger = logger;
    this.fetcher = fetcher;
    this.serviceLocator = serviceLocator;
    this.customResources = customResources;
    this.objectTypesToFetch = new Set(objectTypesToFetch);
    this.authStrategy = authStrategy;
  }
  async getCustomResourcesByEntity({ entity, auth, customResources }, options) {
    return this.fanOutRequests(
      entity,
      auth,
      { credentials: options.credentials },
      /* @__PURE__ */ new Set(),
      customResources
    );
  }
  async getKubernetesObjectsByEntity({ entity, auth }, options) {
    return this.fanOutRequests(
      entity,
      auth,
      {
        credentials: options.credentials
      },
      this.objectTypesToFetch
    );
  }
  async fanOutRequests(entity, auth, options, objectTypesToFetch, customResources) {
    const entityName = entity.metadata?.annotations?.["backstage.io/kubernetes-id"] || entity.metadata?.name;
    const { clusters } = await this.serviceLocator.getClustersByEntity(entity, {
      objectTypesToFetch,
      customResources: customResources ?? [],
      credentials: options.credentials
    });
    this.logger.info(
      `entity.metadata.name=${entityName} clusterDetails=[${clusters.map((c) => c.name).join(", ")}]`
    );
    const labelSelector = entity.metadata?.annotations?.["backstage.io/kubernetes-label-selector"] || `backstage.io/kubernetes-id=${entityName}`;
    const namespace = entity.metadata?.annotations?.["backstage.io/kubernetes-namespace"];
    return Promise.all(
      clusters.map(async (clusterDetails) => {
        const credential = await this.authStrategy.getCredential(
          clusterDetails,
          auth
        );
        return this.fetcher.fetchObjectsForService({
          serviceId: entityName,
          clusterDetails,
          credential,
          objectTypesToFetch,
          labelSelector,
          customResources: (customResources || clusterDetails.customResources || this.customResources).map((c) => ({
            ...c,
            objectType: "customresources"
          })),
          namespace
        }).then(
          (result) => this.getMetricsForPods(
            clusterDetails,
            credential,
            labelSelector,
            result
          )
        ).catch(
          (e) => e.name === "FetchError" ? Promise.resolve([
            {
              errors: [
                { errorType: "FETCH_ERROR", message: e.message }
              ],
              responses: []
            },
            []
          ]) : Promise.reject(e)
        ).then((r) => this.toClusterObjects(clusterDetails, r));
      })
    ).then(this.toObjectsByEntityResponse);
  }
  toObjectsByEntityResponse(clusterObjects) {
    return {
      items: clusterObjects.filter(
        (item) => item.errors !== void 0 && item.errors.length >= 1 || item.resources !== void 0 && item.resources.length >= 1 && item.resources.some((fr) => fr.resources?.length >= 1)
      )
    };
  }
  toClusterObjects(clusterDetails, [result, metrics]) {
    const objects = {
      cluster: {
        name: clusterDetails.name,
        ...clusterDetails.title && { title: clusterDetails.title }
      },
      podMetrics: toClientSafePodMetrics(metrics),
      resources: result.responses,
      errors: result.errors
    };
    if (clusterDetails.dashboardUrl) {
      objects.cluster.dashboardUrl = clusterDetails.dashboardUrl;
    }
    if (clusterDetails.dashboardApp) {
      objects.cluster.dashboardApp = clusterDetails.dashboardApp;
    }
    if (clusterDetails.dashboardParameters) {
      objects.cluster.dashboardParameters = clusterDetails.dashboardParameters;
    }
    return objects;
  }
  async getMetricsForPods(clusterDetails, credential, labelSelector, result) {
    if (clusterDetails.skipMetricsLookup) {
      return [result, []];
    }
    const namespaces = new Set(
      result.responses.filter(isPodFetchResponse).flatMap((r) => r.resources).map((p) => p.metadata?.namespace).filter(isString)
    );
    if (namespaces.size === 0) {
      return [result, []];
    }
    const podMetrics = await this.fetcher.fetchPodMetricsByNamespaces(
      clusterDetails,
      credential,
      namespaces,
      labelSelector
    );
    result.errors.push(...podMetrics.errors);
    return [result, podMetrics.responses];
  }
}

exports.DEFAULT_OBJECTS = DEFAULT_OBJECTS;
exports.KubernetesFanOutHandler = KubernetesFanOutHandler;
//# sourceMappingURL=KubernetesFanOutHandler.cjs.js.map
