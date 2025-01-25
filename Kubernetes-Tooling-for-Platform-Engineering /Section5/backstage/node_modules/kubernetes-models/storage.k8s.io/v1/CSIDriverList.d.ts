import { IIoK8sApiStorageV1CSIDriver } from "./CSIDriver";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * CSIDriverList is a collection of CSIDriver objects.
 */
export interface ICSIDriverList extends TypeMeta {
    "apiVersion": "storage.k8s.io/v1";
    /**
     * items is the list of CSIDriver
     */
    "items": Array<IIoK8sApiStorageV1CSIDriver>;
    "kind": "CSIDriverList";
    /**
     * Standard list metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * CSIDriverList is a collection of CSIDriver objects.
 */
export declare class CSIDriverList extends Model<ICSIDriverList> implements ICSIDriverList {
    "apiVersion": ICSIDriverList["apiVersion"];
    "items": Array<IIoK8sApiStorageV1CSIDriver>;
    "kind": ICSIDriverList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: ICSIDriverList["apiVersion"];
    static kind: ICSIDriverList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICSIDriverList>;
    constructor(data?: ModelData<ICSIDriverList>);
}
export { ICSIDriverList as IIoK8sApiStorageV1CSIDriverList, CSIDriverList as IoK8sApiStorageV1CSIDriverList };
