import { IIoK8sApiCoreV1NodeSelectorRequirement } from "./NodeSelectorRequirement";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * A null or empty node selector term matches no objects. The requirements of them are ANDed. The TopologySelectorTerm type implements a subset of the NodeSelectorTerm.
 */
export interface INodeSelectorTerm {
    /**
     * A list of node selector requirements by node's labels.
     */
    "matchExpressions"?: Array<IIoK8sApiCoreV1NodeSelectorRequirement>;
    /**
     * A list of node selector requirements by node's fields.
     */
    "matchFields"?: Array<IIoK8sApiCoreV1NodeSelectorRequirement>;
}
/**
 * A null or empty node selector term matches no objects. The requirements of them are ANDed. The TopologySelectorTerm type implements a subset of the NodeSelectorTerm.
 */
export declare class NodeSelectorTerm extends Model<INodeSelectorTerm> implements INodeSelectorTerm {
    "matchExpressions"?: Array<IIoK8sApiCoreV1NodeSelectorRequirement>;
    "matchFields"?: Array<IIoK8sApiCoreV1NodeSelectorRequirement>;
    constructor(data?: ModelData<INodeSelectorTerm>);
}
export { INodeSelectorTerm as IIoK8sApiCoreV1NodeSelectorTerm, NodeSelectorTerm as IoK8sApiCoreV1NodeSelectorTerm };
