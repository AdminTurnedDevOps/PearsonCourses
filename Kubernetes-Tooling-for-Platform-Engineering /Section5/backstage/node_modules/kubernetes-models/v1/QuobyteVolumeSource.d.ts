import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a Quobyte mount that lasts the lifetime of a pod. Quobyte volumes do not support ownership management or SELinux relabeling.
 */
export interface IQuobyteVolumeSource {
    /**
     * group to map volume access to Default is no group
     */
    "group"?: string;
    /**
     * readOnly here will force the Quobyte volume to be mounted with read-only permissions. Defaults to false.
     */
    "readOnly"?: boolean;
    /**
     * registry represents a single or multiple Quobyte Registry services specified as a string as host:port pair (multiple entries are separated with commas) which acts as the central registry for volumes
     */
    "registry": string;
    /**
     * tenant owning the given Quobyte volume in the Backend Used with dynamically provisioned Quobyte volumes, value is set by the plugin
     */
    "tenant"?: string;
    /**
     * user to map volume access to Defaults to serivceaccount user
     */
    "user"?: string;
    /**
     * volume is a string that references an already created Quobyte volume by name.
     */
    "volume": string;
}
/**
 * Represents a Quobyte mount that lasts the lifetime of a pod. Quobyte volumes do not support ownership management or SELinux relabeling.
 */
export declare class QuobyteVolumeSource extends Model<IQuobyteVolumeSource> implements IQuobyteVolumeSource {
    "group"?: string;
    "readOnly"?: boolean;
    "registry": string;
    "tenant"?: string;
    "user"?: string;
    "volume": string;
    constructor(data?: ModelData<IQuobyteVolumeSource>);
}
export { IQuobyteVolumeSource as IIoK8sApiCoreV1QuobyteVolumeSource, QuobyteVolumeSource as IoK8sApiCoreV1QuobyteVolumeSource };
