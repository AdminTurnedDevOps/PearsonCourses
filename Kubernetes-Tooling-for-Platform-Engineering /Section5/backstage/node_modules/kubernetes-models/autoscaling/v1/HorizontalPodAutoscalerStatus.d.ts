import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * current status of a horizontal pod autoscaler
 */
export interface IHorizontalPodAutoscalerStatus {
    /**
     * currentCPUUtilizationPercentage is the current average CPU utilization over all pods, represented as a percentage of requested CPU, e.g. 70 means that an average pod is using now 70% of its requested CPU.
     */
    "currentCPUUtilizationPercentage"?: number;
    /**
     * currentReplicas is the current number of replicas of pods managed by this autoscaler.
     */
    "currentReplicas": number;
    /**
     * desiredReplicas is the  desired number of replicas of pods managed by this autoscaler.
     */
    "desiredReplicas": number;
    /**
     * lastScaleTime is the last time the HorizontalPodAutoscaler scaled the number of pods; used by the autoscaler to control how often the number of pods is changed.
     */
    "lastScaleTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * observedGeneration is the most recent generation observed by this autoscaler.
     */
    "observedGeneration"?: number;
}
/**
 * current status of a horizontal pod autoscaler
 */
export declare class HorizontalPodAutoscalerStatus extends Model<IHorizontalPodAutoscalerStatus> implements IHorizontalPodAutoscalerStatus {
    "currentCPUUtilizationPercentage"?: number;
    "currentReplicas": number;
    "desiredReplicas": number;
    "lastScaleTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "observedGeneration"?: number;
    constructor(data?: ModelData<IHorizontalPodAutoscalerStatus>);
}
export { IHorizontalPodAutoscalerStatus as IIoK8sApiAutoscalingV1HorizontalPodAutoscalerStatus, HorizontalPodAutoscalerStatus as IoK8sApiAutoscalingV1HorizontalPodAutoscalerStatus };
