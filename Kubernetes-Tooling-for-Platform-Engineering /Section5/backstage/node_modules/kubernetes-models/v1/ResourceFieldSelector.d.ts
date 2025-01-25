import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ResourceFieldSelector represents container resources (cpu, memory) and their output format
 */
export interface IResourceFieldSelector {
    /**
     * Container name: required for volumes, optional for env vars
     */
    "containerName"?: string;
    /**
     * Specifies the output format of the exposed resources, defaults to "1"
     */
    "divisor"?: IIoK8sApimachineryPkgApiResourceQuantity;
    /**
     * Required: resource to select
     */
    "resource": string;
}
/**
 * ResourceFieldSelector represents container resources (cpu, memory) and their output format
 */
export declare class ResourceFieldSelector extends Model<IResourceFieldSelector> implements IResourceFieldSelector {
    "containerName"?: string;
    "divisor"?: IIoK8sApimachineryPkgApiResourceQuantity;
    "resource": string;
    constructor(data?: ModelData<IResourceFieldSelector>);
}
export { IResourceFieldSelector as IIoK8sApiCoreV1ResourceFieldSelector, ResourceFieldSelector as IoK8sApiCoreV1ResourceFieldSelector };
