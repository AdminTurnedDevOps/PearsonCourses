import { IIoK8sApiDiscoveryV1beta1EndpointConditions } from "./EndpointConditions";
import { IIoK8sApiDiscoveryV1beta1EndpointHints } from "./EndpointHints";
import { IIoK8sApiCoreV1ObjectReference } from "../../v1/ObjectReference";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Endpoint represents a single logical "backend" implementing a service.
 */
export interface IEndpoint {
    /**
     * addresses of this endpoint. The contents of this field are interpreted according to the corresponding EndpointSlice addressType field. Consumers must handle different types of addresses in the context of their own capabilities. This must contain at least one address but no more than 100. These are all assumed to be fungible and clients may choose to only use the first element. Refer to: https://issue.k8s.io/106267
     */
    "addresses": Array<string>;
    /**
     * conditions contains information about the current status of the endpoint.
     */
    "conditions"?: IIoK8sApiDiscoveryV1beta1EndpointConditions;
    /**
     * hints contains information associated with how an endpoint should be consumed.
     */
    "hints"?: IIoK8sApiDiscoveryV1beta1EndpointHints;
    /**
     * hostname of this endpoint. This field may be used by consumers of endpoints to distinguish endpoints from each other (e.g. in DNS names). Multiple endpoints which use the same hostname should be considered fungible (e.g. multiple A values in DNS). Must be lowercase and pass DNS Label (RFC 1123) validation.
     */
    "hostname"?: string;
    /**
     * nodeName represents the name of the Node hosting this endpoint. This can be used to determine endpoints local to a Node. This field can be enabled with the EndpointSliceNodeName feature gate.
     */
    "nodeName"?: string;
    /**
     * targetRef is a reference to a Kubernetes object that represents this endpoint.
     */
    "targetRef"?: IIoK8sApiCoreV1ObjectReference;
    /**
     * topology contains arbitrary topology information associated with the endpoint. These key/value pairs must conform with the label format. https://kubernetes.io/docs/concepts/overview/working-with-objects/labels Topology may include a maximum of 16 key/value pairs. This includes, but is not limited to the following well known keys: \* kubernetes.io/hostname: the value indicates the hostname of the node
     *   where the endpoint is located. This should match the corresponding
     *   node label.
     * \* topology.kubernetes.io/zone: the value indicates the zone where the
     *   endpoint is located. This should match the corresponding node label.
     * \* topology.kubernetes.io/region: the value indicates the region where the
     *   endpoint is located. This should match the corresponding node label.
     * This field is deprecated and will be removed in future api versions.
     */
    "topology"?: {
        [key: string]: string;
    };
}
/**
 * Endpoint represents a single logical "backend" implementing a service.
 */
export declare class Endpoint extends Model<IEndpoint> implements IEndpoint {
    "addresses": Array<string>;
    "conditions"?: IIoK8sApiDiscoveryV1beta1EndpointConditions;
    "hints"?: IIoK8sApiDiscoveryV1beta1EndpointHints;
    "hostname"?: string;
    "nodeName"?: string;
    "targetRef"?: IIoK8sApiCoreV1ObjectReference;
    "topology"?: {
        [key: string]: string;
    };
    constructor(data?: ModelData<IEndpoint>);
}
export { IEndpoint as IIoK8sApiDiscoveryV1beta1Endpoint, Endpoint as IoK8sApiDiscoveryV1beta1Endpoint };
