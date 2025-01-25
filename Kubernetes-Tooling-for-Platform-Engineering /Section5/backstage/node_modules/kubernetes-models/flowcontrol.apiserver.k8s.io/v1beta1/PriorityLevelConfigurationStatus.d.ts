import { IIoK8sApiFlowcontrolV1beta1PriorityLevelConfigurationCondition } from "./PriorityLevelConfigurationCondition";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PriorityLevelConfigurationStatus represents the current state of a "request-priority".
 */
export interface IPriorityLevelConfigurationStatus {
    /**
     * `conditions` is the current state of "request-priority".
     */
    "conditions"?: Array<IIoK8sApiFlowcontrolV1beta1PriorityLevelConfigurationCondition>;
}
/**
 * PriorityLevelConfigurationStatus represents the current state of a "request-priority".
 */
export declare class PriorityLevelConfigurationStatus extends Model<IPriorityLevelConfigurationStatus> implements IPriorityLevelConfigurationStatus {
    "conditions"?: Array<IIoK8sApiFlowcontrolV1beta1PriorityLevelConfigurationCondition>;
    constructor(data?: ModelData<IPriorityLevelConfigurationStatus>);
}
export { IPriorityLevelConfigurationStatus as IIoK8sApiFlowcontrolV1beta1PriorityLevelConfigurationStatus, PriorityLevelConfigurationStatus as IoK8sApiFlowcontrolV1beta1PriorityLevelConfigurationStatus };
