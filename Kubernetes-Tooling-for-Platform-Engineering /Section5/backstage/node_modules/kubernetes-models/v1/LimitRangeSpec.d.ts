import { IIoK8sApiCoreV1LimitRangeItem } from "./LimitRangeItem";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * LimitRangeSpec defines a min/max usage limit for resources that match on kind.
 */
export interface ILimitRangeSpec {
    /**
     * Limits is the list of LimitRangeItem objects that are enforced.
     */
    "limits": Array<IIoK8sApiCoreV1LimitRangeItem>;
}
/**
 * LimitRangeSpec defines a min/max usage limit for resources that match on kind.
 */
export declare class LimitRangeSpec extends Model<ILimitRangeSpec> implements ILimitRangeSpec {
    "limits": Array<IIoK8sApiCoreV1LimitRangeItem>;
    constructor(data?: ModelData<ILimitRangeSpec>);
}
export { ILimitRangeSpec as IIoK8sApiCoreV1LimitRangeSpec, LimitRangeSpec as IoK8sApiCoreV1LimitRangeSpec };
