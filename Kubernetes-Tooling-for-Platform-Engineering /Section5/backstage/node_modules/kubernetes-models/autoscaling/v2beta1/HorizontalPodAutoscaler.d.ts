import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAutoscalingV2beta1HorizontalPodAutoscalerSpec } from "./HorizontalPodAutoscalerSpec";
import { IIoK8sApiAutoscalingV2beta1HorizontalPodAutoscalerStatus } from "./HorizontalPodAutoscalerStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * HorizontalPodAutoscaler is the configuration for a horizontal pod autoscaler, which automatically manages the replica count of any resource implementing the scale subresource based on the metrics specified.
 */
export interface IHorizontalPodAutoscaler extends TypeMeta {
    "apiVersion": "autoscaling/v2beta1";
    "kind": "HorizontalPodAutoscaler";
    /**
     * metadata is the standard object metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * spec is the specification for the behaviour of the autoscaler. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status.
     */
    "spec"?: IIoK8sApiAutoscalingV2beta1HorizontalPodAutoscalerSpec;
    /**
     * status is the current information about the autoscaler.
     */
    "status"?: IIoK8sApiAutoscalingV2beta1HorizontalPodAutoscalerStatus;
}
/**
 * HorizontalPodAutoscaler is the configuration for a horizontal pod autoscaler, which automatically manages the replica count of any resource implementing the scale subresource based on the metrics specified.
 */
export declare class HorizontalPodAutoscaler extends Model<IHorizontalPodAutoscaler> implements IHorizontalPodAutoscaler {
    "apiVersion": IHorizontalPodAutoscaler["apiVersion"];
    "kind": IHorizontalPodAutoscaler["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiAutoscalingV2beta1HorizontalPodAutoscalerSpec;
    "status"?: IIoK8sApiAutoscalingV2beta1HorizontalPodAutoscalerStatus;
    static apiVersion: IHorizontalPodAutoscaler["apiVersion"];
    static kind: IHorizontalPodAutoscaler["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IHorizontalPodAutoscaler>;
    constructor(data?: ModelData<IHorizontalPodAutoscaler>);
}
export { IHorizontalPodAutoscaler as IIoK8sApiAutoscalingV2beta1HorizontalPodAutoscaler, HorizontalPodAutoscaler as IoK8sApiAutoscalingV2beta1HorizontalPodAutoscaler };
