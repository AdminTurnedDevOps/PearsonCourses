import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodCondition contains details for the current condition of this pod.
 */
export interface IPodCondition {
    /**
     * Last time we probed the condition.
     */
    "lastProbeTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * Last time the condition transitioned from one status to another.
     */
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * Human-readable message indicating details about last transition.
     */
    "message"?: string;
    /**
     * Unique, one-word, CamelCase reason for the condition's last transition.
     */
    "reason"?: string;
    /**
     * Status is the status of the condition. Can be True, False, Unknown. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-conditions
     */
    "status": string;
    /**
     * Type is the type of the condition. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-conditions
     */
    "type": string;
}
/**
 * PodCondition contains details for the current condition of this pod.
 */
export declare class PodCondition extends Model<IPodCondition> implements IPodCondition {
    "lastProbeTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<IPodCondition>);
}
export { IPodCondition as IIoK8sApiCoreV1PodCondition, PodCondition as IoK8sApiCoreV1PodCondition };
