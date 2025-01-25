import { IIoK8sApiRbacV1beta1ClusterRoleBinding } from "./ClusterRoleBinding";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ClusterRoleBindingList is a collection of ClusterRoleBindings. Deprecated in v1.17 in favor of rbac.authorization.k8s.io/v1 ClusterRoleBindingList, and will no longer be served in v1.22.
 * @deprecated
 */
export interface IClusterRoleBindingList extends TypeMeta {
    "apiVersion": "rbac.authorization.k8s.io/v1beta1";
    /**
     * Items is a list of ClusterRoleBindings
     */
    "items": Array<IIoK8sApiRbacV1beta1ClusterRoleBinding>;
    "kind": "ClusterRoleBindingList";
    /**
     * Standard object's metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * ClusterRoleBindingList is a collection of ClusterRoleBindings. Deprecated in v1.17 in favor of rbac.authorization.k8s.io/v1 ClusterRoleBindingList, and will no longer be served in v1.22.
 * @deprecated
 */
export declare class ClusterRoleBindingList extends Model<IClusterRoleBindingList> implements IClusterRoleBindingList {
    "apiVersion": IClusterRoleBindingList["apiVersion"];
    "items": Array<IIoK8sApiRbacV1beta1ClusterRoleBinding>;
    "kind": IClusterRoleBindingList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IClusterRoleBindingList["apiVersion"];
    static kind: IClusterRoleBindingList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IClusterRoleBindingList>;
    constructor(data?: ModelData<IClusterRoleBindingList>);
}
export { IClusterRoleBindingList as IIoK8sApiRbacV1beta1ClusterRoleBindingList, ClusterRoleBindingList as IoK8sApiRbacV1beta1ClusterRoleBindingList };
