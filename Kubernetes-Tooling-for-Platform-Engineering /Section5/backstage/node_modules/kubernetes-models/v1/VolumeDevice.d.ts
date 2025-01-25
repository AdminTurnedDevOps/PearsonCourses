import { ModelData, Model } from "@kubernetes-models/base";
/**
 * volumeDevice describes a mapping of a raw block device within a container.
 */
export interface IVolumeDevice {
    /**
     * devicePath is the path inside of the container that the device will be mapped to.
     */
    "devicePath": string;
    /**
     * name must match the name of a persistentVolumeClaim in the pod
     */
    "name": string;
}
/**
 * volumeDevice describes a mapping of a raw block device within a container.
 */
export declare class VolumeDevice extends Model<IVolumeDevice> implements IVolumeDevice {
    "devicePath": string;
    "name": string;
    constructor(data?: ModelData<IVolumeDevice>);
}
export { IVolumeDevice as IIoK8sApiCoreV1VolumeDevice, VolumeDevice as IoK8sApiCoreV1VolumeDevice };
