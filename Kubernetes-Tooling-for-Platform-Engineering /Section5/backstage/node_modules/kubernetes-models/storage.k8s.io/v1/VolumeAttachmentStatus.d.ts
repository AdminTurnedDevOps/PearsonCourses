import { IIoK8sApiStorageV1VolumeError } from "./VolumeError";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * VolumeAttachmentStatus is the status of a VolumeAttachment request.
 */
export interface IVolumeAttachmentStatus {
    /**
     * attachError represents the last error encountered during attach operation, if any. This field must only be set by the entity completing the attach operation, i.e. the external-attacher.
     */
    "attachError"?: IIoK8sApiStorageV1VolumeError;
    /**
     * attached indicates the volume is successfully attached. This field must only be set by the entity completing the attach operation, i.e. the external-attacher.
     */
    "attached": boolean;
    /**
     * attachmentMetadata is populated with any information returned by the attach operation, upon successful attach, that must be passed into subsequent WaitForAttach or Mount calls. This field must only be set by the entity completing the attach operation, i.e. the external-attacher.
     */
    "attachmentMetadata"?: {
        [key: string]: string;
    };
    /**
     * detachError represents the last error encountered during detach operation, if any. This field must only be set by the entity completing the detach operation, i.e. the external-attacher.
     */
    "detachError"?: IIoK8sApiStorageV1VolumeError;
}
/**
 * VolumeAttachmentStatus is the status of a VolumeAttachment request.
 */
export declare class VolumeAttachmentStatus extends Model<IVolumeAttachmentStatus> implements IVolumeAttachmentStatus {
    "attachError"?: IIoK8sApiStorageV1VolumeError;
    "attached": boolean;
    "attachmentMetadata"?: {
        [key: string]: string;
    };
    "detachError"?: IIoK8sApiStorageV1VolumeError;
    constructor(data?: ModelData<IVolumeAttachmentStatus>);
}
export { IVolumeAttachmentStatus as IIoK8sApiStorageV1VolumeAttachmentStatus, VolumeAttachmentStatus as IoK8sApiStorageV1VolumeAttachmentStatus };
