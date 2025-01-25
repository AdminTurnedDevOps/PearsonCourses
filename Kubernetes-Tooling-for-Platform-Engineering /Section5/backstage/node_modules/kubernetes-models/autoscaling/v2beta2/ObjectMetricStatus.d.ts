import { IIoK8sApiAutoscalingV2beta2MetricValueStatus } from "./MetricValueStatus";
import { IIoK8sApiAutoscalingV2beta2CrossVersionObjectReference } from "./CrossVersionObjectReference";
import { IIoK8sApiAutoscalingV2beta2MetricIdentifier } from "./MetricIdentifier";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ObjectMetricStatus indicates the current value of a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).
 */
export interface IObjectMetricStatus {
    /**
     * current contains the current value for the given metric
     */
    "current": IIoK8sApiAutoscalingV2beta2MetricValueStatus;
    "describedObject": IIoK8sApiAutoscalingV2beta2CrossVersionObjectReference;
    /**
     * metric identifies the target metric by name and selector
     */
    "metric": IIoK8sApiAutoscalingV2beta2MetricIdentifier;
}
/**
 * ObjectMetricStatus indicates the current value of a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).
 */
export declare class ObjectMetricStatus extends Model<IObjectMetricStatus> implements IObjectMetricStatus {
    "current": IIoK8sApiAutoscalingV2beta2MetricValueStatus;
    "describedObject": IIoK8sApiAutoscalingV2beta2CrossVersionObjectReference;
    "metric": IIoK8sApiAutoscalingV2beta2MetricIdentifier;
    constructor(data?: ModelData<IObjectMetricStatus>);
}
export { IObjectMetricStatus as IIoK8sApiAutoscalingV2beta2ObjectMetricStatus, ObjectMetricStatus as IoK8sApiAutoscalingV2beta2ObjectMetricStatus };
