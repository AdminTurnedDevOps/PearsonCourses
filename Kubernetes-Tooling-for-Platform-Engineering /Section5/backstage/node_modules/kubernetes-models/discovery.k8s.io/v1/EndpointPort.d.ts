import { ModelData, Model } from "@kubernetes-models/base";
/**
 * EndpointPort represents a Port used by an EndpointSlice
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
     * name represents the name of this port. All ports in an EndpointSlice must have a unique name. If the EndpointSlice is dervied from a Kubernetes service, this corresponds to the Service.ports[].name. Name must either be an empty string or pass DNS_LABEL validation: \* must be no more than 63 characters long. \* must consist of lower case alphanumeric characters or '-'. \* must start and end with an alphanumeric character. Default is empty string.
     */
    "name"?: string;
    /**
     * port represents the port number of the endpoint. If this is not specified, ports are not restricted and must be interpreted in the context of the specific consumer.
     */
    "port"?: number;
    /**
     * protocol represents the IP protocol for this port. Must be UDP, TCP, or SCTP. Default is TCP.
     *
     * Possible enum values:
     *  - `"SCTP"` is the SCTP protocol.
     *  - `"TCP"` is the TCP protocol.
     *  - `"UDP"` is the UDP protocol.
     */
    "protocol"?: "SCTP" | "TCP" | "UDP";
}
/**
 * EndpointPort represents a Port used by an EndpointSlice
 */
export declare class EndpointPort extends Model<IEndpointPort> implements IEndpointPort {
    "appProtocol"?: string;
    "name"?: string;
    "port"?: number;
    "protocol"?: "SCTP" | "TCP" | "UDP";
    constructor(data?: ModelData<IEndpointPort>);
}
export { IEndpointPort as IIoK8sApiDiscoveryV1EndpointPort, EndpointPort as IoK8sApiDiscoveryV1EndpointPort };
