import { IIoK8sApiCoreV1ResourceClaim } from "./ResourceClaim";
import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ResourceRequirements describes the compute resource requirements.
 */
export interface IResourceRequirements {
    /**
     * Claims lists the names of resources, defined in spec.resourceClaims, that are used by this container.
     *
     * This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.
     *
     * This field is immutable. It can only be set for containers.
     */
    "claims"?: Array<IIoK8sApiCoreV1ResourceClaim>;
    /**
     * Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     */
    "limits"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. Requests cannot exceed Limits. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     */
    "requests"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
}
/**
 * ResourceRequirements describes the compute resource requirements.
 */
export declare class ResourceRequirements extends Model<IResourceRequirements> implements IResourceRequirements {
    "claims"?: Array<IIoK8sApiCoreV1ResourceClaim>;
    "limits"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "requests"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    constructor(data?: ModelData<IResourceRequirements>);
}
export { IResourceRequirements as IIoK8sApiCoreV1ResourceRequirements, ResourceRequirements as IoK8sApiCoreV1ResourceRequirements };
