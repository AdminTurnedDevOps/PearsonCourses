import { IIoK8sApiAutoscalingV2HorizontalPodAutoscaler } from "./HorizontalPodAutoscaler";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * HorizontalPodAutoscalerList is a list of horizontal pod autoscaler objects.
 */
export interface IHorizontalPodAutoscalerList extends TypeMeta {
    "apiVersion": "autoscaling/v2";
    /**
     * items is the list of horizontal pod autoscaler objects.
     */
    "items": Array<IIoK8sApiAutoscalingV2HorizontalPodAutoscaler>;
    "kind": "HorizontalPodAutoscalerList";
    /**
     * metadata is the standard list metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * HorizontalPodAutoscalerList is a list of horizontal pod autoscaler objects.
 */
export declare class HorizontalPodAutoscalerList extends Model<IHorizontalPodAutoscalerList> implements IHorizontalPodAutoscalerList {
    "apiVersion": IHorizontalPodAutoscalerList["apiVersion"];
    "items": Array<IIoK8sApiAutoscalingV2HorizontalPodAutoscaler>;
    "kind": IHorizontalPodAutoscalerList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IHorizontalPodAutoscalerList["apiVersion"];
    static kind: IHorizontalPodAutoscalerList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IHorizontalPodAutoscalerList>;
    constructor(data?: ModelData<IHorizontalPodAutoscalerList>);
}
export { IHorizontalPodAutoscalerList as IIoK8sApiAutoscalingV2HorizontalPodAutoscalerList, HorizontalPodAutoscalerList as IoK8sApiAutoscalingV2HorizontalPodAutoscalerList };
