import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PersistentVolumeStatus is the current status of a persistent volume.
 */
export interface IPersistentVolumeStatus {
    /**
     * message is a human-readable message indicating details about why the volume is in this state.
     */
    "message"?: string;
    /**
     * phase indicates if a volume is available, bound to a claim, or released by a claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#phase
     *
     * Possible enum values:
     *  - `"Available"` used for PersistentVolumes that are not yet bound Available volumes are held by the binder and matched to PersistentVolumeClaims
     *  - `"Bound"` used for PersistentVolumes that are bound
     *  - `"Failed"` used for PersistentVolumes that failed to be correctly recycled or deleted after being released from a claim
     *  - `"Pending"` used for PersistentVolumes that are not available
     *  - `"Released"` used for PersistentVolumes where the bound PersistentVolumeClaim was deleted released volumes must be recycled before becoming available again this phase is used by the persistent volume claim binder to signal to another process to reclaim the resource
     */
    "phase"?: "Available" | "Bound" | "Failed" | "Pending" | "Released";
    /**
     * reason is a brief CamelCase string that describes any failure and is meant for machine parsing and tidy display in the CLI.
     */
    "reason"?: string;
}
/**
 * PersistentVolumeStatus is the current status of a persistent volume.
 */
export declare class PersistentVolumeStatus extends Model<IPersistentVolumeStatus> implements IPersistentVolumeStatus {
    "message"?: string;
    "phase"?: "Available" | "Bound" | "Failed" | "Pending" | "Released";
    "reason"?: string;
    constructor(data?: ModelData<IPersistentVolumeStatus>);
}
export { IPersistentVolumeStatus as IIoK8sApiCoreV1PersistentVolumeStatus, PersistentVolumeStatus as IoK8sApiCoreV1PersistentVolumeStatus };
