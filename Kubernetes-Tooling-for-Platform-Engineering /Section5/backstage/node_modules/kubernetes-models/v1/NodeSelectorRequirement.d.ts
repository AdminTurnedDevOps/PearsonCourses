import { ModelData, Model } from "@kubernetes-models/base";
/**
 * A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
 */
export interface INodeSelectorRequirement {
    /**
     * The label key that the selector applies to.
     */
    "key": string;
    /**
     * Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
     *
     * Possible enum values:
     *  - `"DoesNotExist"`
     *  - `"Exists"`
     *  - `"Gt"`
     *  - `"In"`
     *  - `"Lt"`
     *  - `"NotIn"`
     */
    "operator": "DoesNotExist" | "Exists" | "Gt" | "In" | "Lt" | "NotIn";
    /**
     * An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.
     */
    "values"?: Array<string>;
}
/**
 * A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
 */
export declare class NodeSelectorRequirement extends Model<INodeSelectorRequirement> implements INodeSelectorRequirement {
    "key": string;
    "operator": "DoesNotExist" | "Exists" | "Gt" | "In" | "Lt" | "NotIn";
    "values"?: Array<string>;
    constructor(data?: ModelData<INodeSelectorRequirement>);
}
export { INodeSelectorRequirement as IIoK8sApiCoreV1NodeSelectorRequirement, NodeSelectorRequirement as IoK8sApiCoreV1NodeSelectorRequirement };
