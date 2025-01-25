import { ModelData, Model } from "@kubernetes-models/base";
/**
 * HPAScalingPolicy is a single policy which must hold true for a specified past interval.
 */
export interface IHPAScalingPolicy {
    /**
     * periodSeconds specifies the window of time for which the policy should hold true. PeriodSeconds must be greater than zero and less than or equal to 1800 (30 min).
     */
    "periodSeconds": number;
    /**
     * type is used to specify the scaling policy.
     */
    "type": string;
    /**
     * value contains the amount of change which is permitted by the policy. It must be greater than zero
     */
    "value": number;
}
/**
 * HPAScalingPolicy is a single policy which must hold true for a specified past interval.
 */
export declare class HPAScalingPolicy extends Model<IHPAScalingPolicy> implements IHPAScalingPolicy {
    "periodSeconds": number;
    "type": string;
    "value": number;
    constructor(data?: ModelData<IHPAScalingPolicy>);
}
export { IHPAScalingPolicy as IIoK8sApiAutoscalingV2HPAScalingPolicy, HPAScalingPolicy as IoK8sApiAutoscalingV2HPAScalingPolicy };
