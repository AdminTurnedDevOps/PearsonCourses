import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ExternalMetricStatus indicates the current value of a global metric not associated with any Kubernetes object.
 */
export interface IExternalMetricStatus {
    /**
     * currentAverageValue is the current value of metric averaged over autoscaled pods.
     */
    "currentAverageValue"?: IIoK8sApimachineryPkgApiResourceQuantity;
    /**
     * currentValue is the current value of the metric (as a quantity)
     */
    "currentValue": IIoK8sApimachineryPkgApiResourceQuantity;
    /**
     * metricName is the name of a metric used for autoscaling in metric system.
     */
    "metricName": string;
    /**
     * metricSelector is used to identify a specific time series within a given metric.
     */
    "metricSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
}
/**
 * ExternalMetricStatus indicates the current value of a global metric not associated with any Kubernetes object.
 */
export declare class ExternalMetricStatus extends Model<IExternalMetricStatus> implements IExternalMetricStatus {
    "currentAverageValue"?: IIoK8sApimachineryPkgApiResourceQuantity;
    "currentValue": IIoK8sApimachineryPkgApiResourceQuantity;
    "metricName": string;
    "metricSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    constructor(data?: ModelData<IExternalMetricStatus>);
}
export { IExternalMetricStatus as IIoK8sApiAutoscalingV2beta1ExternalMetricStatus, ExternalMetricStatus as IoK8sApiAutoscalingV2beta1ExternalMetricStatus };
