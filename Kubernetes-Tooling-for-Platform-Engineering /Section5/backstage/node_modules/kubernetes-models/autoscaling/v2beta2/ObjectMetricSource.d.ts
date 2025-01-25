import { IIoK8sApiAutoscalingV2beta2CrossVersionObjectReference } from "./CrossVersionObjectReference";
import { IIoK8sApiAutoscalingV2beta2MetricIdentifier } from "./MetricIdentifier";
import { IIoK8sApiAutoscalingV2beta2MetricTarget } from "./MetricTarget";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ObjectMetricSource indicates how to scale on a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).
 */
export interface IObjectMetricSource {
    "describedObject": IIoK8sApiAutoscalingV2beta2CrossVersionObjectReference;
    /**
     * metric identifies the target metric by name and selector
     */
    "metric": IIoK8sApiAutoscalingV2beta2MetricIdentifier;
    /**
     * target specifies the target value for the given metric
     */
    "target": IIoK8sApiAutoscalingV2beta2MetricTarget;
}
/**
 * ObjectMetricSource indicates how to scale on a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).
 */
export declare class ObjectMetricSource extends Model<IObjectMetricSource> implements IObjectMetricSource {
    "describedObject": IIoK8sApiAutoscalingV2beta2CrossVersionObjectReference;
    "metric": IIoK8sApiAutoscalingV2beta2MetricIdentifier;
    "target": IIoK8sApiAutoscalingV2beta2MetricTarget;
    constructor(data?: ModelData<IObjectMetricSource>);
}
export { IObjectMetricSource as IIoK8sApiAutoscalingV2beta2ObjectMetricSource, ObjectMetricSource as IoK8sApiAutoscalingV2beta2ObjectMetricSource };
