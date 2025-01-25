import { ModelData, Model } from "@kubernetes-models/base";
/**
 * IP address information for entries in the (plural) PodIPs field. Each entry includes:
 *
 * 	IP: An IP address allocated to the pod. Routable at least within the cluster.
 */
export interface IPodIP {
    /**
     * ip is an IP address (IPv4 or IPv6) assigned to the pod
     */
    "ip"?: string;
}
/**
 * IP address information for entries in the (plural) PodIPs field. Each entry includes:
 *
 * 	IP: An IP address allocated to the pod. Routable at least within the cluster.
 */
export declare class PodIP extends Model<IPodIP> implements IPodIP {
    "ip"?: string;
    constructor(data?: ModelData<IPodIP>);
}
export { IPodIP as IIoK8sApiCoreV1PodIP, PodIP as IoK8sApiCoreV1PodIP };
