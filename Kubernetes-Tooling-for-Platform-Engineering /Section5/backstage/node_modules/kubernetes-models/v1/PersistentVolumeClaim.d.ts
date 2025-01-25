import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1PersistentVolumeClaimSpec } from "./PersistentVolumeClaimSpec";
import { IIoK8sApiCoreV1PersistentVolumeClaimStatus } from "./PersistentVolumeClaimStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PersistentVolumeClaim is a user's request for and claim to a persistent volume
 */
export interface IPersistentVolumeClaim extends TypeMeta {
    "apiVersion": "v1";
    "kind": "PersistentVolumeClaim";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
     */
    "spec"?: IIoK8sApiCoreV1PersistentVolumeClaimSpec;
    /**
     * status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
     */
    "status"?: IIoK8sApiCoreV1PersistentVolumeClaimStatus;
}
/**
 * PersistentVolumeClaim is a user's request for and claim to a persistent volume
 */
export declare class PersistentVolumeClaim extends Model<IPersistentVolumeClaim> implements IPersistentVolumeClaim {
    "apiVersion": IPersistentVolumeClaim["apiVersion"];
    "kind": IPersistentVolumeClaim["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiCoreV1PersistentVolumeClaimSpec;
    "status"?: IIoK8sApiCoreV1PersistentVolumeClaimStatus;
    static apiVersion: IPersistentVolumeClaim["apiVersion"];
    static kind: IPersistentVolumeClaim["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPersistentVolumeClaim>;
    constructor(data?: ModelData<IPersistentVolumeClaim>);
}
export { IPersistentVolumeClaim as IIoK8sApiCoreV1PersistentVolumeClaim, PersistentVolumeClaim as IoK8sApiCoreV1PersistentVolumeClaim };
