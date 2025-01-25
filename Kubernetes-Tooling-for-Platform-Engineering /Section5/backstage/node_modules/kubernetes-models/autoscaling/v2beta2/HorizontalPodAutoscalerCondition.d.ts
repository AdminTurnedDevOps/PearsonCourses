import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * HorizontalPodAutoscalerCondition describes the state of a HorizontalPodAutoscaler at a certain point.
 */
export interface IHorizontalPodAutoscalerCondition {
    /**
     * lastTransitionTime is the last time the condition transitioned from one status to another
     */
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * message is a human-readable explanation containing details about the transition
     */
    "message"?: string;
    /**
     * reason is the reason for the condition's last transition.
     */
    "reason"?: string;
    /**
     * status is the status of the condition (True, False, Unknown)
     */
    "status": string;
    /**
     * type describes the current condition
     */
    "type": string;
}
/**
 * HorizontalPodAutoscalerCondition describes the state of a HorizontalPodAutoscaler at a certain point.
 */
export declare class HorizontalPodAutoscalerCondition extends Model<IHorizontalPodAutoscalerCondition> implements IHorizontalPodAutoscalerCondition {
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<IHorizontalPodAutoscalerCondition>);
}
export { IHorizontalPodAutoscalerCondition as IIoK8sApiAutoscalingV2beta2HorizontalPodAutoscalerCondition, HorizontalPodAutoscalerCondition as IoK8sApiAutoscalingV2beta2HorizontalPodAutoscalerCondition };
