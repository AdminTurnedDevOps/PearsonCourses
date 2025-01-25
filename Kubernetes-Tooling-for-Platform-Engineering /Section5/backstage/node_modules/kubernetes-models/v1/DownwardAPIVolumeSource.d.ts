import { IIoK8sApiCoreV1DownwardAPIVolumeFile } from "./DownwardAPIVolumeFile";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * DownwardAPIVolumeSource represents a volume containing downward API info. Downward API volumes support ownership management and SELinux relabeling.
 */
export interface IDownwardAPIVolumeSource {
    /**
     * Optional: mode bits to use on created files by default. Must be a Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     */
    "defaultMode"?: number;
    /**
     * Items is a list of downward API volume file
     */
    "items"?: Array<IIoK8sApiCoreV1DownwardAPIVolumeFile>;
}
/**
 * DownwardAPIVolumeSource represents a volume containing downward API info. Downward API volumes support ownership management and SELinux relabeling.
 */
export declare class DownwardAPIVolumeSource extends Model<IDownwardAPIVolumeSource> implements IDownwardAPIVolumeSource {
    "defaultMode"?: number;
    "items"?: Array<IIoK8sApiCoreV1DownwardAPIVolumeFile>;
    constructor(data?: ModelData<IDownwardAPIVolumeSource>);
}
export { IDownwardAPIVolumeSource as IIoK8sApiCoreV1DownwardAPIVolumeSource, DownwardAPIVolumeSource as IoK8sApiCoreV1DownwardAPIVolumeSource };
