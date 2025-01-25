import { IIoK8sApiRbacV1ClusterRoleBinding } from "./ClusterRoleBinding";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ClusterRoleBindingList is a collection of ClusterRoleBindings
 */
export interface IClusterRoleBindingList extends TypeMeta {
    "apiVersion": "rbac.authorization.k8s.io/v1";
    /**
     * Items is a list of ClusterRoleBindings
     */
    "items": Array<IIoK8sApiRbacV1ClusterRoleBinding>;
    "kind": "ClusterRoleBindingList";
    /**
     * Standard object's metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * ClusterRoleBindingList is a collection of ClusterRoleBindings
 */
export declare class ClusterRoleBindingList extends Model<IClusterRoleBindingList> implements IClusterRoleBindingList {
    "apiVersion": IClusterRoleBindingList["apiVersion"];
    "items": Array<IIoK8sApiRbacV1ClusterRoleBinding>;
    "kind": IClusterRoleBindingList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IClusterRoleBindingList["apiVersion"];
    static kind: IClusterRoleBindingList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IClusterRoleBindingList>;
    constructor(data?: ModelData<IClusterRoleBindingList>);
}
export { IClusterRoleBindingList as IIoK8sApiRbacV1ClusterRoleBindingList, ClusterRoleBindingList as IoK8sApiRbacV1ClusterRoleBindingList };
