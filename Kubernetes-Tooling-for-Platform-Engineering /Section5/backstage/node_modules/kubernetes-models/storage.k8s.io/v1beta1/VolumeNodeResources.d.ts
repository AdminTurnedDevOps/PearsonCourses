import { ModelData, Model } from "@kubernetes-models/base";
/**
 * VolumeNodeResources is a set of resource limits for scheduling of volumes.
 */
export interface IVolumeNodeResources {
    /**
     * Maximum number of unique volumes managed by the CSI driver that can be used on a node. A volume that is both attached and mounted on a node is considered to be used once, not twice. The same rule applies for a unique volume that is shared among multiple pods on the same node. If this field is nil, then the supported number of volumes on this node is unbounded.
     */
    "count"?: number;
}
/**
 * VolumeNodeResources is a set of resource limits for scheduling of volumes.
 */
export declare class VolumeNodeResources extends Model<IVolumeNodeResources> implements IVolumeNodeResources {
    "count"?: number;
    constructor(data?: ModelData<IVolumeNodeResources>);
}
export { IVolumeNodeResources as IIoK8sApiStorageV1beta1VolumeNodeResources, VolumeNodeResources as IoK8sApiStorageV1beta1VolumeNodeResources };
