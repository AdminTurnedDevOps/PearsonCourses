import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ScaleStatus represents the current status of a scale subresource.
 */
export interface IScaleStatus {
    /**
     * actual number of observed instances of the scaled object.
     */
    "replicas": number;
    /**
     * label query over pods that should match the replicas count. More info: http://kubernetes.io/docs/user-guide/labels#label-selectors
     */
    "selector"?: {
        [key: string]: string;
    };
    /**
     * label selector for pods that should match the replicas count. This is a serializated version of both map-based and more expressive set-based selectors. This is done to avoid introspection in the clients. The string will be in the same format as the query-param syntax. If the target type only supports map-based selectors, both this field and map-based selector field are populated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
     */
    "targetSelector"?: string;
}
/**
 * ScaleStatus represents the current status of a scale subresource.
 */
export declare class ScaleStatus extends Model<IScaleStatus> implements IScaleStatus {
    "replicas": number;
    "selector"?: {
        [key: string]: string;
    };
    "targetSelector"?: string;
    constructor(data?: ModelData<IScaleStatus>);
}
export { IScaleStatus as IIoK8sApiAppsV1beta2ScaleStatus, ScaleStatus as IoK8sApiAppsV1beta2ScaleStatus };
