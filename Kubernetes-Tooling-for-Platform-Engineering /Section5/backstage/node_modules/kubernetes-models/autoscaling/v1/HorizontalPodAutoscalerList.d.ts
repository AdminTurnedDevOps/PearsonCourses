import { IIoK8sApiAutoscalingV1HorizontalPodAutoscaler } from "./HorizontalPodAutoscaler";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * list of horizontal pod autoscaler objects.
 */
export interface IHorizontalPodAutoscalerList extends TypeMeta {
    "apiVersion": "autoscaling/v1";
    /**
     * items is the list of horizontal pod autoscaler objects.
     */
    "items": Array<IIoK8sApiAutoscalingV1HorizontalPodAutoscaler>;
    "kind": "HorizontalPodAutoscalerList";
    /**
     * Standard list metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * list of horizontal pod autoscaler objects.
 */
export declare class HorizontalPodAutoscalerList extends Model<IHorizontalPodAutoscalerList> implements IHorizontalPodAutoscalerList {
    "apiVersion": IHorizontalPodAutoscalerList["apiVersion"];
    "items": Array<IIoK8sApiAutoscalingV1HorizontalPodAutoscaler>;
    "kind": IHorizontalPodAutoscalerList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IHorizontalPodAutoscalerList["apiVersion"];
    static kind: IHorizontalPodAutoscalerList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IHorizontalPodAutoscalerList>;
    constructor(data?: ModelData<IHorizontalPodAutoscalerList>);
}
export { IHorizontalPodAutoscalerList as IIoK8sApiAutoscalingV1HorizontalPodAutoscalerList, HorizontalPodAutoscalerList as IoK8sApiAutoscalingV1HorizontalPodAutoscalerList };
