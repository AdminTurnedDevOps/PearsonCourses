import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1PodTemplateSpec } from "./PodTemplateSpec";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PodTemplate describes a template for creating copies of a predefined pod.
 */
export interface IPodTemplate extends TypeMeta {
    "apiVersion": "v1";
    "kind": "PodTemplate";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Template defines the pods that will be created from this pod template. https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "template"?: IIoK8sApiCoreV1PodTemplateSpec;
}
/**
 * PodTemplate describes a template for creating copies of a predefined pod.
 */
export declare class PodTemplate extends Model<IPodTemplate> implements IPodTemplate {
    "apiVersion": IPodTemplate["apiVersion"];
    "kind": IPodTemplate["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "template"?: IIoK8sApiCoreV1PodTemplateSpec;
    static apiVersion: IPodTemplate["apiVersion"];
    static kind: IPodTemplate["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPodTemplate>;
    constructor(data?: ModelData<IPodTemplate>);
}
export { IPodTemplate as IIoK8sApiCoreV1PodTemplate, PodTemplate as IoK8sApiCoreV1PodTemplate };
