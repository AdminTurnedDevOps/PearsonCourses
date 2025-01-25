import { IIoK8sApiBatchV1PodFailurePolicyRule } from "./PodFailurePolicyRule";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodFailurePolicy describes how failed pods influence the backoffLimit.
 */
export interface IPodFailurePolicy {
    /**
     * A list of pod failure policy rules. The rules are evaluated in order. Once a rule matches a Pod failure, the remaining of the rules are ignored. When no rule matches the Pod failure, the default handling applies - the counter of pod failures is incremented and it is checked against the backoffLimit. At most 20 elements are allowed.
     */
    "rules": Array<IIoK8sApiBatchV1PodFailurePolicyRule>;
}
/**
 * PodFailurePolicy describes how failed pods influence the backoffLimit.
 */
export declare class PodFailurePolicy extends Model<IPodFailurePolicy> implements IPodFailurePolicy {
    "rules": Array<IIoK8sApiBatchV1PodFailurePolicyRule>;
    constructor(data?: ModelData<IPodFailurePolicy>);
}
export { IPodFailurePolicy as IIoK8sApiBatchV1PodFailurePolicy, PodFailurePolicy as IoK8sApiBatchV1PodFailurePolicy };
