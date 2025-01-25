import { IIoK8sApimachineryPkgApisMetaV1LabelSelectorRequirement } from "./LabelSelectorRequirement";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.
 */
export interface ILabelSelector {
    /**
     * matchExpressions is a list of label selector requirements. The requirements are ANDed.
     */
    "matchExpressions"?: Array<IIoK8sApimachineryPkgApisMetaV1LabelSelectorRequirement>;
    /**
     * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
     */
    "matchLabels"?: {
        [key: string]: string;
    };
}
/**
 * A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.
 */
export declare class LabelSelector extends Model<ILabelSelector> implements ILabelSelector {
    "matchExpressions"?: Array<IIoK8sApimachineryPkgApisMetaV1LabelSelectorRequirement>;
    "matchLabels"?: {
        [key: string]: string;
    };
    constructor(data?: ModelData<ILabelSelector>);
}
export { ILabelSelector as IIoK8sApimachineryPkgApisMetaV1LabelSelector, LabelSelector as IoK8sApimachineryPkgApisMetaV1LabelSelector };
