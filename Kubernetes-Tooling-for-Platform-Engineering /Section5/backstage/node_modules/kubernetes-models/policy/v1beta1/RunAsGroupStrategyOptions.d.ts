import { IIoK8sApiPolicyV1beta1IDRange } from "./IDRange";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * RunAsGroupStrategyOptions defines the strategy type and any options used to create the strategy.
 */
export interface IRunAsGroupStrategyOptions {
    /**
     * ranges are the allowed ranges of gids that may be used. If you would like to force a single gid then supply a single range with the same start and end. Required for MustRunAs.
     */
    "ranges"?: Array<IIoK8sApiPolicyV1beta1IDRange>;
    /**
     * rule is the strategy that will dictate the allowable RunAsGroup values that may be set.
     */
    "rule": string;
}
/**
 * RunAsGroupStrategyOptions defines the strategy type and any options used to create the strategy.
 */
export declare class RunAsGroupStrategyOptions extends Model<IRunAsGroupStrategyOptions> implements IRunAsGroupStrategyOptions {
    "ranges"?: Array<IIoK8sApiPolicyV1beta1IDRange>;
    "rule": string;
    constructor(data?: ModelData<IRunAsGroupStrategyOptions>);
}
export { IRunAsGroupStrategyOptions as IIoK8sApiPolicyV1beta1RunAsGroupStrategyOptions, RunAsGroupStrategyOptions as IoK8sApiPolicyV1beta1RunAsGroupStrategyOptions };
