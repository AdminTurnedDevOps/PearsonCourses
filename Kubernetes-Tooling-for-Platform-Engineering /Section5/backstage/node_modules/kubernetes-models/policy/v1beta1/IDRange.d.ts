import { ModelData, Model } from "@kubernetes-models/base";
/**
 * IDRange provides a min/max of an allowed range of IDs.
 */
export interface IIDRange {
    /**
     * max is the end of the range, inclusive.
     */
    "max": number;
    /**
     * min is the start of the range, inclusive.
     */
    "min": number;
}
/**
 * IDRange provides a min/max of an allowed range of IDs.
 */
export declare class IDRange extends Model<IIDRange> implements IIDRange {
    "max": number;
    "min": number;
    constructor(data?: ModelData<IIDRange>);
}
export { IIDRange as IIoK8sApiPolicyV1beta1IDRange, IDRange as IoK8sApiPolicyV1beta1IDRange };
