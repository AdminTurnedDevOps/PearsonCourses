import { IIoK8sApiCoreV1SecretReference } from "./SecretReference";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * FlexPersistentVolumeSource represents a generic persistent volume resource that is provisioned/attached using an exec based plugin.
 */
export interface IFlexPersistentVolumeSource {
    /**
     * driver is the name of the driver to use for this volume.
     */
    "driver": string;
    /**
     * fsType is the Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.
     */
    "fsType"?: string;
    /**
     * options is Optional: this field holds extra command options if any.
     */
    "options"?: {
        [key: string]: string;
    };
    /**
     * readOnly is Optional: defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
     */
    "readOnly"?: boolean;
    /**
     * secretRef is Optional: SecretRef is reference to the secret object containing sensitive information to pass to the plugin scripts. This may be empty if no secret object is specified. If the secret object contains more than one secret, all secrets are passed to the plugin scripts.
     */
    "secretRef"?: IIoK8sApiCoreV1SecretReference;
}
/**
 * FlexPersistentVolumeSource represents a generic persistent volume resource that is provisioned/attached using an exec based plugin.
 */
export declare class FlexPersistentVolumeSource extends Model<IFlexPersistentVolumeSource> implements IFlexPersistentVolumeSource {
    "driver": string;
    "fsType"?: string;
    "options"?: {
        [key: string]: string;
    };
    "readOnly"?: boolean;
    "secretRef"?: IIoK8sApiCoreV1SecretReference;
    constructor(data?: ModelData<IFlexPersistentVolumeSource>);
}
export { IFlexPersistentVolumeSource as IIoK8sApiCoreV1FlexPersistentVolumeSource, FlexPersistentVolumeSource as IoK8sApiCoreV1FlexPersistentVolumeSource };
