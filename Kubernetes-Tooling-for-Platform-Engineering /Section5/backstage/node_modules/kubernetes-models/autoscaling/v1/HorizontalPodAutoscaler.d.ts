import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAutoscalingV1HorizontalPodAutoscalerSpec } from "./HorizontalPodAutoscalerSpec";
import { IIoK8sApiAutoscalingV1HorizontalPodAutoscalerStatus } from "./HorizontalPodAutoscalerStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * configuration of a horizontal pod autoscaler.
 */
export interface IHorizontalPodAutoscaler extends TypeMeta {
    "apiVersion": "autoscaling/v1";
    "kind": "HorizontalPodAutoscaler";
    /**
     * Standard object metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * spec defines the behaviour of autoscaler. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status.
     */
    "spec"?: IIoK8sApiAutoscalingV1HorizontalPodAutoscalerSpec;
    /**
     * status is the current information about the autoscaler.
     */
    "status"?: IIoK8sApiAutoscalingV1HorizontalPodAutoscalerStatus;
}
/**
 * configuration of a horizontal pod autoscaler.
 */
export declare class HorizontalPodAutoscaler extends Model<IHorizontalPodAutoscaler> implements IHorizontalPodAutoscaler {
    "apiVersion": IHorizontalPodAutoscaler["apiVersion"];
    "kind": IHorizontalPodAutoscaler["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiAutoscalingV1HorizontalPodAutoscalerSpec;
    "status"?: IIoK8sApiAutoscalingV1HorizontalPodAutoscalerStatus;
    static apiVersion: IHorizontalPodAutoscaler["apiVersion"];
    static kind: IHorizontalPodAutoscaler["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IHorizontalPodAutoscaler>;
    constructor(data?: ModelData<IHorizontalPodAutoscaler>);
}
export { IHorizontalPodAutoscaler as IIoK8sApiAutoscalingV1HorizontalPodAutoscaler, HorizontalPodAutoscaler as IoK8sApiAutoscalingV1HorizontalPodAutoscaler };
