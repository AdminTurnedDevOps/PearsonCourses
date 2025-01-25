import { ModelData, Model } from "@kubernetes-models/base";
/**
 * BoundObjectReference is a reference to an object that a token is bound to.
 */
export interface IBoundObjectReference {
    /**
     * API version of the referent.
     */
    "apiVersion"?: string;
    /**
     * Kind of the referent. Valid kinds are 'Pod' and 'Secret'.
     */
    "kind"?: string;
    /**
     * Name of the referent.
     */
    "name"?: string;
    /**
     * UID of the referent.
     */
    "uid"?: string;
}
/**
 * BoundObjectReference is a reference to an object that a token is bound to.
 */
export declare class BoundObjectReference extends Model<IBoundObjectReference> implements IBoundObjectReference {
    "apiVersion"?: IBoundObjectReference["apiVersion"];
    "kind"?: IBoundObjectReference["kind"];
    "name"?: string;
    "uid"?: string;
    constructor(data?: ModelData<IBoundObjectReference>);
}
export { IBoundObjectReference as IIoK8sApiAuthenticationV1BoundObjectReference, BoundObjectReference as IoK8sApiAuthenticationV1BoundObjectReference };
