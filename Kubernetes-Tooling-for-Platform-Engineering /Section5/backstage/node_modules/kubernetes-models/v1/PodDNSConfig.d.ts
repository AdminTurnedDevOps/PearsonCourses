import { IIoK8sApiCoreV1PodDNSConfigOption } from "./PodDNSConfigOption";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodDNSConfig defines the DNS parameters of a pod in addition to those generated from DNSPolicy.
 */
export interface IPodDNSConfig {
    /**
     * A list of DNS name server IP addresses. This will be appended to the base nameservers generated from DNSPolicy. Duplicated nameservers will be removed.
     */
    "nameservers"?: Array<string>;
    /**
     * A list of DNS resolver options. This will be merged with the base options generated from DNSPolicy. Duplicated entries will be removed. Resolution options given in Options will override those that appear in the base DNSPolicy.
     */
    "options"?: Array<IIoK8sApiCoreV1PodDNSConfigOption>;
    /**
     * A list of DNS search domains for host-name lookup. This will be appended to the base search paths generated from DNSPolicy. Duplicated search paths will be removed.
     */
    "searches"?: Array<string>;
}
/**
 * PodDNSConfig defines the DNS parameters of a pod in addition to those generated from DNSPolicy.
 */
export declare class PodDNSConfig extends Model<IPodDNSConfig> implements IPodDNSConfig {
    "nameservers"?: Array<string>;
    "options"?: Array<IIoK8sApiCoreV1PodDNSConfigOption>;
    "searches"?: Array<string>;
    constructor(data?: ModelData<IPodDNSConfig>);
}
export { IPodDNSConfig as IIoK8sApiCoreV1PodDNSConfig, PodDNSConfig as IoK8sApiCoreV1PodDNSConfig };
