import { IIoK8sApiExtensionsV1beta1IDRange } from "./IDRange";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * RunAsGroupStrategyOptions defines the strategy type and any options used to create the strategy. Deprecated: use RunAsGroupStrategyOptions from policy API Group instead.
 * @deprecated
 */
export interface IRunAsGroupStrategyOptions {
    /**
     * ranges are the allowed ranges of gids that may be used. If you would like to force a single gid then supply a single range with the same start and end. Required for MustRunAs.
     */
    "ranges"?: Array<IIoK8sApiExtensionsV1beta1IDRange>;
    /**
     * rule is the strategy that will dictate the allowable RunAsGroup values that may be set.
     */
    "rule": string;
}
/**
 * RunAsGroupStrategyOptions defines the strategy type and any options used to create the strategy. Deprecated: use RunAsGroupStrategyOptions from policy API Group instead.
 * @deprecated
 */
export declare class RunAsGroupStrategyOptions extends Model<IRunAsGroupStrategyOptions> implements IRunAsGroupStrategyOptions {
    "ranges"?: Array<IIoK8sApiExtensionsV1beta1IDRange>;
    "rule": string;
    constructor(data?: ModelData<IRunAsGroupStrategyOptions>);
}
export { IRunAsGroupStrategyOptions as IIoK8sApiExtensionsV1beta1RunAsGroupStrategyOptions, RunAsGroupStrategyOptions as IoK8sApiExtensionsV1beta1RunAsGroupStrategyOptions };
