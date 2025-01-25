import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiRbacV1beta1RoleRef } from "./RoleRef";
import { IIoK8sApiRbacV1beta1Subject } from "./Subject";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * RoleBinding references a role, but does not contain it.  It can reference a Role in the same namespace or a ClusterRole in the global namespace. It adds who information via Subjects and namespace information by which namespace it exists in.  RoleBindings in a given namespace only have effect in that namespace. Deprecated in v1.17 in favor of rbac.authorization.k8s.io/v1 RoleBinding, and will no longer be served in v1.22.
 * @deprecated
 */
export interface IRoleBinding extends TypeMeta {
    "apiVersion": "rbac.authorization.k8s.io/v1beta1";
    "kind": "RoleBinding";
    /**
     * Standard object's metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * RoleRef can reference a Role in the current namespace or a ClusterRole in the global namespace. If the RoleRef cannot be resolved, the Authorizer must return an error.
     */
    "roleRef": IIoK8sApiRbacV1beta1RoleRef;
    /**
     * Subjects holds references to the objects the role applies to.
     */
    "subjects"?: Array<IIoK8sApiRbacV1beta1Subject>;
}
/**
 * RoleBinding references a role, but does not contain it.  It can reference a Role in the same namespace or a ClusterRole in the global namespace. It adds who information via Subjects and namespace information by which namespace it exists in.  RoleBindings in a given namespace only have effect in that namespace. Deprecated in v1.17 in favor of rbac.authorization.k8s.io/v1 RoleBinding, and will no longer be served in v1.22.
 * @deprecated
 */
export declare class RoleBinding extends Model<IRoleBinding> implements IRoleBinding {
    "apiVersion": IRoleBinding["apiVersion"];
    "kind": IRoleBinding["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "roleRef": IIoK8sApiRbacV1beta1RoleRef;
    "subjects"?: Array<IIoK8sApiRbacV1beta1Subject>;
    static apiVersion: IRoleBinding["apiVersion"];
    static kind: IRoleBinding["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IRoleBinding>;
    constructor(data?: ModelData<IRoleBinding>);
}
export { IRoleBinding as IIoK8sApiRbacV1beta1RoleBinding, RoleBinding as IoK8sApiRbacV1beta1RoleBinding };
