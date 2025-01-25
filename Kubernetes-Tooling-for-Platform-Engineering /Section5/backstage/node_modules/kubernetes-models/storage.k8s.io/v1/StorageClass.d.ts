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
     * allowVolumeExpansion shows whether the storage class allow volume expand.
     */
    "allowVolumeExpansion"?: boolean;
    /**
     * allowedTopologies restrict the node topologies where volumes can be dynamically provisioned. Each volume plugin defines its own supported topology specifications. An empty TopologySelectorTerm list means there is no topology restriction. This field is only honored by servers that enable the VolumeScheduling feature.
     */
    "allowedTopologies"?: Array<IIoK8sApiCoreV1TopologySelectorTerm>;
    "apiVersion": "storage.k8s.io/v1";
    "kind": "StorageClass";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * mountOptions controls the mountOptions for dynamically provisioned PersistentVolumes of this storage class. e.g. ["ro", "soft"]. Not validated - mount of the PVs will simply fail if one is invalid.
     */
    "mountOptions"?: Array<string>;
    /**
     * parameters holds the parameters for the provisioner that should create volumes of this storage class.
     */
    "parameters"?: {
        [key: string]: string;
    };
    /**
     * provisioner indicates the type of the provisioner.
     */
    "provisioner": string;
    /**
     * reclaimPolicy controls the reclaimPolicy for dynamically provisioned PersistentVolumes of this storage class. Defaults to Delete.
     *
     * Possible enum values:
     *  - `"Delete"` means the volume will be deleted from Kubernetes on release from its claim. The volume plugin must support Deletion.
     *  - `"Recycle"` means the volume will be recycled back into the pool of unbound persistent volumes on release from its claim. The volume plugin must support Recycling.
     *  - `"Retain"` means the volume will be left in its current phase (Released) for manual reclamation by the administrator. The default policy is Retain.
     */
    "reclaimPolicy"?: "Delete" | "Recycle" | "Retain";
    /**
     * volumeBindingMode indicates how PersistentVolumeClaims should be provisioned and bound.  When unset, VolumeBindingImmediate is used. This field is only honored by servers that enable the VolumeScheduling feature.
     *
     * Possible enum values:
     *  - `"Immediate"` indicates that PersistentVolumeClaims should be immediately provisioned and bound. This is the default mode.
     *  - `"WaitForFirstConsumer"` indicates that PersistentVolumeClaims should not be provisioned and bound until the first Pod is created that references the PeristentVolumeClaim. The volume provisioning and binding will occur during Pod scheduing.
     */
    "volumeBindingMode"?: "Immediate" | "WaitForFirstConsumer";
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
    "reclaimPolicy"?: "Delete" | "Recycle" | "Retain";
    "volumeBindingMode"?: "Immediate" | "WaitForFirstConsumer";
    static apiVersion: IStorageClass["apiVersion"];
    static kind: IStorageClass["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IStorageClass>;
    constructor(data?: ModelData<IStorageClass>);
}
export { IStorageClass as IIoK8sApiStorageV1StorageClass, StorageClass as IoK8sApiStorageV1StorageClass };
