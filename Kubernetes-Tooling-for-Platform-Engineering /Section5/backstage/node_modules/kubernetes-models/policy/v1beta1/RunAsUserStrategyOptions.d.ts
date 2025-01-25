import { IIoK8sApiPolicyV1beta1IDRange } from "./IDRange";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * RunAsUserStrategyOptions defines the strategy type and any options used to create the strategy.
 */
export interface IRunAsUserStrategyOptions {
    /**
     * ranges are the allowed ranges of uids that may be used. If you would like to force a single uid then supply a single range with the same start and end. Required for MustRunAs.
     */
    "ranges"?: Array<IIoK8sApiPolicyV1beta1IDRange>;
    /**
     * rule is the strategy that will dictate the allowable RunAsUser values that may be set.
     */
    "rule": string;
}
/**
 * RunAsUserStrategyOptions defines the strategy type and any options used to create the strategy.
 */
export declare class RunAsUserStrategyOptions extends Model<IRunAsUserStrategyOptions> implements IRunAsUserStrategyOptions {
    "ranges"?: Array<IIoK8sApiPolicyV1beta1IDRange>;
    "rule": string;
    constructor(data?: ModelData<IRunAsUserStrategyOptions>);
}
export { IRunAsUserStrategyOptions as IIoK8sApiPolicyV1beta1RunAsUserStrategyOptions, RunAsUserStrategyOptions as IoK8sApiPolicyV1beta1RunAsUserStrategyOptions };
