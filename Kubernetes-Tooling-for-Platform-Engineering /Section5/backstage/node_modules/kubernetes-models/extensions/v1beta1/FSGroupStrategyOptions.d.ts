import { IIoK8sApiExtensionsV1beta1IDRange } from "./IDRange";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * FSGroupStrategyOptions defines the strategy type and options used to create the strategy. Deprecated: use FSGroupStrategyOptions from policy API Group instead.
 * @deprecated
 */
export interface IFSGroupStrategyOptions {
    /**
     * ranges are the allowed ranges of fs groups.  If you would like to force a single fs group then supply a single range with the same start and end. Required for MustRunAs.
     */
    "ranges"?: Array<IIoK8sApiExtensionsV1beta1IDRange>;
    /**
     * rule is the strategy that will dictate what FSGroup is used in the SecurityContext.
     */
    "rule"?: string;
}
/**
 * FSGroupStrategyOptions defines the strategy type and options used to create the strategy. Deprecated: use FSGroupStrategyOptions from policy API Group instead.
 * @deprecated
 */
export declare class FSGroupStrategyOptions extends Model<IFSGroupStrategyOptions> implements IFSGroupStrategyOptions {
    "ranges"?: Array<IIoK8sApiExtensionsV1beta1IDRange>;
    "rule"?: string;
    constructor(data?: ModelData<IFSGroupStrategyOptions>);
}
export { IFSGroupStrategyOptions as IIoK8sApiExtensionsV1beta1FSGroupStrategyOptions, FSGroupStrategyOptions as IoK8sApiExtensionsV1beta1FSGroupStrategyOptions };
