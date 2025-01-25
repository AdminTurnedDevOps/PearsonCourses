'use strict';

var pluginPermissionCommon = require('@backstage/plugin-permission-common');

const kubernetesProxyPermission = pluginPermissionCommon.createPermission({
  name: "kubernetes.proxy",
  attributes: {}
});
const kubernetesPermissions = [kubernetesProxyPermission];

exports.kubernetesPermissions = kubernetesPermissions;
exports.kubernetesProxyPermission = kubernetesProxyPermission;
//# sourceMappingURL=permissions.cjs.js.map
