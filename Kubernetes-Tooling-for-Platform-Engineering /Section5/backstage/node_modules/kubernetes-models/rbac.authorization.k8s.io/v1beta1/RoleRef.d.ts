import { ModelData, Model } from "@kubernetes-models/base";
/**
 * RoleRef contains information that points to the role being used
 */
export interface IRoleRef {
    /**
     * APIGroup is the group for the resource being referenced
     */
    "apiGroup": string;
    /**
     * Kind is the type of resource being referenced
     */
    "kind": string;
    /**
     * Name is the name of resource being referenced
     */
    "name": string;
}
/**
 * RoleRef contains information that points to the role being used
 */
export declare class RoleRef extends Model<IRoleRef> implements IRoleRef {
    "apiGroup": string;
    "kind": IRoleRef["kind"];
    "name": string;
    constructor(data?: ModelData<IRoleRef>);
}
export { IRoleRef as IIoK8sApiRbacV1beta1RoleRef, RoleRef as IoK8sApiRbacV1beta1RoleRef };
