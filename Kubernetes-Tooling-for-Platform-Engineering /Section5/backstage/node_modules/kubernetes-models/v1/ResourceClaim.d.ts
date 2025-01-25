import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ResourceClaim references one entry in PodSpec.ResourceClaims.
 */
export interface IResourceClaim {
    /**
     * Name must match the name of one entry in pod.spec.resourceClaims of the Pod where this field is used. It makes that resource available inside a container.
     */
    "name": string;
}
/**
 * ResourceClaim references one entry in PodSpec.ResourceClaims.
 */
export declare class ResourceClaim extends Model<IResourceClaim> implements IResourceClaim {
    "name": string;
    constructor(data?: ModelData<IResourceClaim>);
}
export { IResourceClaim as IIoK8sApiCoreV1ResourceClaim, ResourceClaim as IoK8sApiCoreV1ResourceClaim };
