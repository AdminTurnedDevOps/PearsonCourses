import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a vSphere volume resource.
 */
export interface IVsphereVirtualDiskVolumeSource {
    /**
     * fsType is filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
     */
    "fsType"?: string;
    /**
     * storagePolicyID is the storage Policy Based Management (SPBM) profile ID associated with the StoragePolicyName.
     */
    "storagePolicyID"?: string;
    /**
     * storagePolicyName is the storage Policy Based Management (SPBM) profile name.
     */
    "storagePolicyName"?: string;
    /**
     * volumePath is the path that identifies vSphere volume vmdk
     */
    "volumePath": string;
}
/**
 * Represents a vSphere volume resource.
 */
export declare class VsphereVirtualDiskVolumeSource extends Model<IVsphereVirtualDiskVolumeSource> implements IVsphereVirtualDiskVolumeSource {
    "fsType"?: string;
    "storagePolicyID"?: string;
    "storagePolicyName"?: string;
    "volumePath": string;
    constructor(data?: ModelData<IVsphereVirtualDiskVolumeSource>);
}
export { IVsphereVirtualDiskVolumeSource as IIoK8sApiCoreV1VsphereVirtualDiskVolumeSource, VsphereVirtualDiskVolumeSource as IoK8sApiCoreV1VsphereVirtualDiskVolumeSource };
