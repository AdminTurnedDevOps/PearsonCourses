import { IIoK8sApiStorageV1CSIStorageCapacity } from "./CSIStorageCapacity";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * CSIStorageCapacityList is a collection of CSIStorageCapacity objects.
 */
export interface ICSIStorageCapacityList extends TypeMeta {
    "apiVersion": "storage.k8s.io/v1";
    /**
     * items is the list of CSIStorageCapacity objects.
     */
    "items": Array<IIoK8sApiStorageV1CSIStorageCapacity>;
    "kind": "CSIStorageCapacityList";
    /**
     * Standard list metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * CSIStorageCapacityList is a collection of CSIStorageCapacity objects.
 */
export declare class CSIStorageCapacityList extends Model<ICSIStorageCapacityList> implements ICSIStorageCapacityList {
    "apiVersion": ICSIStorageCapacityList["apiVersion"];
    "items": Array<IIoK8sApiStorageV1CSIStorageCapacity>;
    "kind": ICSIStorageCapacityList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: ICSIStorageCapacityList["apiVersion"];
    static kind: ICSIStorageCapacityList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICSIStorageCapacityList>;
    constructor(data?: ModelData<ICSIStorageCapacityList>);
}
export { ICSIStorageCapacityList as IIoK8sApiStorageV1CSIStorageCapacityList, CSIStorageCapacityList as IoK8sApiStorageV1CSIStorageCapacityList };
