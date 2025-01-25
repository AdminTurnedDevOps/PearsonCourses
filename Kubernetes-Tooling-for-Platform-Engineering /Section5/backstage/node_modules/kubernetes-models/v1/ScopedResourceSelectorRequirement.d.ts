import { ModelData, Model } from "@kubernetes-models/base";
/**
 * A scoped-resource selector requirement is a selector that contains values, a scope name, and an operator that relates the scope name and values.
 */
export interface IScopedResourceSelectorRequirement {
    /**
     * Represents a scope's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist.
     *
     * Possible enum values:
     *  - `"DoesNotExist"`
     *  - `"Exists"`
     *  - `"In"`
     *  - `"NotIn"`
     */
    "operator": "DoesNotExist" | "Exists" | "In" | "NotIn";
    /**
     * The name of the scope that the selector applies to.
     *
     * Possible enum values:
     *  - `"BestEffort"` Match all pod objects that have best effort quality of service
     *  - `"CrossNamespacePodAffinity"` Match all pod objects that have cross-namespace pod (anti)affinity mentioned.
     *  - `"NotBestEffort"` Match all pod objects that do not have best effort quality of service
     *  - `"NotTerminating"` Match all pod objects where spec.activeDeadlineSeconds is nil
     *  - `"PriorityClass"` Match all pod objects that have priority class mentioned
     *  - `"Terminating"` Match all pod objects where spec.activeDeadlineSeconds >=0
     */
    "scopeName": "BestEffort" | "CrossNamespacePodAffinity" | "NotBestEffort" | "NotTerminating" | "PriorityClass" | "Terminating";
    /**
     * An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
     */
    "values"?: Array<string>;
}
/**
 * A scoped-resource selector requirement is a selector that contains values, a scope name, and an operator that relates the scope name and values.
 */
export declare class ScopedResourceSelectorRequirement extends Model<IScopedResourceSelectorRequirement> implements IScopedResourceSelectorRequirement {
    "operator": "DoesNotExist" | "Exists" | "In" | "NotIn";
    "scopeName": "BestEffort" | "CrossNamespacePodAffinity" | "NotBestEffort" | "NotTerminating" | "PriorityClass" | "Terminating";
    "values"?: Array<string>;
    constructor(data?: ModelData<IScopedResourceSelectorRequirement>);
}
export { IScopedResourceSelectorRequirement as IIoK8sApiCoreV1ScopedResourceSelectorRequirement, ScopedResourceSelectorRequirement as IoK8sApiCoreV1ScopedResourceSelectorRequirement };
