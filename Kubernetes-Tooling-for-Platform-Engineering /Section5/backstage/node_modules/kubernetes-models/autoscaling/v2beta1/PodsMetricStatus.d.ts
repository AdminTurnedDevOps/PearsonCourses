import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodsMetricStatus indicates the current value of a metric describing each pod in the current scale target (for example, transactions-processed-per-second).
 */
export interface IPodsMetricStatus {
    /**
     * currentAverageValue is the current value of the average of the metric across all relevant pods (as a quantity)
     */
    "currentAverageValue": IIoK8sApimachineryPkgApiResourceQuantity;
    /**
     * metricName is the name of the metric in question
     */
    "metricName": string;
    /**
     * selector is the string-encoded form of a standard kubernetes label selector for the given metric When set in the PodsMetricSource, it is passed as an additional parameter to the metrics server for more specific metrics scoping. When unset, just the metricName will be used to gather metrics.
     */
    "selector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
}
/**
 * PodsMetricStatus indicates the current value of a metric describing each pod in the current scale target (for example, transactions-processed-per-second).
 */
export declare class PodsMetricStatus extends Model<IPodsMetricStatus> implements IPodsMetricStatus {
    "currentAverageValue": IIoK8sApimachineryPkgApiResourceQuantity;
    "metricName": string;
    "selector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    constructor(data?: ModelData<IPodsMetricStatus>);
}
export { IPodsMetricStatus as IIoK8sApiAutoscalingV2beta1PodsMetricStatus, PodsMetricStatus as IoK8sApiAutoscalingV2beta1PodsMetricStatus };
