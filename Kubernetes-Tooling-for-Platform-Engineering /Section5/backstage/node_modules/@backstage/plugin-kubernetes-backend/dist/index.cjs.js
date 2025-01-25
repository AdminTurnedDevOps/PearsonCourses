'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('./plugin.cjs.js');
var AksStrategy = require('./auth/AksStrategy.cjs.js');
var AnonymousStrategy = require('./auth/AnonymousStrategy.cjs.js');
var AwsIamStrategy = require('./auth/AwsIamStrategy.cjs.js');
var AzureIdentityStrategy = require('./auth/AzureIdentityStrategy.cjs.js');
var GoogleStrategy = require('./auth/GoogleStrategy.cjs.js');
var GoogleServiceAccountStrategy = require('./auth/GoogleServiceAccountStrategy.cjs.js');
var DispatchStrategy = require('./auth/DispatchStrategy.cjs.js');
var ServiceAccountStrategy = require('./auth/ServiceAccountStrategy.cjs.js');
var OidcStrategy = require('./auth/OidcStrategy.cjs.js');
var KubernetesBuilder = require('./service/KubernetesBuilder.cjs.js');
var KubernetesFanOutHandler = require('./service/KubernetesFanOutHandler.cjs.js');
var KubernetesProxy = require('./service/KubernetesProxy.cjs.js');
var router = require('./service/router.cjs.js');



exports.default = plugin.kubernetesPlugin;
exports.AksStrategy = AksStrategy.AksStrategy;
exports.AnonymousStrategy = AnonymousStrategy.AnonymousStrategy;
exports.AwsIamStrategy = AwsIamStrategy.AwsIamStrategy;
exports.AzureIdentityStrategy = AzureIdentityStrategy.AzureIdentityStrategy;
exports.GoogleStrategy = GoogleStrategy.GoogleStrategy;
exports.GoogleServiceAccountStrategy = GoogleServiceAccountStrategy.GoogleServiceAccountStrategy;
exports.DispatchStrategy = DispatchStrategy.DispatchStrategy;
exports.ServiceAccountStrategy = ServiceAccountStrategy.ServiceAccountStrategy;
exports.OidcStrategy = OidcStrategy.OidcStrategy;
exports.KubernetesBuilder = KubernetesBuilder.KubernetesBuilder;
exports.DEFAULT_OBJECTS = KubernetesFanOutHandler.DEFAULT_OBJECTS;
exports.HEADER_KUBERNETES_AUTH = KubernetesProxy.HEADER_KUBERNETES_AUTH;
exports.HEADER_KUBERNETES_CLUSTER = KubernetesProxy.HEADER_KUBERNETES_CLUSTER;
exports.KubernetesProxy = KubernetesProxy.KubernetesProxy;
exports.createRouter = router.createRouter;
//# sourceMappingURL=index.cjs.js.map
