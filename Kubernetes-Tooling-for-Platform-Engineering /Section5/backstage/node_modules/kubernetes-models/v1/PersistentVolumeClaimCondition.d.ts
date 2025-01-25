import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PersistentVolumeClaimCondition contains details about state of pvc
 */
export interface IPersistentVolumeClaimCondition {
    /**
     * lastProbeTime is the time we probed the condition.
     */
    "lastProbeTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * lastTransitionTime is the time the condition transitioned from one status to another.
     */
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * message is the human-readable message indicating details about last transition.
     */
    "message"?: string;
    /**
     * reason is a unique, this should be a short, machine understandable string that gives the reason for condition's last transition. If it reports "ResizeStarted" that means the underlying persistent volume is being resized.
     */
    "reason"?: string;
    "status": string;
    "type": string;
}
/**
 * PersistentVolumeClaimCondition contains details about state of pvc
 */
export declare class PersistentVolumeClaimCondition extends Model<IPersistentVolumeClaimCondition> implements IPersistentVolumeClaimCondition {
    "lastProbeTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<IPersistentVolumeClaimCondition>);
}
export { IPersistentVolumeClaimCondition as IIoK8sApiCoreV1PersistentVolumeClaimCondition, PersistentVolumeClaimCondition as IoK8sApiCoreV1PersistentVolumeClaimCondition };
