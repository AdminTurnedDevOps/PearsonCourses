import { ModelData, Model } from "@kubernetes-models/base";
/**
 * EndpointPort is a tuple that describes a single port.
 */
export interface IEndpointPort {
    /**
     * The application protocol for this port. This is used as a hint for implementations to offer richer behavior for protocols that they understand. This field follows standard Kubernetes label syntax. Valid values are either:
     *
     * \* Un-prefixed protocol names - reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names).
     *
     * \* Kubernetes-defined prefixed names:
     *   \* 'kubernetes.io/h2c' - HTTP/2 over cleartext as described in https://www.rfc-editor.org/rfc/rfc7540
     *
     * \* Other protocols should use implementation-defined prefixed names such as mycompany.com/my-custom-protocol.
     */
    "appProtocol"?: string;
    /**
     * The name of this port.  This must match the 'name' field in the corresponding ServicePort. Must be a DNS_LABEL. Optional only if one port is defined.
     */
    "name"?: string;
    /**
     * The port number of the endpoint.
     */
    "port": number;
    /**
     * The IP protocol for this port. Must be UDP, TCP, or SCTP. Default is TCP.
     *
     * Possible enum values:
     *  - `"SCTP"` is the SCTP protocol.
     *  - `"TCP"` is the TCP protocol.
     *  - `"UDP"` is the UDP protocol.
     */
    "protocol"?: "SCTP" | "TCP" | "UDP";
}
/**
 * EndpointPort is a tuple that describes a single port.
 */
export declare class EndpointPort extends Model<IEndpointPort> implements IEndpointPort {
    "appProtocol"?: string;
    "name"?: string;
    "port": number;
    "protocol"?: "SCTP" | "TCP" | "UDP";
    constructor(data?: ModelData<IEndpointPort>);
}
export { IEndpointPort as IIoK8sApiCoreV1EndpointPort, EndpointPort as IoK8sApiCoreV1EndpointPort };
