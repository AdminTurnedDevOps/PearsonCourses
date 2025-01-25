import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { IIoK8sApiCoreV1PersistentVolumeClaimCondition } from "./PersistentVolumeClaimCondition";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PersistentVolumeClaimStatus is the current status of a persistent volume claim.
 */
export interface IPersistentVolumeClaimStatus {
    /**
     * accessModes contains the actual access modes the volume backing the PVC has. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
     */
    "accessModes"?: Array<string>;
    /**
     * allocatedResources is the storage resource within AllocatedResources tracks the capacity allocated to a PVC. It may be larger than the actual capacity when a volume expansion operation is requested. For storage quota, the larger value from allocatedResources and PVC.spec.resources is used. If allocatedResources is not set, PVC.spec.resources alone is used for quota calculation. If a volume expansion capacity request is lowered, allocatedResources is only lowered if there are no expansion operations in progress and if the actual volume capacity is equal or lower than the requested capacity. This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
     */
    "allocatedResources"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * capacity represents the actual resources of the underlying volume.
     */
    "capacity"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * conditions is the current Condition of persistent volume claim. If underlying persistent volume is being resized then the Condition will be set to 'ResizeStarted'.
     */
    "conditions"?: Array<IIoK8sApiCoreV1PersistentVolumeClaimCondition>;
    /**
     * phase represents the current phase of PersistentVolumeClaim.
     *
     * Possible enum values:
     *  - `"Bound"` used for PersistentVolumeClaims that are bound
     *  - `"Lost"` used for PersistentVolumeClaims that lost their underlying PersistentVolume. The claim was bound to a PersistentVolume and this volume does not exist any longer and all data on it was lost.
     *  - `"Pending"` used for PersistentVolumeClaims that are not yet bound
     */
    "phase"?: "Bound" | "Lost" | "Pending";
    /**
     * resizeStatus stores status of resize operation. ResizeStatus is not set by default but when expansion is complete resizeStatus is set to empty string by resize controller or kubelet. This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
     *
     * Possible enum values:
     *  - `""` When expansion is complete, the empty string is set by resize controller or kubelet.
     *  - `"ControllerExpansionFailed"` State set when expansion has failed in resize controller with a terminal error. Transient errors such as timeout should not set this status and should leave ResizeStatus unmodified, so as resize controller can resume the volume expansion.
     *  - `"ControllerExpansionInProgress"` State set when resize controller starts expanding the volume in control-plane
     *  - `"NodeExpansionFailed"` State set when expansion has failed in kubelet with a terminal error. Transient errors don't set NodeExpansionFailed.
     *  - `"NodeExpansionInProgress"` State set when kubelet starts expanding the volume.
     *  - `"NodeExpansionPending"` State set when resize controller has finished expanding the volume but further expansion is needed on the node.
     */
    "resizeStatus"?: "" | "ControllerExpansionFailed" | "ControllerExpansionInProgress" | "NodeExpansionFailed" | "NodeExpansionInProgress" | "NodeExpansionPending";
}
/**
 * PersistentVolumeClaimStatus is the current status of a persistent volume claim.
 */
export declare class PersistentVolumeClaimStatus extends Model<IPersistentVolumeClaimStatus> implements IPersistentVolumeClaimStatus {
    "accessModes"?: Array<string>;
    "allocatedResources"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "capacity"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "conditions"?: Array<IIoK8sApiCoreV1PersistentVolumeClaimCondition>;
    "phase"?: "Bound" | "Lost" | "Pending";
    "resizeStatus"?: "" | "ControllerExpansionFailed" | "ControllerExpansionInProgress" | "NodeExpansionFailed" | "NodeExpansionInProgress" | "NodeExpansionPending";
    constructor(data?: ModelData<IPersistentVolumeClaimStatus>);
}
export { IPersistentVolumeClaimStatus as IIoK8sApiCoreV1PersistentVolumeClaimStatus, PersistentVolumeClaimStatus as IoK8sApiCoreV1PersistentVolumeClaimStatus };
