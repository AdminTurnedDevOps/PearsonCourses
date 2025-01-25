import { IIoK8sApiCoreV1PreferredSchedulingTerm } from "./PreferredSchedulingTerm";
import { IIoK8sApiCoreV1NodeSelector } from "./NodeSelector";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Node affinity is a group of node affinity scheduling rules.
 */
export interface INodeAffinity {
    /**
     * The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node matches the corresponding matchExpressions; the node(s) with the highest sum are the most preferred.
     */
    "preferredDuringSchedulingIgnoredDuringExecution"?: Array<IIoK8sApiCoreV1PreferredSchedulingTerm>;
    /**
     * If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to an update), the system may or may not try to eventually evict the pod from its node.
     */
    "requiredDuringSchedulingIgnoredDuringExecution"?: IIoK8sApiCoreV1NodeSelector;
}
/**
 * Node affinity is a group of node affinity scheduling rules.
 */
export declare class NodeAffinity extends Model<INodeAffinity> implements INodeAffinity {
    "preferredDuringSchedulingIgnoredDuringExecution"?: Array<IIoK8sApiCoreV1PreferredSchedulingTerm>;
    "requiredDuringSchedulingIgnoredDuringExecution"?: IIoK8sApiCoreV1NodeSelector;
    constructor(data?: ModelData<INodeAffinity>);
}
export { INodeAffinity as IIoK8sApiCoreV1NodeAffinity, NodeAffinity as IoK8sApiCoreV1NodeAffinity };
