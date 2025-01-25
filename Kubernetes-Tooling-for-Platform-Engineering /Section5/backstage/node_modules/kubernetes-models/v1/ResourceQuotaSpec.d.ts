import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { IIoK8sApiCoreV1ScopeSelector } from "./ScopeSelector";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ResourceQuotaSpec defines the desired hard limits to enforce for Quota.
 */
export interface IResourceQuotaSpec {
    /**
     * hard is the set of desired hard limits for each named resource. More info: https://kubernetes.io/docs/concepts/policy/resource-quotas/
     */
    "hard"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * scopeSelector is also a collection of filters like scopes that must match each object tracked by a quota but expressed using ScopeSelectorOperator in combination with possible values. For a resource to match, both scopes AND scopeSelector (if specified in spec), must be matched.
     */
    "scopeSelector"?: IIoK8sApiCoreV1ScopeSelector;
    /**
     * A collection of filters that must match each object tracked by a quota. If not specified, the quota matches all objects.
     */
    "scopes"?: Array<string>;
}
/**
 * ResourceQuotaSpec defines the desired hard limits to enforce for Quota.
 */
export declare class ResourceQuotaSpec extends Model<IResourceQuotaSpec> implements IResourceQuotaSpec {
    "hard"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "scopeSelector"?: IIoK8sApiCoreV1ScopeSelector;
    "scopes"?: Array<string>;
    constructor(data?: ModelData<IResourceQuotaSpec>);
}
export { IResourceQuotaSpec as IIoK8sApiCoreV1ResourceQuotaSpec, ResourceQuotaSpec as IoK8sApiCoreV1ResourceQuotaSpec };
