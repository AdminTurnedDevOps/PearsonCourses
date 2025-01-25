import { IIoK8sApiAutoscalingV2beta2MetricValueStatus } from "./MetricValueStatus";
import { IIoK8sApiAutoscalingV2beta2MetricIdentifier } from "./MetricIdentifier";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ExternalMetricStatus indicates the current value of a global metric not associated with any Kubernetes object.
 */
export interface IExternalMetricStatus {
    /**
     * current contains the current value for the given metric
     */
    "current": IIoK8sApiAutoscalingV2beta2MetricValueStatus;
    /**
     * metric identifies the target metric by name and selector
     */
    "metric": IIoK8sApiAutoscalingV2beta2MetricIdentifier;
}
/**
 * ExternalMetricStatus indicates the current value of a global metric not associated with any Kubernetes object.
 */
export declare class ExternalMetricStatus extends Model<IExternalMetricStatus> implements IExternalMetricStatus {
    "current": IIoK8sApiAutoscalingV2beta2MetricValueStatus;
    "metric": IIoK8sApiAutoscalingV2beta2MetricIdentifier;
    constructor(data?: ModelData<IExternalMetricStatus>);
}
export { IExternalMetricStatus as IIoK8sApiAutoscalingV2beta2ExternalMetricStatus, ExternalMetricStatus as IoK8sApiAutoscalingV2beta2ExternalMetricStatus };
