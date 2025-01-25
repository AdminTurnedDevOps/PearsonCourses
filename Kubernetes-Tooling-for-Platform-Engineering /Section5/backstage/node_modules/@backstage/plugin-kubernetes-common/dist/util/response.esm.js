const groupResponses = (fetchResponse) => {
  return fetchResponse.reduce(
    (prev, next) => {
      switch (next.type) {
        case "deployments":
          prev.deployments.push(...next.resources);
          break;
        case "pods":
          prev.pods.push(...next.resources);
          break;
        case "replicasets":
          prev.replicaSets.push(...next.resources);
          break;
        case "services":
          prev.services.push(...next.resources);
          break;
        case "configmaps":
          prev.configMaps.push(...next.resources);
          break;
        case "horizontalpodautoscalers":
          prev.horizontalPodAutoscalers.push(...next.resources);
          break;
        case "ingresses":
          prev.ingresses.push(...next.resources);
          break;
        case "jobs":
          prev.jobs.push(...next.resources);
          break;
        case "cronjobs":
          prev.cronJobs.push(...next.resources);
          break;
        case "customresources":
          prev.customResources.push(...next.resources);
          break;
        case "statefulsets":
          prev.statefulsets.push(...next.resources);
          break;
        case "daemonsets":
          prev.daemonSets.push(...next.resources);
          break;
      }
      return prev;
    },
    {
      pods: [],
      replicaSets: [],
      deployments: [],
      services: [],
      configMaps: [],
      horizontalPodAutoscalers: [],
      ingresses: [],
      jobs: [],
      cronJobs: [],
      customResources: [],
      statefulsets: [],
      daemonSets: []
    }
  );
};

export { groupResponses };
//# sourceMappingURL=response.esm.js.map
