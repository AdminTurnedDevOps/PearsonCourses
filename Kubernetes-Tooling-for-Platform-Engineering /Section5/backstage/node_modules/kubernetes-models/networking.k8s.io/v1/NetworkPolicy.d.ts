import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiNetworkingV1NetworkPolicySpec } from "./NetworkPolicySpec";
import { IIoK8sApiNetworkingV1NetworkPolicyStatus } from "./NetworkPolicyStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * NetworkPolicy describes what network traffic is allowed for a set of Pods
 */
export interface INetworkPolicy extends TypeMeta {
    "apiVersion": "networking.k8s.io/v1";
    "kind": "NetworkPolicy";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * spec represents the specification of the desired behavior for this NetworkPolicy.
     */
    "spec"?: IIoK8sApiNetworkingV1NetworkPolicySpec;
    /**
     * status represents the current state of the NetworkPolicy. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "status"?: IIoK8sApiNetworkingV1NetworkPolicyStatus;
}
/**
 * NetworkPolicy describes what network traffic is allowed for a set of Pods
 */
export declare class NetworkPolicy extends Model<INetworkPolicy> implements INetworkPolicy {
    "apiVersion": INetworkPolicy["apiVersion"];
    "kind": INetworkPolicy["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiNetworkingV1NetworkPolicySpec;
    "status"?: IIoK8sApiNetworkingV1NetworkPolicyStatus;
    static apiVersion: INetworkPolicy["apiVersion"];
    static kind: INetworkPolicy["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<INetworkPolicy>;
    constructor(data?: ModelData<INetworkPolicy>);
}
export { INetworkPolicy as IIoK8sApiNetworkingV1NetworkPolicy, NetworkPolicy as IoK8sApiNetworkingV1NetworkPolicy };
