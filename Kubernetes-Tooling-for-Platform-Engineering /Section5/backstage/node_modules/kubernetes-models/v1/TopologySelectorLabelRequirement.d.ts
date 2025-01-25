import { ModelData, Model } from "@kubernetes-models/base";
/**
 * A topology selector requirement is a selector that matches given label. This is an alpha feature and may change in the future.
 */
export interface ITopologySelectorLabelRequirement {
    /**
     * The label key that the selector applies to.
     */
    "key": string;
    /**
     * An array of string values. One value must match the label to be selected. Each entry in Values is ORed.
     */
    "values": Array<string>;
}
/**
 * A topology selector requirement is a selector that matches given label. This is an alpha feature and may change in the future.
 */
export declare class TopologySelectorLabelRequirement extends Model<ITopologySelectorLabelRequirement> implements ITopologySelectorLabelRequirement {
    "key": string;
    "values": Array<string>;
    constructor(data?: ModelData<ITopologySelectorLabelRequirement>);
}
export { ITopologySelectorLabelRequirement as IIoK8sApiCoreV1TopologySelectorLabelRequirement, TopologySelectorLabelRequirement as IoK8sApiCoreV1TopologySelectorLabelRequirement };
