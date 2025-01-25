import { IIoK8sApimachineryPkgUtilIntstrIntOrString } from "@kubernetes-models/apimachinery/util/intstr/IntOrString";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NetworkPolicyPort describes a port to allow traffic on
 */
export interface INetworkPolicyPort {
    /**
     * endPort indicates that the range of ports from port to endPort if set, inclusive, should be allowed by the policy. This field cannot be defined if the port field is not defined or if the port field is defined as a named (string) port. The endPort must be equal or greater than port.
     */
    "endPort"?: number;
    /**
     * port represents the port on the given protocol. This can either be a numerical or named port on a pod. If this field is not provided, this matches all port names and numbers. If present, only traffic on the specified protocol AND port will be matched.
     */
    "port"?: IIoK8sApimachineryPkgUtilIntstrIntOrString;
    /**
     * protocol represents the protocol (TCP, UDP, or SCTP) which traffic must match. If not specified, this field defaults to TCP.
     *
     * Possible enum values:
     *  - `"SCTP"` is the SCTP protocol.
     *  - `"TCP"` is the TCP protocol.
     *  - `"UDP"` is the UDP protocol.
     */
    "protocol"?: "SCTP" | "TCP" | "UDP";
}
/**
 * NetworkPolicyPort describes a port to allow traffic on
 */
export declare class NetworkPolicyPort extends Model<INetworkPolicyPort> implements INetworkPolicyPort {
    "endPort"?: number;
    "port"?: IIoK8sApimachineryPkgUtilIntstrIntOrString;
    "protocol"?: "SCTP" | "TCP" | "UDP";
    constructor(data?: ModelData<INetworkPolicyPort>);
}
export { INetworkPolicyPort as IIoK8sApiNetworkingV1NetworkPolicyPort, NetworkPolicyPort as IoK8sApiNetworkingV1NetworkPolicyPort };
