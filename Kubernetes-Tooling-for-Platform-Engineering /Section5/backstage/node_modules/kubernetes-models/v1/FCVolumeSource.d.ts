import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a Fibre Channel volume. Fibre Channel volumes can only be mounted as read/write once. Fibre Channel volumes support ownership management and SELinux relabeling.
 */
export interface IFCVolumeSource {
    /**
     * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
     */
    "fsType"?: string;
    /**
     * lun is Optional: FC target lun number
     */
    "lun"?: number;
    /**
     * readOnly is Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    "readOnly"?: boolean;
    /**
     * targetWWNs is Optional: FC target worldwide names (WWNs)
     */
    "targetWWNs"?: Array<string>;
    /**
     * wwids Optional: FC volume world wide identifiers (wwids) Either wwids or combination of targetWWNs and lun must be set, but not both simultaneously.
     */
    "wwids"?: Array<string>;
}
/**
 * Represents a Fibre Channel volume. Fibre Channel volumes can only be mounted as read/write once. Fibre Channel volumes support ownership management and SELinux relabeling.
 */
export declare class FCVolumeSource extends Model<IFCVolumeSource> implements IFCVolumeSource {
    "fsType"?: string;
    "lun"?: number;
    "readOnly"?: boolean;
    "targetWWNs"?: Array<string>;
    "wwids"?: Array<string>;
    constructor(data?: ModelData<IFCVolumeSource>);
}
export { IFCVolumeSource as IIoK8sApiCoreV1FCVolumeSource, FCVolumeSource as IoK8sApiCoreV1FCVolumeSource };
