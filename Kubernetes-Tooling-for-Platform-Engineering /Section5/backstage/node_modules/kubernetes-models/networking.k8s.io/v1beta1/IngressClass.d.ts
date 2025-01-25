import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiNetworkingV1beta1IngressClassSpec } from "./IngressClassSpec";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * IngressClass represents the class of the Ingress, referenced by the Ingress Spec. The `ingressclass.kubernetes.io/is-default-class` annotation can be used to indicate that an IngressClass should be considered default. When a single IngressClass resource has this annotation set to true, new Ingress resources without a class specified will be assigned this default class.
 */
export interface IIngressClass extends TypeMeta {
    "apiVersion": "networking.k8s.io/v1beta1";
    "kind": "IngressClass";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec is the desired state of the IngressClass. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiNetworkingV1beta1IngressClassSpec;
}
/**
 * IngressClass represents the class of the Ingress, referenced by the Ingress Spec. The `ingressclass.kubernetes.io/is-default-class` annotation can be used to indicate that an IngressClass should be considered default. When a single IngressClass resource has this annotation set to true, new Ingress resources without a class specified will be assigned this default class.
 */
export declare class IngressClass extends Model<IIngressClass> implements IIngressClass {
    "apiVersion": IIngressClass["apiVersion"];
    "kind": IIngressClass["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiNetworkingV1beta1IngressClassSpec;
    static apiVersion: IIngressClass["apiVersion"];
    static kind: IIngressClass["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IIngressClass>;
    constructor(data?: ModelData<IIngressClass>);
}
export { IIngressClass as IIoK8sApiNetworkingV1beta1IngressClass, IngressClass as IoK8sApiNetworkingV1beta1IngressClass };
