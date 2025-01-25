import { IIoK8sApimachineryPkgApisMetaV1GroupVersionForDiscovery } from "./GroupVersionForDiscovery";
import { IIoK8sApimachineryPkgApisMetaV1ServerAddressByClientCIDR } from "./ServerAddressByClientCIDR";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * APIGroup contains the name, the supported versions, and the preferred version of a group.
 */
export interface IAPIGroup {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     */
    "apiVersion"?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "kind"?: string;
    /**
     * name is the name of the group.
     */
    "name": string;
    /**
     * preferredVersion is the version preferred by the API server, which probably is the storage version.
     */
    "preferredVersion"?: IIoK8sApimachineryPkgApisMetaV1GroupVersionForDiscovery;
    /**
     * a map of client CIDR to server address that is serving this group. This is to help clients reach servers in the most network-efficient way possible. Clients can use the appropriate server address as per the CIDR that they match. In case of multiple matches, clients should use the longest matching CIDR. The server returns only those CIDRs that it thinks that the client can match. For example: the master will return an internal IP CIDR only, if the client reaches the server using an internal IP. Server looks at X-Forwarded-For header or X-Real-Ip header or request.RemoteAddr (in that order) to get the client IP.
     */
    "serverAddressByClientCIDRs"?: Array<IIoK8sApimachineryPkgApisMetaV1ServerAddressByClientCIDR>;
    /**
     * versions are the versions supported in this group.
     */
    "versions": Array<IIoK8sApimachineryPkgApisMetaV1GroupVersionForDiscovery>;
}
/**
 * APIGroup contains the name, the supported versions, and the preferred version of a group.
 */
export declare class APIGroup extends Model<IAPIGroup> implements IAPIGroup {
    "apiVersion"?: IAPIGroup["apiVersion"];
    "kind"?: IAPIGroup["kind"];
    "name": string;
    "preferredVersion"?: IIoK8sApimachineryPkgApisMetaV1GroupVersionForDiscovery;
    "serverAddressByClientCIDRs"?: Array<IIoK8sApimachineryPkgApisMetaV1ServerAddressByClientCIDR>;
    "versions": Array<IIoK8sApimachineryPkgApisMetaV1GroupVersionForDiscovery>;
    constructor(data?: ModelData<IAPIGroup>);
}
export { IAPIGroup as IIoK8sApimachineryPkgApisMetaV1APIGroup, APIGroup as IoK8sApimachineryPkgApisMetaV1APIGroup };
