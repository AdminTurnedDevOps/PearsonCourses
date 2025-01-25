import { IIoK8sApiStorageV1beta1StorageClass } from "./StorageClass";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * StorageClassList is a collection of storage classes.
 */
export interface IStorageClassList extends TypeMeta {
    "apiVersion": "storage.k8s.io/v1beta1";
    /**
     * Items is the list of StorageClasses
     */
    "items": Array<IIoK8sApiStorageV1beta1StorageClass>;
    "kind": "StorageClassList";
    /**
     * Standard list metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * StorageClassList is a collection of storage classes.
 */
export declare class StorageClassList extends Model<IStorageClassList> implements IStorageClassList {
    "apiVersion": IStorageClassList["apiVersion"];
    "items": Array<IIoK8sApiStorageV1beta1StorageClass>;
    "kind": IStorageClassList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IStorageClassList["apiVersion"];
    static kind: IStorageClassList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IStorageClassList>;
    constructor(data?: ModelData<IStorageClassList>);
}
export { IStorageClassList as IIoK8sApiStorageV1beta1StorageClassList, StorageClassList as IoK8sApiStorageV1beta1StorageClassList };
