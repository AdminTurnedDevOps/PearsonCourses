import { IIoK8sApiNetworkingV1IPBlock } from "./IPBlock";
import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NetworkPolicyPeer describes a peer to allow traffic to/from. Only certain combinations of fields are allowed
 */
export interface INetworkPolicyPeer {
    /**
     * ipBlock defines policy on a particular IPBlock. If this field is set then neither of the other fields can be.
     */
    "ipBlock"?: IIoK8sApiNetworkingV1IPBlock;
    /**
     * namespaceSelector selects namespaces using cluster-scoped labels. This field follows standard label selector semantics; if present but empty, it selects all namespaces.
     *
     * If podSelector is also set, then the NetworkPolicyPeer as a whole selects the pods matching podSelector in the namespaces selected by namespaceSelector. Otherwise it selects all pods in the namespaces selected by namespaceSelector.
     */
    "namespaceSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * podSelector is a label selector which selects pods. This field follows standard label selector semantics; if present but empty, it selects all pods.
     *
     * If namespaceSelector is also set, then the NetworkPolicyPeer as a whole selects the pods matching podSelector in the Namespaces selected by NamespaceSelector. Otherwise it selects the pods matching podSelector in the policy's own namespace.
     */
    "podSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
}
/**
 * NetworkPolicyPeer describes a peer to allow traffic to/from. Only certain combinations of fields are allowed
 */
export declare class NetworkPolicyPeer extends Model<INetworkPolicyPeer> implements INetworkPolicyPeer {
    "ipBlock"?: IIoK8sApiNetworkingV1IPBlock;
    "namespaceSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "podSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    constructor(data?: ModelData<INetworkPolicyPeer>);
}
export { INetworkPolicyPeer as IIoK8sApiNetworkingV1NetworkPolicyPeer, NetworkPolicyPeer as IoK8sApiNetworkingV1NetworkPolicyPeer };
