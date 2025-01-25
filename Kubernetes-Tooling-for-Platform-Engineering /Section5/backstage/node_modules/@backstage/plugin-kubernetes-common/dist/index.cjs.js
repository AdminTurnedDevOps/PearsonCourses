'use strict';

var catalogEntityConstants = require('./catalog-entity-constants.cjs.js');
var certificateAuthorityConstants = require('./certificate-authority-constants.cjs.js');
var permissions = require('./permissions.cjs.js');
var errorDetection = require('./error-detection/error-detection.cjs.js');
var response = require('./util/response.cjs.js');



exports.ANNOTATION_KUBERNETES_API_SERVER = catalogEntityConstants.ANNOTATION_KUBERNETES_API_SERVER;
exports.ANNOTATION_KUBERNETES_API_SERVER_CA = catalogEntityConstants.ANNOTATION_KUBERNETES_API_SERVER_CA;
exports.ANNOTATION_KUBERNETES_AUTH_PROVIDER = catalogEntityConstants.ANNOTATION_KUBERNETES_AUTH_PROVIDER;
exports.ANNOTATION_KUBERNETES_AWS_ASSUME_ROLE = catalogEntityConstants.ANNOTATION_KUBERNETES_AWS_ASSUME_ROLE;
exports.ANNOTATION_KUBERNETES_AWS_CLUSTER_ID = catalogEntityConstants.ANNOTATION_KUBERNETES_AWS_CLUSTER_ID;
exports.ANNOTATION_KUBERNETES_AWS_EXTERNAL_ID = catalogEntityConstants.ANNOTATION_KUBERNETES_AWS_EXTERNAL_ID;
exports.ANNOTATION_KUBERNETES_DASHBOARD_APP = catalogEntityConstants.ANNOTATION_KUBERNETES_DASHBOARD_APP;
exports.ANNOTATION_KUBERNETES_DASHBOARD_PARAMETERS = catalogEntityConstants.ANNOTATION_KUBERNETES_DASHBOARD_PARAMETERS;
exports.ANNOTATION_KUBERNETES_DASHBOARD_URL = catalogEntityConstants.ANNOTATION_KUBERNETES_DASHBOARD_URL;
exports.ANNOTATION_KUBERNETES_OIDC_TOKEN_PROVIDER = catalogEntityConstants.ANNOTATION_KUBERNETES_OIDC_TOKEN_PROVIDER;
exports.ANNOTATION_KUBERNETES_SKIP_METRICS_LOOKUP = catalogEntityConstants.ANNOTATION_KUBERNETES_SKIP_METRICS_LOOKUP;
exports.ANNOTATION_KUBERNETES_SKIP_TLS_VERIFY = catalogEntityConstants.ANNOTATION_KUBERNETES_SKIP_TLS_VERIFY;
exports.SERVICEACCOUNT_CA_PATH = certificateAuthorityConstants.SERVICEACCOUNT_CA_PATH;
exports.kubernetesPermissions = permissions.kubernetesPermissions;
exports.kubernetesProxyPermission = permissions.kubernetesProxyPermission;
exports.detectErrors = errorDetection.detectErrors;
exports.groupResponses = response.groupResponses;
//# sourceMappingURL=index.cjs.js.map
