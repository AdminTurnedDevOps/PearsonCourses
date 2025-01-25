import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiRbacV1beta1RoleRef } from "./RoleRef";
import { IIoK8sApiRbacV1beta1Subject } from "./Subject";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ClusterRoleBinding references a ClusterRole, but not contain it.  It can reference a ClusterRole in the global namespace, and adds who information via Subject. Deprecated in v1.17 in favor of rbac.authorization.k8s.io/v1 ClusterRoleBinding, and will no longer be served in v1.22.
 * @deprecated
 */
export interface IClusterRoleBinding extends TypeMeta {
    "apiVersion": "rbac.authorization.k8s.io/v1beta1";
    "kind": "ClusterRoleBinding";
    /**
     * Standard object's metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * RoleRef can only reference a ClusterRole in the global namespace. If the RoleRef cannot be resolved, the Authorizer must return an error.
     */
    "roleRef": IIoK8sApiRbacV1beta1RoleRef;
    /**
     * Subjects holds references to the objects the role applies to.
     */
    "subjects"?: Array<IIoK8sApiRbacV1beta1Subject>;
}
/**
 * ClusterRoleBinding references a ClusterRole, but not contain it.  It can reference a ClusterRole in the global namespace, and adds who information via Subject. Deprecated in v1.17 in favor of rbac.authorization.k8s.io/v1 ClusterRoleBinding, and will no longer be served in v1.22.
 * @deprecated
 */
export declare class ClusterRoleBinding extends Model<IClusterRoleBinding> implements IClusterRoleBinding {
    "apiVersion": IClusterRoleBinding["apiVersion"];
    "kind": IClusterRoleBinding["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "roleRef": IIoK8sApiRbacV1beta1RoleRef;
    "subjects"?: Array<IIoK8sApiRbacV1beta1Subject>;
    static apiVersion: IClusterRoleBinding["apiVersion"];
    static kind: IClusterRoleBinding["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IClusterRoleBinding>;
    constructor(data?: ModelData<IClusterRoleBinding>);
}
export { IClusterRoleBinding as IIoK8sApiRbacV1beta1ClusterRoleBinding, ClusterRoleBinding as IoK8sApiRbacV1beta1ClusterRoleBinding };
