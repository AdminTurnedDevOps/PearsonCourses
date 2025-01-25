import { IIoK8sApiCoreV1TopologySelectorLabelRequirement } from "./TopologySelectorLabelRequirement";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * A topology selector term represents the result of label queries. A null or empty topology selector term matches no objects. The requirements of them are ANDed. It provides a subset of functionality as NodeSelectorTerm. This is an alpha feature and may change in the future.
 */
export interface ITopologySelectorTerm {
    /**
     * A list of topology selector requirements by labels.
     */
    "matchLabelExpressions"?: Array<IIoK8sApiCoreV1TopologySelectorLabelRequirement>;
}
/**
 * A topology selector term represents the result of label queries. A null or empty topology selector term matches no objects. The requirements of them are ANDed. It provides a subset of functionality as NodeSelectorTerm. This is an alpha feature and may change in the future.
 */
export declare class TopologySelectorTerm extends Model<ITopologySelectorTerm> implements ITopologySelectorTerm {
    "matchLabelExpressions"?: Array<IIoK8sApiCoreV1TopologySelectorLabelRequirement>;
    constructor(data?: ModelData<ITopologySelectorTerm>);
}
export { ITopologySelectorTerm as IIoK8sApiCoreV1TopologySelectorTerm, TopologySelectorTerm as IoK8sApiCoreV1TopologySelectorTerm };
