import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Local represents directly-attached storage with node affinity (Beta feature)
 */
export interface ILocalVolumeSource {
    /**
     * fsType is the filesystem type to mount. It applies only when the Path is a block device. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default value is to auto-select a filesystem if unspecified.
     */
    "fsType"?: string;
    /**
     * path of the full path to the volume on the node. It can be either a directory or block device (disk, partition, ...).
     */
    "path": string;
}
/**
 * Local represents directly-attached storage with node affinity (Beta feature)
 */
export declare class LocalVolumeSource extends Model<ILocalVolumeSource> implements ILocalVolumeSource {
    "fsType"?: string;
    "path": string;
    constructor(data?: ModelData<ILocalVolumeSource>);
}
export { ILocalVolumeSource as IIoK8sApiCoreV1LocalVolumeSource, LocalVolumeSource as IoK8sApiCoreV1LocalVolumeSource };
