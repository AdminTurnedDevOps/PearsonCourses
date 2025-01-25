import { IIoK8sApiNetworkingV1IngressClass } from "./IngressClass";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * IngressClassList is a collection of IngressClasses.
 */
export interface IIngressClassList extends TypeMeta {
    "apiVersion": "networking.k8s.io/v1";
    /**
     * items is the list of IngressClasses.
     */
    "items": Array<IIoK8sApiNetworkingV1IngressClass>;
    "kind": "IngressClassList";
    /**
     * Standard list metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * IngressClassList is a collection of IngressClasses.
 */
export declare class IngressClassList extends Model<IIngressClassList> implements IIngressClassList {
    "apiVersion": IIngressClassList["apiVersion"];
    "items": Array<IIoK8sApiNetworkingV1IngressClass>;
    "kind": IIngressClassList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IIngressClassList["apiVersion"];
    static kind: IIngressClassList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IIngressClassList>;
    constructor(data?: ModelData<IIngressClassList>);
}
export { IIngressClassList as IIoK8sApiNetworkingV1IngressClassList, IngressClassList as IoK8sApiNetworkingV1IngressClassList };
