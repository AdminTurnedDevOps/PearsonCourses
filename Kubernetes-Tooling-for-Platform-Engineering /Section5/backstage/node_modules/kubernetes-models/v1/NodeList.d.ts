import { IIoK8sApiCoreV1Node } from "./Node";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * NodeList is the whole list of all Nodes which have been registered with master.
 */
export interface INodeList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * List of nodes
     */
    "items": Array<IIoK8sApiCoreV1Node>;
    "kind": "NodeList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * NodeList is the whole list of all Nodes which have been registered with master.
 */
export declare class NodeList extends Model<INodeList> implements INodeList {
    "apiVersion": INodeList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1Node>;
    "kind": INodeList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: INodeList["apiVersion"];
    static kind: INodeList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<INodeList>;
    constructor(data?: ModelData<INodeList>);
}
export { INodeList as IIoK8sApiCoreV1NodeList, NodeList as IoK8sApiCoreV1NodeList };
