import { IIoK8sApiDiscoveryV1Endpoint } from "./Endpoint";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiDiscoveryV1EndpointPort } from "./EndpointPort";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * EndpointSlice represents a subset of the endpoints that implement a service. For a given service there may be multiple EndpointSlice objects, selected by labels, which must be joined to produce the full set of endpoints.
 */
export interface IEndpointSlice extends TypeMeta {
    /**
     * addressType specifies the type of address carried by this EndpointSlice. All addresses in this slice must be the same type. This field is immutable after creation. The following address types are currently supported: \* IPv4: Represents an IPv4 Address. \* IPv6: Represents an IPv6 Address. \* FQDN: Represents a Fully Qualified Domain Name.
     *
     * Possible enum values:
     *  - `"FQDN"` represents a FQDN.
     *  - `"IPv4"` represents an IPv4 Address.
     *  - `"IPv6"` represents an IPv6 Address.
     */
    "addressType": "FQDN" | "IPv4" | "IPv6";
    "apiVersion": "discovery.k8s.io/v1";
    /**
     * endpoints is a list of unique endpoints in this slice. Each slice may include a maximum of 1000 endpoints.
     */
    "endpoints": Array<IIoK8sApiDiscoveryV1Endpoint>;
    "kind": "EndpointSlice";
    /**
     * Standard object's metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * ports specifies the list of network ports exposed by each endpoint in this slice. Each port must have a unique name. When ports is empty, it indicates that there are no defined ports. When a port is defined with a nil port value, it indicates "all ports". Each slice may include a maximum of 100 ports.
     */
    "ports"?: Array<IIoK8sApiDiscoveryV1EndpointPort>;
}
/**
 * EndpointSlice represents a subset of the endpoints that implement a service. For a given service there may be multiple EndpointSlice objects, selected by labels, which must be joined to produce the full set of endpoints.
 */
export declare class EndpointSlice extends Model<IEndpointSlice> implements IEndpointSlice {
    "addressType": "FQDN" | "IPv4" | "IPv6";
    "apiVersion": IEndpointSlice["apiVersion"];
    "endpoints": Array<IIoK8sApiDiscoveryV1Endpoint>;
    "kind": IEndpointSlice["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "ports"?: Array<IIoK8sApiDiscoveryV1EndpointPort>;
    static apiVersion: IEndpointSlice["apiVersion"];
    static kind: IEndpointSlice["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IEndpointSlice>;
    constructor(data?: ModelData<IEndpointSlice>);
}
export { IEndpointSlice as IIoK8sApiDiscoveryV1EndpointSlice, EndpointSlice as IoK8sApiDiscoveryV1EndpointSlice };
