import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodsMetricSource indicates how to scale on a metric describing each pod in the current scale target (for example, transactions-processed-per-second). The values will be averaged together before being compared to the target value.
 */
export interface IPodsMetricSource {
    /**
     * metricName is the name of the metric in question
     */
    "metricName": string;
    /**
     * selector is the string-encoded form of a standard kubernetes label selector for the given metric When set, it is passed as an additional parameter to the metrics server for more specific metrics scoping When unset, just the metricName will be used to gather metrics.
     */
    "selector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * targetAverageValue is the target value of the average of the metric across all relevant pods (as a quantity)
     */
    "targetAverageValue": IIoK8sApimachineryPkgApiResourceQuantity;
}
/**
 * PodsMetricSource indicates how to scale on a metric describing each pod in the current scale target (for example, transactions-processed-per-second). The values will be averaged together before being compared to the target value.
 */
export declare class PodsMetricSource extends Model<IPodsMetricSource> implements IPodsMetricSource {
    "metricName": string;
    "selector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "targetAverageValue": IIoK8sApimachineryPkgApiResourceQuantity;
    constructor(data?: ModelData<IPodsMetricSource>);
}
export { IPodsMetricSource as IIoK8sApiAutoscalingV2beta1PodsMetricSource, PodsMetricSource as IoK8sApiAutoscalingV2beta1PodsMetricSource };
