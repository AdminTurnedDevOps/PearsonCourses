import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PortworxVolumeSource represents a Portworx volume resource.
 */
export interface IPortworxVolumeSource {
    /**
     * fSType represents the filesystem type to mount Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs". Implicitly inferred to be "ext4" if unspecified.
     */
    "fsType"?: string;
    /**
     * readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    "readOnly"?: boolean;
    /**
     * volumeID uniquely identifies a Portworx volume
     */
    "volumeID": string;
}
/**
 * PortworxVolumeSource represents a Portworx volume resource.
 */
export declare class PortworxVolumeSource extends Model<IPortworxVolumeSource> implements IPortworxVolumeSource {
    "fsType"?: string;
    "readOnly"?: boolean;
    "volumeID": string;
    constructor(data?: ModelData<IPortworxVolumeSource>);
}
export { IPortworxVolumeSource as IIoK8sApiCoreV1PortworxVolumeSource, PortworxVolumeSource as IoK8sApiCoreV1PortworxVolumeSource };
