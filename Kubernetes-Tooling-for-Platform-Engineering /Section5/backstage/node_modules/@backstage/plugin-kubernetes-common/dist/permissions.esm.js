import { createPermission } from '@backstage/plugin-permission-common';

const kubernetesProxyPermission = createPermission({
  name: "kubernetes.proxy",
  attributes: {}
});
const kubernetesPermissions = [kubernetesProxyPermission];

export { kubernetesPermissions, kubernetesProxyPermission };
//# sourceMappingURL=permissions.esm.js.map
