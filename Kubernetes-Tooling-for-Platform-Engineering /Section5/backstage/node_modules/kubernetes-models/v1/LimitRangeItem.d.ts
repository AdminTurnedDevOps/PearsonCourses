import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * LimitRangeItem defines a min/max usage limit for any resource that matches on kind.
 */
export interface ILimitRangeItem {
    /**
     * Default resource requirement limit value by resource name if resource limit is omitted.
     */
    "default"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * DefaultRequest is the default resource requirement request value by resource name if resource request is omitted.
     */
    "defaultRequest"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * Max usage constraints on this kind by resource name.
     */
    "max"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * MaxLimitRequestRatio if specified, the named resource must have a request and limit that are both non-zero where limit divided by request is less than or equal to the enumerated value; this represents the max burst for the named resource.
     */
    "maxLimitRequestRatio"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * Min usage constraints on this kind by resource name.
     */
    "min"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * Type of resource that this limit applies to.
     */
    "type": string;
}
/**
 * LimitRangeItem defines a min/max usage limit for any resource that matches on kind.
 */
export declare class LimitRangeItem extends Model<ILimitRangeItem> implements ILimitRangeItem {
    "default"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "defaultRequest"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "max"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "maxLimitRequestRatio"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "min"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "type": string;
    constructor(data?: ModelData<ILimitRangeItem>);
}
export { ILimitRangeItem as IIoK8sApiCoreV1LimitRangeItem, LimitRangeItem as IoK8sApiCoreV1LimitRangeItem };
