import { IIoK8sApiAutoscalingV2beta2ContainerResourceMetricStatus } from "./ContainerResourceMetricStatus";
import { IIoK8sApiAutoscalingV2beta2ExternalMetricStatus } from "./ExternalMetricStatus";
import { IIoK8sApiAutoscalingV2beta2ObjectMetricStatus } from "./ObjectMetricStatus";
import { IIoK8sApiAutoscalingV2beta2PodsMetricStatus } from "./PodsMetricStatus";
import { IIoK8sApiAutoscalingV2beta2ResourceMetricStatus } from "./ResourceMetricStatus";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * MetricStatus describes the last-read state of a single metric.
 */
export interface IMetricStatus {
    /**
     * container resource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing a single container in each pod in the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.
     */
    "containerResource"?: IIoK8sApiAutoscalingV2beta2ContainerResourceMetricStatus;
    /**
     * external refers to a global metric that is not associated with any Kubernetes object. It allows autoscaling based on information coming from components running outside of cluster (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster).
     */
    "external"?: IIoK8sApiAutoscalingV2beta2ExternalMetricStatus;
    /**
     * object refers to a metric describing a single kubernetes object (for example, hits-per-second on an Ingress object).
     */
    "object"?: IIoK8sApiAutoscalingV2beta2ObjectMetricStatus;
    /**
     * pods refers to a metric describing each pod in the current scale target (for example, transactions-processed-per-second).  The values will be averaged together before being compared to the target value.
     */
    "pods"?: IIoK8sApiAutoscalingV2beta2PodsMetricStatus;
    /**
     * resource refers to a resource metric (such as those specified in requests and limits) known to Kubernetes describing each pod in the current scale target (e.g. CPU or memory). Such metrics are built in to Kubernetes, and have special scaling options on top of those available to normal per-pod metrics using the "pods" source.
     */
    "resource"?: IIoK8sApiAutoscalingV2beta2ResourceMetricStatus;
    /**
     * type is the type of metric source.  It will be one of "ContainerResource", "External", "Object", "Pods" or "Resource", each corresponds to a matching field in the object. Note: "ContainerResource" type is available on when the feature-gate HPAContainerMetrics is enabled
     */
    "type": string;
}
/**
 * MetricStatus describes the last-read state of a single metric.
 */
export declare class MetricStatus extends Model<IMetricStatus> implements IMetricStatus {
    "containerResource"?: IIoK8sApiAutoscalingV2beta2ContainerResourceMetricStatus;
    "external"?: IIoK8sApiAutoscalingV2beta2ExternalMetricStatus;
    "object"?: IIoK8sApiAutoscalingV2beta2ObjectMetricStatus;
    "pods"?: IIoK8sApiAutoscalingV2beta2PodsMetricStatus;
    "resource"?: IIoK8sApiAutoscalingV2beta2ResourceMetricStatus;
    "type": string;
    constructor(data?: ModelData<IMetricStatus>);
}
export { IMetricStatus as IIoK8sApiAutoscalingV2beta2MetricStatus, MetricStatus as IoK8sApiAutoscalingV2beta2MetricStatus };
