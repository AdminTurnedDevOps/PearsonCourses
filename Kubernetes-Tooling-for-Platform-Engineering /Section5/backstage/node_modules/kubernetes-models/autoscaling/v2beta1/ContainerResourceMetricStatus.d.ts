import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ContainerResourceMetricStatus indicates the current value of a resource metric known to Kubernetes, as specified in requests and limits, describing a single container in each pod in the current scale target (e.g. CPU or memory).  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.
 */
export interface IContainerResourceMetricStatus {
    /**
     * container is the name of the container in the pods of the scaling target
     */
    "container": string;
    /**
     * currentAverageUtilization is the current value of the average of the resource metric across all relevant pods, represented as a percentage of the requested value of the resource for the pods.  It will only be present if `targetAverageValue` was set in the corresponding metric specification.
     */
    "currentAverageUtilization"?: number;
    /**
     * currentAverageValue is the current value of the average of the resource metric across all relevant pods, as a raw value (instead of as a percentage of the request), similar to the "pods" metric source type. It will always be set, regardless of the corresponding metric specification.
     */
    "currentAverageValue": IIoK8sApimachineryPkgApiResourceQuantity;
    /**
     * name is the name of the resource in question.
     */
    "name": string;
}
/**
 * ContainerResourceMetricStatus indicates the current value of a resource metric known to Kubernetes, as specified in requests and limits, describing a single container in each pod in the current scale target (e.g. CPU or memory).  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.
 */
export declare class ContainerResourceMetricStatus extends Model<IContainerResourceMetricStatus> implements IContainerResourceMetricStatus {
    "container": string;
    "currentAverageUtilization"?: number;
    "currentAverageValue": IIoK8sApimachineryPkgApiResourceQuantity;
    "name": string;
    constructor(data?: ModelData<IContainerResourceMetricStatus>);
}
export { IContainerResourceMetricStatus as IIoK8sApiAutoscalingV2beta1ContainerResourceMetricStatus, ContainerResourceMetricStatus as IoK8sApiAutoscalingV2beta1ContainerResourceMetricStatus };
