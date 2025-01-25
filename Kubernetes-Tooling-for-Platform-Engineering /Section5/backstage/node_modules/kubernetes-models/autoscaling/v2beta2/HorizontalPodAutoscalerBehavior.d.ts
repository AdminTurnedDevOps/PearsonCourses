import { IIoK8sApiAutoscalingV2beta2HPAScalingRules } from "./HPAScalingRules";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * HorizontalPodAutoscalerBehavior configures the scaling behavior of the target in both Up and Down directions (scaleUp and scaleDown fields respectively).
 */
export interface IHorizontalPodAutoscalerBehavior {
    /**
     * scaleDown is scaling policy for scaling Down. If not set, the default value is to allow to scale down to minReplicas pods, with a 300 second stabilization window (i.e., the highest recommendation for the last 300sec is used).
     */
    "scaleDown"?: IIoK8sApiAutoscalingV2beta2HPAScalingRules;
    /**
     * scaleUp is scaling policy for scaling Up. If not set, the default value is the higher of:
     *   \* increase no more than 4 pods per 60 seconds
     *   \* double the number of pods per 60 seconds
     * No stabilization is used.
     */
    "scaleUp"?: IIoK8sApiAutoscalingV2beta2HPAScalingRules;
}
/**
 * HorizontalPodAutoscalerBehavior configures the scaling behavior of the target in both Up and Down directions (scaleUp and scaleDown fields respectively).
 */
export declare class HorizontalPodAutoscalerBehavior extends Model<IHorizontalPodAutoscalerBehavior> implements IHorizontalPodAutoscalerBehavior {
    "scaleDown"?: IIoK8sApiAutoscalingV2beta2HPAScalingRules;
    "scaleUp"?: IIoK8sApiAutoscalingV2beta2HPAScalingRules;
    constructor(data?: ModelData<IHorizontalPodAutoscalerBehavior>);
}
export { IHorizontalPodAutoscalerBehavior as IIoK8sApiAutoscalingV2beta2HorizontalPodAutoscalerBehavior, HorizontalPodAutoscalerBehavior as IoK8sApiAutoscalingV2beta2HorizontalPodAutoscalerBehavior };
