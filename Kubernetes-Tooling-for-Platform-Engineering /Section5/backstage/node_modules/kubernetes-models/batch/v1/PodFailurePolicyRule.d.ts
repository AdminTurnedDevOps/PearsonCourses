import { IIoK8sApiBatchV1PodFailurePolicyOnExitCodesRequirement } from "./PodFailurePolicyOnExitCodesRequirement";
import { IIoK8sApiBatchV1PodFailurePolicyOnPodConditionsPattern } from "./PodFailurePolicyOnPodConditionsPattern";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodFailurePolicyRule describes how a pod failure is handled when the requirements are met. One of onExitCodes and onPodConditions, but not both, can be used in each rule.
 */
export interface IPodFailurePolicyRule {
    /**
     * Specifies the action taken on a pod failure when the requirements are satisfied. Possible values are:
     *
     * - FailJob: indicates that the pod's job is marked as Failed and all
     *   running pods are terminated.
     * - Ignore: indicates that the counter towards the .backoffLimit is not
     *   incremented and a replacement pod is created.
     * - Count: indicates that the pod is handled in the default way - the
     *   counter towards the .backoffLimit is incremented.
     * Additional values are considered to be added in the future. Clients should react to an unknown action by skipping the rule.
     *
     * Possible enum values:
     *  - `"Count"` This is an action which might be taken on a pod failure - the pod failure is handled in the default way - the counter towards .backoffLimit, represented by the job's .status.failed field, is incremented.
     *  - `"FailJob"` This is an action which might be taken on a pod failure - mark the pod's job as Failed and terminate all running pods.
     *  - `"Ignore"` This is an action which might be taken on a pod failure - the counter towards .backoffLimit, represented by the job's .status.failed field, is not incremented and a replacement pod is created.
     */
    "action": "Count" | "FailJob" | "Ignore";
    /**
     * Represents the requirement on the container exit codes.
     */
    "onExitCodes"?: IIoK8sApiBatchV1PodFailurePolicyOnExitCodesRequirement;
    /**
     * Represents the requirement on the pod conditions. The requirement is represented as a list of pod condition patterns. The requirement is satisfied if at least one pattern matches an actual pod condition. At most 20 elements are allowed.
     */
    "onPodConditions": Array<IIoK8sApiBatchV1PodFailurePolicyOnPodConditionsPattern>;
}
/**
 * PodFailurePolicyRule describes how a pod failure is handled when the requirements are met. One of onExitCodes and onPodConditions, but not both, can be used in each rule.
 */
export declare class PodFailurePolicyRule extends Model<IPodFailurePolicyRule> implements IPodFailurePolicyRule {
    "action": "Count" | "FailJob" | "Ignore";
    "onExitCodes"?: IIoK8sApiBatchV1PodFailurePolicyOnExitCodesRequirement;
    "onPodConditions": Array<IIoK8sApiBatchV1PodFailurePolicyOnPodConditionsPattern>;
    constructor(data?: ModelData<IPodFailurePolicyRule>);
}
export { IPodFailurePolicyRule as IIoK8sApiBatchV1PodFailurePolicyRule, PodFailurePolicyRule as IoK8sApiBatchV1PodFailurePolicyRule };
