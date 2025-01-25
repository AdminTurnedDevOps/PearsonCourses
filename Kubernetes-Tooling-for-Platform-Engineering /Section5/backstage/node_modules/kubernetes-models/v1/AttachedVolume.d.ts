import { ModelData, Model } from "@kubernetes-models/base";
/**
 * AttachedVolume describes a volume attached to a node
 */
export interface IAttachedVolume {
    /**
     * DevicePath represents the device path where the volume should be available
     */
    "devicePath": string;
    /**
     * Name of the attached volume
     */
    "name": string;
}
/**
 * AttachedVolume describes a volume attached to a node
 */
export declare class AttachedVolume extends Model<IAttachedVolume> implements IAttachedVolume {
    "devicePath": string;
    "name": string;
    constructor(data?: ModelData<IAttachedVolume>);
}
export { IAttachedVolume as IIoK8sApiCoreV1AttachedVolume, AttachedVolume as IoK8sApiCoreV1AttachedVolume };
