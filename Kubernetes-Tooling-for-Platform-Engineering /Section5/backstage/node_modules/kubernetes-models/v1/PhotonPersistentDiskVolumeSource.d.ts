import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a Photon Controller persistent disk resource.
 */
export interface IPhotonPersistentDiskVolumeSource {
    /**
     * fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
     */
    "fsType"?: string;
    /**
     * pdID is the ID that identifies Photon Controller persistent disk
     */
    "pdID": string;
}
/**
 * Represents a Photon Controller persistent disk resource.
 */
export declare class PhotonPersistentDiskVolumeSource extends Model<IPhotonPersistentDiskVolumeSource> implements IPhotonPersistentDiskVolumeSource {
    "fsType"?: string;
    "pdID": string;
    constructor(data?: ModelData<IPhotonPersistentDiskVolumeSource>);
}
export { IPhotonPersistentDiskVolumeSource as IIoK8sApiCoreV1PhotonPersistentDiskVolumeSource, PhotonPersistentDiskVolumeSource as IoK8sApiCoreV1PhotonPersistentDiskVolumeSource };
