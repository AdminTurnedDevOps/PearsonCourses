'use strict';

var response = require('../util/response.cjs.js');
var pods = require('./pods.cjs.js');
var deployments = require('./deployments.cjs.js');
var hpas = require('./hpas.cjs.js');

const detectErrors = (objects) => {
  const errors = /* @__PURE__ */ new Map();
  for (const clusterResponse of objects.items) {
    let clusterErrors = [];
    const groupedResponses = response.groupResponses(clusterResponse.resources);
    clusterErrors = clusterErrors.concat(
      pods.detectErrorsInPods(groupedResponses.pods)
    );
    clusterErrors = clusterErrors.concat(
      deployments.detectErrorsInDeployments(groupedResponses.deployments)
    );
    clusterErrors = clusterErrors.concat(
      hpas.detectErrorsInHpa(
        groupedResponses.horizontalPodAutoscalers
      )
    );
    errors.set(clusterResponse.cluster.name, clusterErrors);
  }
  return errors;
};

exports.detectErrors = detectErrors;
//# sourceMappingURL=error-detection.cjs.js.map
