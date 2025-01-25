import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * MetricValueStatus holds the current value for a metric
 */
export interface IMetricValueStatus {
    /**
     * currentAverageUtilization is the current value of the average of the resource metric across all relevant pods, represented as a percentage of the requested value of the resource for the pods.
     */
    "averageUtilization"?: number;
    /**
     * averageValue is the current value of the average of the metric across all relevant pods (as a quantity)
     */
    "averageValue"?: IIoK8sApimachineryPkgApiResourceQuantity;
    /**
     * value is the current value of the metric (as a quantity).
     */
    "value"?: IIoK8sApimachineryPkgApiResourceQuantity;
}
/**
 * MetricValueStatus holds the current value for a metric
 */
export declare class MetricValueStatus extends Model<IMetricValueStatus> implements IMetricValueStatus {
    "averageUtilization"?: number;
    "averageValue"?: IIoK8sApimachineryPkgApiResourceQuantity;
    "value"?: IIoK8sApimachineryPkgApiResourceQuantity;
    constructor(data?: ModelData<IMetricValueStatus>);
}
export { IMetricValueStatus as IIoK8sApiAutoscalingV2MetricValueStatus, MetricValueStatus as IoK8sApiAutoscalingV2MetricValueStatus };
