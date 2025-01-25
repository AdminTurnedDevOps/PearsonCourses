import { IIoK8sApiCoreV1TopologySelectorTerm } from "../../v1/TopologySelectorTerm";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * StorageClass describes the parameters for a class of storage for which PersistentVolumes can be dynamically provisioned.
 *
 * StorageClasses are non-namespaced; the name of the storage class according to etcd is in ObjectMeta.Name.
 */
export interface IStorageClass extends TypeMeta {
    /**
     * AllowVolumeExpansion shows whether the storage class allow volume expand
     */
    "allowVolumeExpansion"?: boolean;
    /**
     * Restrict the node topologies where volumes can be dynamically provisioned. Each volume plugin defines its own supported topology specifications. An empty TopologySelectorTerm list means there is no topology restriction. This field is only honored by servers that enable the VolumeScheduling feature.
     */
    "allowedTopologies"?: Array<IIoK8sApiCoreV1TopologySelectorTerm>;
    "apiVersion": "storage.k8s.io/v1beta1";
    "kind": "StorageClass";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Dynamically provisioned PersistentVolumes of this storage class are created with these mountOptions, e.g. ["ro", "soft"]. Not validated - mount of the PVs will simply fail if one is invalid.
     */
    "mountOptions"?: Array<string>;
    /**
     * Parameters holds the parameters for the provisioner that should create volumes of this storage class.
     */
    "parameters"?: {
        [key: string]: string;
    };
    /**
     * Provisioner indicates the type of the provisioner.
     */
    "provisioner": string;
    /**
     * Dynamically provisioned PersistentVolumes of this storage class are created with this reclaimPolicy. Defaults to Delete.
     */
    "reclaimPolicy"?: string;
    /**
     * VolumeBindingMode indicates how PersistentVolumeClaims should be provisioned and bound.  When unset, VolumeBindingImmediate is used. This field is only honored by servers that enable the VolumeScheduling feature.
     */
    "volumeBindingMode"?: string;
}
/**
 * StorageClass describes the parameters for a class of storage for which PersistentVolumes can be dynamically provisioned.
 *
 * StorageClasses are non-namespaced; the name of the storage class according to etcd is in ObjectMeta.Name.
 */
export declare class StorageClass extends Model<IStorageClass> implements IStorageClass {
    "allowVolumeExpansion"?: boolean;
    "allowedTopologies"?: Array<IIoK8sApiCoreV1TopologySelectorTerm>;
    "apiVersion": IStorageClass["apiVersion"];
    "kind": IStorageClass["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "mountOptions"?: Array<string>;
    "parameters"?: {
        [key: string]: string;
    };
    "provisioner": string;
    "reclaimPolicy"?: string;
    "volumeBindingMode"?: string;
    static apiVersion: IStorageClass["apiVersion"];
    static kind: IStorageClass["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IStorageClass>;
    constructor(data?: ModelData<IStorageClass>);
}
export { IStorageClass as IIoK8sApiStorageV1beta1StorageClass, StorageClass as IoK8sApiStorageV1beta1StorageClass };
