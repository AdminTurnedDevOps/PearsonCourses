import { IIoK8sApiAutoscalingV2MetricValueStatus } from "./MetricValueStatus";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ResourceMetricStatus indicates the current value of a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.
 */
export interface IResourceMetricStatus {
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
 * ResourceMetricStatus indicates the current value of a resource metric known to Kubernetes, as specified in requests and limits, describing each pod in the current scale target (e.g. CPU or memory).  Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.
 */
export declare class ResourceMetricStatus extends Model<IResourceMetricStatus> implements IResourceMetricStatus {
    "current": IIoK8sApiAutoscalingV2MetricValueStatus;
    "name": string;
    constructor(data?: ModelData<IResourceMetricStatus>);
}
export { IResourceMetricStatus as IIoK8sApiAutoscalingV2ResourceMetricStatus, ResourceMetricStatus as IoK8sApiAutoscalingV2ResourceMetricStatus };
