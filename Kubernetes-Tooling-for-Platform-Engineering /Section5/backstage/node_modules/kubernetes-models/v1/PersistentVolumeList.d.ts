import { IIoK8sApiCoreV1PersistentVolume } from "./PersistentVolume";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PersistentVolumeList is a list of PersistentVolume items.
 */
export interface IPersistentVolumeList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * items is a list of persistent volumes. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes
     */
    "items": Array<IIoK8sApiCoreV1PersistentVolume>;
    "kind": "PersistentVolumeList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * PersistentVolumeList is a list of PersistentVolume items.
 */
export declare class PersistentVolumeList extends Model<IPersistentVolumeList> implements IPersistentVolumeList {
    "apiVersion": IPersistentVolumeList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1PersistentVolume>;
    "kind": IPersistentVolumeList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IPersistentVolumeList["apiVersion"];
    static kind: IPersistentVolumeList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPersistentVolumeList>;
    constructor(data?: ModelData<IPersistentVolumeList>);
}
export { IPersistentVolumeList as IIoK8sApiCoreV1PersistentVolumeList, PersistentVolumeList as IoK8sApiCoreV1PersistentVolumeList };
