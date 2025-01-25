import { IIoK8sApiPolicyV1beta1IDRange } from "./IDRange";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * SupplementalGroupsStrategyOptions defines the strategy type and options used to create the strategy.
 */
export interface ISupplementalGroupsStrategyOptions {
    /**
     * ranges are the allowed ranges of supplemental groups.  If you would like to force a single supplemental group then supply a single range with the same start and end. Required for MustRunAs.
     */
    "ranges"?: Array<IIoK8sApiPolicyV1beta1IDRange>;
    /**
     * rule is the strategy that will dictate what supplemental groups is used in the SecurityContext.
     */
    "rule"?: string;
}
/**
 * SupplementalGroupsStrategyOptions defines the strategy type and options used to create the strategy.
 */
export declare class SupplementalGroupsStrategyOptions extends Model<ISupplementalGroupsStrategyOptions> implements ISupplementalGroupsStrategyOptions {
    "ranges"?: Array<IIoK8sApiPolicyV1beta1IDRange>;
    "rule"?: string;
    constructor(data?: ModelData<ISupplementalGroupsStrategyOptions>);
}
export { ISupplementalGroupsStrategyOptions as IIoK8sApiPolicyV1beta1SupplementalGroupsStrategyOptions, SupplementalGroupsStrategyOptions as IoK8sApiPolicyV1beta1SupplementalGroupsStrategyOptions };
