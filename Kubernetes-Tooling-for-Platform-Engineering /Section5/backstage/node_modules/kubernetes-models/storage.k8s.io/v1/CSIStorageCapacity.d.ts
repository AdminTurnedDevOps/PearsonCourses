import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * CSIStorageCapacity stores the result of one CSI GetCapacity call. For a given StorageClass, this describes the available capacity in a particular topology segment.  This can be used when considering where to instantiate new PersistentVolumes.
 *
 * For example this can express things like: - StorageClass "standard" has "1234 GiB" available in "topology.kubernetes.io/zone=us-east1" - StorageClass "localssd" has "10 GiB" available in "kubernetes.io/hostname=knode-abc123"
 *
 * The following three cases all imply that no capacity is available for a certain combination: - no object exists with suitable topology and storage class name - such an object exists, but the capacity is unset - such an object exists, but the capacity is zero
 *
 * The producer of these objects can decide which approach is more suitable.
 *
 * They are consumed by the kube-scheduler when a CSI driver opts into capacity-aware scheduling with CSIDriverSpec.StorageCapacity. The scheduler compares the MaximumVolumeSize against the requested size of pending volumes to filter out unsuitable nodes. If MaximumVolumeSize is unset, it falls back to a comparison against the less precise Capacity. If that is also unset, the scheduler assumes that capacity is insufficient and tries some other node.
 */
export interface ICSIStorageCapacity extends TypeMeta {
    "apiVersion": "storage.k8s.io/v1";
    /**
     * capacity is the value reported by the CSI driver in its GetCapacityResponse for a GetCapacityRequest with topology and parameters that match the previous fields.
     *
     * The semantic is currently (CSI spec 1.2) defined as: The available capacity, in bytes, of the storage that can be used to provision volumes. If not set, that information is currently unavailable.
     */
    "capacity"?: IIoK8sApimachineryPkgApiResourceQuantity;
    "kind": "CSIStorageCapacity";
    /**
     * maximumVolumeSize is the value reported by the CSI driver in its GetCapacityResponse for a GetCapacityRequest with topology and parameters that match the previous fields.
     *
     * This is defined since CSI spec 1.4.0 as the largest size that may be used in a CreateVolumeRequest.capacity_range.required_bytes field to create a volume with the same parameters as those in GetCapacityRequest. The corresponding value in the Kubernetes API is ResourceRequirements.Requests in a volume claim.
     */
    "maximumVolumeSize"?: IIoK8sApimachineryPkgApiResourceQuantity;
    /**
     * Standard object's metadata. The name has no particular meaning. It must be a DNS subdomain (dots allowed, 253 characters). To ensure that there are no conflicts with other CSI drivers on the cluster, the recommendation is to use csisc-<uuid>, a generated name, or a reverse-domain name which ends with the unique CSI driver name.
     *
     * Objects are namespaced.
     *
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * nodeTopology defines which nodes have access to the storage for which capacity was reported. If not set, the storage is not accessible from any node in the cluster. If empty, the storage is accessible from all nodes. This field is immutable.
     */
    "nodeTopology"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * storageClassName represents the name of the StorageClass that the reported capacity applies to. It must meet the same requirements as the name of a StorageClass object (non-empty, DNS subdomain). If that object no longer exists, the CSIStorageCapacity object is obsolete and should be removed by its creator. This field is immutable.
     */
    "storageClassName": string;
}
/**
 * CSIStorageCapacity stores the result of one CSI GetCapacity call. For a given StorageClass, this describes the available capacity in a particular topology segment.  This can be used when considering where to instantiate new PersistentVolumes.
 *
 * For example this can express things like: - StorageClass "standard" has "1234 GiB" available in "topology.kubernetes.io/zone=us-east1" - StorageClass "localssd" has "10 GiB" available in "kubernetes.io/hostname=knode-abc123"
 *
 * The following three cases all imply that no capacity is available for a certain combination: - no object exists with suitable topology and storage class name - such an object exists, but the capacity is unset - such an object exists, but the capacity is zero
 *
 * The producer of these objects can decide which approach is more suitable.
 *
 * They are consumed by the kube-scheduler when a CSI driver opts into capacity-aware scheduling with CSIDriverSpec.StorageCapacity. The scheduler compares the MaximumVolumeSize against the requested size of pending volumes to filter out unsuitable nodes. If MaximumVolumeSize is unset, it falls back to a comparison against the less precise Capacity. If that is also unset, the scheduler assumes that capacity is insufficient and tries some other node.
 */
export declare class CSIStorageCapacity extends Model<ICSIStorageCapacity> implements ICSIStorageCapacity {
    "apiVersion": ICSIStorageCapacity["apiVersion"];
    "capacity"?: IIoK8sApimachineryPkgApiResourceQuantity;
    "kind": ICSIStorageCapacity["kind"];
    "maximumVolumeSize"?: IIoK8sApimachineryPkgApiResourceQuantity;
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "nodeTopology"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "storageClassName": string;
    static apiVersion: ICSIStorageCapacity["apiVersion"];
    static kind: ICSIStorageCapacity["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICSIStorageCapacity>;
    constructor(data?: ModelData<ICSIStorageCapacity>);
}
export { ICSIStorageCapacity as IIoK8sApiStorageV1CSIStorageCapacity, CSIStorageCapacity as IoK8sApiStorageV1CSIStorageCapacity };
