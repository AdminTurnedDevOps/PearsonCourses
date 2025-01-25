import { IIoK8sApiCoreV1ScopedResourceSelectorRequirement } from "./ScopedResourceSelectorRequirement";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * A scope selector represents the AND of the selectors represented by the scoped-resource selector requirements.
 */
export interface IScopeSelector {
    /**
     * A list of scope selector requirements by scope of the resources.
     */
    "matchExpressions"?: Array<IIoK8sApiCoreV1ScopedResourceSelectorRequirement>;
}
/**
 * A scope selector represents the AND of the selectors represented by the scoped-resource selector requirements.
 */
export declare class ScopeSelector extends Model<IScopeSelector> implements IScopeSelector {
    "matchExpressions"?: Array<IIoK8sApiCoreV1ScopedResourceSelectorRequirement>;
    constructor(data?: ModelData<IScopeSelector>);
}
export { IScopeSelector as IIoK8sApiCoreV1ScopeSelector, ScopeSelector as IoK8sApiCoreV1ScopeSelector };
