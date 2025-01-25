import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ExternalMetricSource indicates how to scale on a metric not associated with any Kubernetes object (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster). Exactly one "target" type should be set.
 */
export interface IExternalMetricSource {
    /**
     * metricName is the name of the metric in question.
     */
    "metricName": string;
    /**
     * metricSelector is used to identify a specific time series within a given metric.
     */
    "metricSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * targetAverageValue is the target per-pod value of global metric (as a quantity). Mutually exclusive with TargetValue.
     */
    "targetAverageValue"?: IIoK8sApimachineryPkgApiResourceQuantity;
    /**
     * targetValue is the target value of the metric (as a quantity). Mutually exclusive with TargetAverageValue.
     */
    "targetValue"?: IIoK8sApimachineryPkgApiResourceQuantity;
}
/**
 * ExternalMetricSource indicates how to scale on a metric not associated with any Kubernetes object (for example length of queue in cloud messaging service, or QPS from loadbalancer running outside of cluster). Exactly one "target" type should be set.
 */
export declare class ExternalMetricSource extends Model<IExternalMetricSource> implements IExternalMetricSource {
    "metricName": string;
    "metricSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "targetAverageValue"?: IIoK8sApimachineryPkgApiResourceQuantity;
    "targetValue"?: IIoK8sApimachineryPkgApiResourceQuantity;
    constructor(data?: ModelData<IExternalMetricSource>);
}
export { IExternalMetricSource as IIoK8sApiAutoscalingV2beta1ExternalMetricSource, ExternalMetricSource as IoK8sApiAutoscalingV2beta1ExternalMetricSource };
