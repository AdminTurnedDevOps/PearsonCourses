import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { IIoK8sApiAutoscalingV2beta1CrossVersionObjectReference } from "./CrossVersionObjectReference";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ObjectMetricSource indicates how to scale on a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).
 */
export interface IObjectMetricSource {
    /**
     * averageValue is the target value of the average of the metric across all relevant pods (as a quantity)
     */
    "averageValue"?: IIoK8sApimachineryPkgApiResourceQuantity;
    /**
     * metricName is the name of the metric in question.
     */
    "metricName": string;
    /**
     * selector is the string-encoded form of a standard kubernetes label selector for the given metric When set, it is passed as an additional parameter to the metrics server for more specific metrics scoping When unset, just the metricName will be used to gather metrics.
     */
    "selector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * target is the described Kubernetes object.
     */
    "target": IIoK8sApiAutoscalingV2beta1CrossVersionObjectReference;
    /**
     * targetValue is the target value of the metric (as a quantity).
     */
    "targetValue": IIoK8sApimachineryPkgApiResourceQuantity;
}
/**
 * ObjectMetricSource indicates how to scale on a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).
 */
export declare class ObjectMetricSource extends Model<IObjectMetricSource> implements IObjectMetricSource {
    "averageValue"?: IIoK8sApimachineryPkgApiResourceQuantity;
    "metricName": string;
    "selector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "target": IIoK8sApiAutoscalingV2beta1CrossVersionObjectReference;
    "targetValue": IIoK8sApimachineryPkgApiResourceQuantity;
    constructor(data?: ModelData<IObjectMetricSource>);
}
export { IObjectMetricSource as IIoK8sApiAutoscalingV2beta1ObjectMetricSource, ObjectMetricSource as IoK8sApiAutoscalingV2beta1ObjectMetricSource };
