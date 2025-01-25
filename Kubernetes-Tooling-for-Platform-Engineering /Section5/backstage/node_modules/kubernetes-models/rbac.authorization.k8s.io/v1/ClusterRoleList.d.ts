import { IIoK8sApiRbacV1ClusterRole } from "./ClusterRole";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ClusterRoleList is a collection of ClusterRoles
 */
export interface IClusterRoleList extends TypeMeta {
    "apiVersion": "rbac.authorization.k8s.io/v1";
    /**
     * Items is a list of ClusterRoles
     */
    "items": Array<IIoK8sApiRbacV1ClusterRole>;
    "kind": "ClusterRoleList";
    /**
     * Standard object's metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * ClusterRoleList is a collection of ClusterRoles
 */
export declare class ClusterRoleList extends Model<IClusterRoleList> implements IClusterRoleList {
    "apiVersion": IClusterRoleList["apiVersion"];
    "items": Array<IIoK8sApiRbacV1ClusterRole>;
    "kind": IClusterRoleList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IClusterRoleList["apiVersion"];
    static kind: IClusterRoleList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IClusterRoleList>;
    constructor(data?: ModelData<IClusterRoleList>);
}
export { IClusterRoleList as IIoK8sApiRbacV1ClusterRoleList, ClusterRoleList as IoK8sApiRbacV1ClusterRoleList };
