import { ModelData, Model } from "@kubernetes-models/base";
/**
 * OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.
 */
export interface IOwnerReference {
    /**
     * API version of the referent.
     */
    "apiVersion": string;
    /**
     * If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.
     */
    "blockOwnerDeletion"?: boolean;
    /**
     * If true, this reference points to the managing controller.
     */
    "controller"?: boolean;
    /**
     * Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "kind": string;
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names
     */
    "name": string;
    /**
     * UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids
     */
    "uid": string;
}
/**
 * OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.
 */
export declare class OwnerReference extends Model<IOwnerReference> implements IOwnerReference {
    "apiVersion": IOwnerReference["apiVersion"];
    "blockOwnerDeletion"?: boolean;
    "controller"?: boolean;
    "kind": IOwnerReference["kind"];
    "name": string;
    "uid": string;
    constructor(data?: ModelData<IOwnerReference>);
}
export { IOwnerReference as IIoK8sApimachineryPkgApisMetaV1OwnerReference, OwnerReference as IoK8sApimachineryPkgApisMetaV1OwnerReference };
