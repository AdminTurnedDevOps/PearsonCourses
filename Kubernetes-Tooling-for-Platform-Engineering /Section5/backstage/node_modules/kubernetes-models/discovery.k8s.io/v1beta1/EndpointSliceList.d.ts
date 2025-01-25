import { IIoK8sApiDiscoveryV1beta1EndpointSlice } from "./EndpointSlice";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * EndpointSliceList represents a list of endpoint slices
 */
export interface IEndpointSliceList extends TypeMeta {
    "apiVersion": "discovery.k8s.io/v1beta1";
    /**
     * List of endpoint slices
     */
    "items": Array<IIoK8sApiDiscoveryV1beta1EndpointSlice>;
    "kind": "EndpointSliceList";
    /**
     * Standard list metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * EndpointSliceList represents a list of endpoint slices
 */
export declare class EndpointSliceList extends Model<IEndpointSliceList> implements IEndpointSliceList {
    "apiVersion": IEndpointSliceList["apiVersion"];
    "items": Array<IIoK8sApiDiscoveryV1beta1EndpointSlice>;
    "kind": IEndpointSliceList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IEndpointSliceList["apiVersion"];
    static kind: IEndpointSliceList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IEndpointSliceList>;
    constructor(data?: ModelData<IEndpointSliceList>);
}
export { IEndpointSliceList as IIoK8sApiDiscoveryV1beta1EndpointSliceList, EndpointSliceList as IoK8sApiDiscoveryV1beta1EndpointSliceList };
