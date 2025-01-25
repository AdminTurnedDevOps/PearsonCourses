import { detectErrorsInObjects } from './common.esm.js';

const deploymentErrorMappers = [
  {
    detectErrors: (deployment) => {
      return (deployment.status?.conditions ?? []).filter((c) => c.status === "False").filter((c) => c.message !== void 0).map((c) => ({
        type: "condition-message-present",
        message: c.message ?? "",
        severity: 6,
        sourceRef: {
          name: deployment.metadata?.name ?? "unknown hpa",
          namespace: deployment.metadata?.namespace ?? "unknown namespace",
          kind: "Deployment",
          apiGroup: "apps/v1"
        },
        occurrenceCount: 1
      }));
    }
  }
];
const detectErrorsInDeployments = (deployments) => detectErrorsInObjects(deployments, deploymentErrorMappers);

export { detectErrorsInDeployments };
//# sourceMappingURL=deployments.esm.js.map
