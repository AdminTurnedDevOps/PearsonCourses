import { IIoK8sApimachineryPkgUtilIntstrIntOrString } from "@kubernetes-models/apimachinery/util/intstr/IntOrString";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * DEPRECATED 1.9 - This group version of NetworkPolicyPort is deprecated by networking/v1/NetworkPolicyPort.
 * @deprecated
 */
export interface INetworkPolicyPort {
    /**
     * If specified, the port on the given protocol.  This can either be a numerical or named port on a pod.  If this field is not provided, this matches all port names and numbers. If present, only traffic on the specified protocol AND port will be matched.
     */
    "port"?: IIoK8sApimachineryPkgUtilIntstrIntOrString;
    /**
     * Optional.  The protocol (TCP, UDP, or SCTP) which traffic must match. If not specified, this field defaults to TCP.
     */
    "protocol"?: string;
}
/**
 * DEPRECATED 1.9 - This group version of NetworkPolicyPort is deprecated by networking/v1/NetworkPolicyPort.
 * @deprecated
 */
export declare class NetworkPolicyPort extends Model<INetworkPolicyPort> implements INetworkPolicyPort {
    "port"?: IIoK8sApimachineryPkgUtilIntstrIntOrString;
    "protocol"?: string;
    constructor(data?: ModelData<INetworkPolicyPort>);
}
export { INetworkPolicyPort as IIoK8sApiExtensionsV1beta1NetworkPolicyPort, NetworkPolicyPort as IoK8sApiExtensionsV1beta1NetworkPolicyPort };
