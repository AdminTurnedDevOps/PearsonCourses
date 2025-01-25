import { groupResponses } from '../util/response.esm.js';
import { detectErrorsInPods } from './pods.esm.js';
import { detectErrorsInDeployments } from './deployments.esm.js';
import { detectErrorsInHpa } from './hpas.esm.js';

const detectErrors = (objects) => {
  const errors = /* @__PURE__ */ new Map();
  for (const clusterResponse of objects.items) {
    let clusterErrors = [];
    const groupedResponses = groupResponses(clusterResponse.resources);
    clusterErrors = clusterErrors.concat(
      detectErrorsInPods(groupedResponses.pods)
    );
    clusterErrors = clusterErrors.concat(
      detectErrorsInDeployments(groupedResponses.deployments)
    );
    clusterErrors = clusterErrors.concat(
      detectErrorsInHpa(
        groupedResponses.horizontalPodAutoscalers
      )
    );
    errors.set(clusterResponse.cluster.name, clusterErrors);
  }
  return errors;
};

export { detectErrors };
//# sourceMappingURL=error-detection.esm.js.map
