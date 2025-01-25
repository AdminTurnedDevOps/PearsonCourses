import { IIoK8sApiCoreV1VolumeProjection } from "./VolumeProjection";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a projected volume source
 */
export interface IProjectedVolumeSource {
    /**
     * defaultMode are the mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
     */
    "defaultMode"?: number;
    /**
     * sources is the list of volume projections
     */
    "sources"?: Array<IIoK8sApiCoreV1VolumeProjection>;
}
/**
 * Represents a projected volume source
 */
export declare class ProjectedVolumeSource extends Model<IProjectedVolumeSource> implements IProjectedVolumeSource {
    "defaultMode"?: number;
    "sources"?: Array<IIoK8sApiCoreV1VolumeProjection>;
    constructor(data?: ModelData<IProjectedVolumeSource>);
}
export { IProjectedVolumeSource as IIoK8sApiCoreV1ProjectedVolumeSource, ProjectedVolumeSource as IoK8sApiCoreV1ProjectedVolumeSource };
