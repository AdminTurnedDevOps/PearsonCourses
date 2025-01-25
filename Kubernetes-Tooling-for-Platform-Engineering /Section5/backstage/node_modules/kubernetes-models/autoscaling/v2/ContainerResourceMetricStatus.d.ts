import { IIoK8sApiAutoscalingV2MetricValueStatus } from "./MetricValueStatus";
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
     * current contains the current value for the given metric
     */
    "current": IIoK8sApiAutoscalingV2MetricValueStatus;
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
    "current": IIoK8sApiAutoscalingV2MetricValueStatus;
    "name": string;
    constructor(data?: ModelData<IContainerResourceMetricStatus>);
}
export { IContainerResourceMetricStatus as IIoK8sApiAutoscalingV2ContainerResourceMetricStatus, ContainerResourceMetricStatus as IoK8sApiAutoscalingV2ContainerResourceMetricStatus };
