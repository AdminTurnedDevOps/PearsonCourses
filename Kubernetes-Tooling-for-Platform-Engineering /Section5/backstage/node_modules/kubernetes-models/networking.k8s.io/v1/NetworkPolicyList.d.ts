import { IIoK8sApiNetworkingV1NetworkPolicy } from "./NetworkPolicy";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * NetworkPolicyList is a list of NetworkPolicy objects.
 */
export interface INetworkPolicyList extends TypeMeta {
    "apiVersion": "networking.k8s.io/v1";
    /**
     * items is a list of schema objects.
     */
    "items": Array<IIoK8sApiNetworkingV1NetworkPolicy>;
    "kind": "NetworkPolicyList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * NetworkPolicyList is a list of NetworkPolicy objects.
 */
export declare class NetworkPolicyList extends Model<INetworkPolicyList> implements INetworkPolicyList {
    "apiVersion": INetworkPolicyList["apiVersion"];
    "items": Array<IIoK8sApiNetworkingV1NetworkPolicy>;
    "kind": INetworkPolicyList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: INetworkPolicyList["apiVersion"];
    static kind: INetworkPolicyList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<INetworkPolicyList>;
    constructor(data?: ModelData<INetworkPolicyList>);
}
export { INetworkPolicyList as IIoK8sApiNetworkingV1NetworkPolicyList, NetworkPolicyList as IoK8sApiNetworkingV1NetworkPolicyList };
