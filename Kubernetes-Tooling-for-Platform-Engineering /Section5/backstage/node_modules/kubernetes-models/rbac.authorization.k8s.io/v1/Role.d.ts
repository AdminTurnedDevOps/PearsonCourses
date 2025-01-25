import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiRbacV1PolicyRule } from "./PolicyRule";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Role is a namespaced, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding.
 */
export interface IRole extends TypeMeta {
    "apiVersion": "rbac.authorization.k8s.io/v1";
    "kind": "Role";
    /**
     * Standard object's metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Rules holds all the PolicyRules for this Role
     */
    "rules"?: Array<IIoK8sApiRbacV1PolicyRule>;
}
/**
 * Role is a namespaced, logical grouping of PolicyRules that can be referenced as a unit by a RoleBinding.
 */
export declare class Role extends Model<IRole> implements IRole {
    "apiVersion": IRole["apiVersion"];
    "kind": IRole["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "rules"?: Array<IIoK8sApiRbacV1PolicyRule>;
    static apiVersion: IRole["apiVersion"];
    static kind: IRole["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IRole>;
    constructor(data?: ModelData<IRole>);
}
export { IRole as IIoK8sApiRbacV1Role, Role as IoK8sApiRbacV1Role };
