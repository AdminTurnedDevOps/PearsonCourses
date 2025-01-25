import { IIoK8sApiNetworkingV1Ingress } from "./Ingress";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * IngressList is a collection of Ingress.
 */
export interface IIngressList extends TypeMeta {
    "apiVersion": "networking.k8s.io/v1";
    /**
     * items is the list of Ingress.
     */
    "items": Array<IIoK8sApiNetworkingV1Ingress>;
    "kind": "IngressList";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * IngressList is a collection of Ingress.
 */
export declare class IngressList extends Model<IIngressList> implements IIngressList {
    "apiVersion": IIngressList["apiVersion"];
    "items": Array<IIoK8sApiNetworkingV1Ingress>;
    "kind": IIngressList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IIngressList["apiVersion"];
    static kind: IIngressList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IIngressList>;
    constructor(data?: ModelData<IIngressList>);
}
export { IIngressList as IIoK8sApiNetworkingV1IngressList, IngressList as IoK8sApiNetworkingV1IngressList };
