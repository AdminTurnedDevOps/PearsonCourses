import { IIoK8sApiAutoscalingV2beta2MetricIdentifier } from "./MetricIdentifier";
import { IIoK8sApiAutoscalingV2beta2MetricTarget } from "./MetricTarget";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodsMetricSource indicates how to scale on a metric describing each pod in the current scale target (for example, transactions-processed-per-second). The values will be averaged together before being compared to the target value.
 */
export interface IPodsMetricSource {
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
 * PodsMetricSource indicates how to scale on a metric describing each pod in the current scale target (for example, transactions-processed-per-second). The values will be averaged together before being compared to the target value.
 */
export declare class PodsMetricSource extends Model<IPodsMetricSource> implements IPodsMetricSource {
    "metric": IIoK8sApiAutoscalingV2beta2MetricIdentifier;
    "target": IIoK8sApiAutoscalingV2beta2MetricTarget;
    constructor(data?: ModelData<IPodsMetricSource>);
}
export { IPodsMetricSource as IIoK8sApiAutoscalingV2beta2PodsMetricSource, PodsMetricSource as IoK8sApiAutoscalingV2beta2PodsMetricSource };
