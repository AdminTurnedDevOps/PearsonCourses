import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * MetricIdentifier defines the name and optionally selector for a metric
 */
export interface IMetricIdentifier {
    /**
     * name is the name of the given metric
     */
    "name": string;
    /**
     * selector is the string-encoded form of a standard kubernetes label selector for the given metric When set, it is passed as an additional parameter to the metrics server for more specific metrics scoping. When unset, just the metricName will be used to gather metrics.
     */
    "selector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
}
/**
 * MetricIdentifier defines the name and optionally selector for a metric
 */
export declare class MetricIdentifier extends Model<IMetricIdentifier> implements IMetricIdentifier {
    "name": string;
    "selector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    constructor(data?: ModelData<IMetricIdentifier>);
}
export { IMetricIdentifier as IIoK8sApiAutoscalingV2MetricIdentifier, MetricIdentifier as IoK8sApiAutoscalingV2MetricIdentifier };
