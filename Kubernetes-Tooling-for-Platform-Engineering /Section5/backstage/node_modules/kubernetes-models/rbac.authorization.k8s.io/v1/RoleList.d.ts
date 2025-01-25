import { IIoK8sApiRbacV1Role } from "./Role";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * RoleList is a collection of Roles
 */
export interface IRoleList extends TypeMeta {
    "apiVersion": "rbac.authorization.k8s.io/v1";
    /**
     * Items is a list of Roles
     */
    "items": Array<IIoK8sApiRbacV1Role>;
    "kind": "RoleList";
    /**
     * Standard object's metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * RoleList is a collection of Roles
 */
export declare class RoleList extends Model<IRoleList> implements IRoleList {
    "apiVersion": IRoleList["apiVersion"];
    "items": Array<IIoK8sApiRbacV1Role>;
    "kind": IRoleList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IRoleList["apiVersion"];
    static kind: IRoleList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IRoleList>;
    constructor(data?: ModelData<IRoleList>);
}
export { IRoleList as IIoK8sApiRbacV1RoleList, RoleList as IoK8sApiRbacV1RoleList };
