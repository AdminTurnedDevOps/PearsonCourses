import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiExtensionsV1beta1NetworkPolicySpec } from "./NetworkPolicySpec";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * DEPRECATED 1.9 - This group version of NetworkPolicy is deprecated by networking/v1/NetworkPolicy. NetworkPolicy describes what network traffic is allowed for a set of Pods
 * @deprecated
 */
export interface INetworkPolicy extends TypeMeta {
    "apiVersion": "extensions/v1beta1";
    "kind": "NetworkPolicy";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Specification of the desired behavior for this NetworkPolicy.
     */
    "spec"?: IIoK8sApiExtensionsV1beta1NetworkPolicySpec;
}
/**
 * DEPRECATED 1.9 - This group version of NetworkPolicy is deprecated by networking/v1/NetworkPolicy. NetworkPolicy describes what network traffic is allowed for a set of Pods
 * @deprecated
 */
export declare class NetworkPolicy extends Model<INetworkPolicy> implements INetworkPolicy {
    "apiVersion": INetworkPolicy["apiVersion"];
    "kind": INetworkPolicy["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiExtensionsV1beta1NetworkPolicySpec;
    static apiVersion: INetworkPolicy["apiVersion"];
    static kind: INetworkPolicy["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<INetworkPolicy>;
    constructor(data?: ModelData<INetworkPolicy>);
}
export { INetworkPolicy as IIoK8sApiExtensionsV1beta1NetworkPolicy, NetworkPolicy as IoK8sApiExtensionsV1beta1NetworkPolicy };
