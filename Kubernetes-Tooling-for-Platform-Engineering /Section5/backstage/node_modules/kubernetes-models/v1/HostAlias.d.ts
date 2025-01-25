import { ModelData, Model } from "@kubernetes-models/base";
/**
 * HostAlias holds the mapping between IP and hostnames that will be injected as an entry in the pod's hosts file.
 */
export interface IHostAlias {
    /**
     * Hostnames for the above IP address.
     */
    "hostnames"?: Array<string>;
    /**
     * IP address of the host file entry.
     */
    "ip"?: string;
}
/**
 * HostAlias holds the mapping between IP and hostnames that will be injected as an entry in the pod's hosts file.
 */
export declare class HostAlias extends Model<IHostAlias> implements IHostAlias {
    "hostnames"?: Array<string>;
    "ip"?: string;
    constructor(data?: ModelData<IHostAlias>);
}
export { IHostAlias as IIoK8sApiCoreV1HostAlias, HostAlias as IoK8sApiCoreV1HostAlias };
