import { IIoK8sApiStorageV1CSINode } from "./CSINode";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * CSINodeList is a collection of CSINode objects.
 */
export interface ICSINodeList extends TypeMeta {
    "apiVersion": "storage.k8s.io/v1";
    /**
     * items is the list of CSINode
     */
    "items": Array<IIoK8sApiStorageV1CSINode>;
    "kind": "CSINodeList";
    /**
     * Standard list metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * CSINodeList is a collection of CSINode objects.
 */
export declare class CSINodeList extends Model<ICSINodeList> implements ICSINodeList {
    "apiVersion": ICSINodeList["apiVersion"];
    "items": Array<IIoK8sApiStorageV1CSINode>;
    "kind": ICSINodeList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: ICSINodeList["apiVersion"];
    static kind: ICSINodeList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICSINodeList>;
    constructor(data?: ModelData<ICSINodeList>);
}
export { ICSINodeList as IIoK8sApiStorageV1CSINodeList, CSINodeList as IoK8sApiStorageV1CSINodeList };
