import { ModelData, Model } from "@kubernetes-models/base";
/**
 * AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
 */
export interface IAzureDiskVolumeSource {
    /**
     * cachingMode is the Host Caching mode: None, Read Only, Read Write.
     *
     * Possible enum values:
     *  - `"None"`
     *  - `"ReadOnly"`
     *  - `"ReadWrite"`
     */
    "cachingMode"?: "None" | "ReadOnly" | "ReadWrite";
    /**
     * diskName is the Name of the data disk in the blob storage
     */
    "diskName": string;
    /**
     * diskURI is the URI of data disk in the blob storage
     */
    "diskURI": string;
    /**
     * fsType is Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
     */
    "fsType"?: string;
    /**
     * kind expected values are Shared: multiple blob disks per storage account  Dedicated: single blob disk per storage account  Managed: azure managed data disk (only in managed availability set). defaults to shared
     *
     * Possible enum values:
     *  - `"Dedicated"`
     *  - `"Managed"`
     *  - `"Shared"`
     */
    "kind"?: "Dedicated" | "Managed" | "Shared";
    /**
     * readOnly Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    "readOnly"?: boolean;
}
/**
 * AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
 */
export declare class AzureDiskVolumeSource extends Model<IAzureDiskVolumeSource> implements IAzureDiskVolumeSource {
    "cachingMode"?: "None" | "ReadOnly" | "ReadWrite";
    "diskName": string;
    "diskURI": string;
    "fsType"?: string;
    "kind"?: IAzureDiskVolumeSource["kind"];
    "readOnly"?: boolean;
    constructor(data?: ModelData<IAzureDiskVolumeSource>);
}
export { IAzureDiskVolumeSource as IIoK8sApiCoreV1AzureDiskVolumeSource, AzureDiskVolumeSource as IoK8sApiCoreV1AzureDiskVolumeSource };
