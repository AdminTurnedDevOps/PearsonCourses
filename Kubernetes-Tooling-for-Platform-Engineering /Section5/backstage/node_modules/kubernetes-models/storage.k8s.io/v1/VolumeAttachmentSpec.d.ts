import { IIoK8sApiStorageV1VolumeAttachmentSource } from "./VolumeAttachmentSource";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * VolumeAttachmentSpec is the specification of a VolumeAttachment request.
 */
export interface IVolumeAttachmentSpec {
    /**
     * attacher indicates the name of the volume driver that MUST handle this request. This is the name returned by GetPluginName().
     */
    "attacher": string;
    /**
     * nodeName represents the node that the volume should be attached to.
     */
    "nodeName": string;
    /**
     * source represents the volume that should be attached.
     */
    "source": IIoK8sApiStorageV1VolumeAttachmentSource;
}
/**
 * VolumeAttachmentSpec is the specification of a VolumeAttachment request.
 */
export declare class VolumeAttachmentSpec extends Model<IVolumeAttachmentSpec> implements IVolumeAttachmentSpec {
    "attacher": string;
    "nodeName": string;
    "source": IIoK8sApiStorageV1VolumeAttachmentSource;
    constructor(data?: ModelData<IVolumeAttachmentSpec>);
}
export { IVolumeAttachmentSpec as IIoK8sApiStorageV1VolumeAttachmentSpec, VolumeAttachmentSpec as IoK8sApiStorageV1VolumeAttachmentSpec };
