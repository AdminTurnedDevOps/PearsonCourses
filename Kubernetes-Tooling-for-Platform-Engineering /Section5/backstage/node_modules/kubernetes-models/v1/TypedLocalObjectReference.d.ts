import { ModelData, Model } from "@kubernetes-models/base";
/**
 * TypedLocalObjectReference contains enough information to let you locate the typed referenced object inside the same namespace.
 */
export interface ITypedLocalObjectReference {
    /**
     * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
     */
    "apiGroup"?: string;
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
 * TypedLocalObjectReference contains enough information to let you locate the typed referenced object inside the same namespace.
 */
export declare class TypedLocalObjectReference extends Model<ITypedLocalObjectReference> implements ITypedLocalObjectReference {
    "apiGroup"?: string;
    "kind": ITypedLocalObjectReference["kind"];
    "name": string;
    constructor(data?: ModelData<ITypedLocalObjectReference>);
}
export { ITypedLocalObjectReference as IIoK8sApiCoreV1TypedLocalObjectReference, TypedLocalObjectReference as IoK8sApiCoreV1TypedLocalObjectReference };
