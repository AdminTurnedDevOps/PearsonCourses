import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiNetworkingV1beta1IngressSpec } from "./IngressSpec";
import { IIoK8sApiNetworkingV1beta1IngressStatus } from "./IngressStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc.
 */
export interface IIngress extends TypeMeta {
    "apiVersion": "networking.k8s.io/v1beta1";
    "kind": "Ingress";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec is the desired state of the Ingress. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiNetworkingV1beta1IngressSpec;
    /**
     * Status is the current state of the Ingress. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "status"?: IIoK8sApiNetworkingV1beta1IngressStatus;
}
/**
 * Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc.
 */
export declare class Ingress extends Model<IIngress> implements IIngress {
    "apiVersion": IIngress["apiVersion"];
    "kind": IIngress["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiNetworkingV1beta1IngressSpec;
    "status"?: IIoK8sApiNetworkingV1beta1IngressStatus;
    static apiVersion: IIngress["apiVersion"];
    static kind: IIngress["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IIngress>;
    constructor(data?: ModelData<IIngress>);
}
export { IIngress as IIoK8sApiNetworkingV1beta1Ingress, Ingress as IoK8sApiNetworkingV1beta1Ingress };
