import { IIoK8sApiAutoscalingV2beta2MetricValueStatus } from "./MetricValueStatus";
import { IIoK8sApiAutoscalingV2beta2MetricIdentifier } from "./MetricIdentifier";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodsMetricStatus indicates the current value of a metric describing each pod in the current scale target (for example, transactions-processed-per-second).
 */
export interface IPodsMetricStatus {
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
 * PodsMetricStatus indicates the current value of a metric describing each pod in the current scale target (for example, transactions-processed-per-second).
 */
export declare class PodsMetricStatus extends Model<IPodsMetricStatus> implements IPodsMetricStatus {
    "current": IIoK8sApiAutoscalingV2beta2MetricValueStatus;
    "metric": IIoK8sApiAutoscalingV2beta2MetricIdentifier;
    constructor(data?: ModelData<IPodsMetricStatus>);
}
export { IPodsMetricStatus as IIoK8sApiAutoscalingV2beta2PodsMetricStatus, PodsMetricStatus as IoK8sApiAutoscalingV2beta2PodsMetricStatus };
