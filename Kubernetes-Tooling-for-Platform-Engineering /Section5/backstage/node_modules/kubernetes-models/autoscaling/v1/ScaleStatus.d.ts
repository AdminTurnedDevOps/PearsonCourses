import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ScaleStatus represents the current status of a scale subresource.
 */
export interface IScaleStatus {
    /**
     * replicas is the actual number of observed instances of the scaled object.
     */
    "replicas": number;
    /**
     * selector is the label query over pods that should match the replicas count. This is same as the label selector but in the string format to avoid introspection by clients. The string will be in the same format as the query-param syntax. More info about label selectors: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
     */
    "selector"?: string;
}
/**
 * ScaleStatus represents the current status of a scale subresource.
 */
export declare class ScaleStatus extends Model<IScaleStatus> implements IScaleStatus {
    "replicas": number;
    "selector"?: string;
    constructor(data?: ModelData<IScaleStatus>);
}
export { IScaleStatus as IIoK8sApiAutoscalingV1ScaleStatus, ScaleStatus as IoK8sApiAutoscalingV1ScaleStatus };
