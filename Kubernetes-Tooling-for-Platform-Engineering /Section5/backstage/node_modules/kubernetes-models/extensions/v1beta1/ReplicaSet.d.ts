import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiExtensionsV1beta1ReplicaSetSpec } from "./ReplicaSetSpec";
import { IIoK8sApiExtensionsV1beta1ReplicaSetStatus } from "./ReplicaSetStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * DEPRECATED - This group version of ReplicaSet is deprecated by apps/v1beta2/ReplicaSet. See the release notes for more information. ReplicaSet ensures that a specified number of pod replicas are running at any given time.
 * @deprecated
 */
export interface IReplicaSet extends TypeMeta {
    "apiVersion": "extensions/v1beta1";
    "kind": "ReplicaSet";
    /**
     * If the Labels of a ReplicaSet are empty, they are defaulted to be the same as the Pod(s) that the ReplicaSet manages. Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec defines the specification of the desired behavior of the ReplicaSet. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiExtensionsV1beta1ReplicaSetSpec;
    /**
     * Status is the most recently observed status of the ReplicaSet. This data may be out of date by some window of time. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "status"?: IIoK8sApiExtensionsV1beta1ReplicaSetStatus;
}
/**
 * DEPRECATED - This group version of ReplicaSet is deprecated by apps/v1beta2/ReplicaSet. See the release notes for more information. ReplicaSet ensures that a specified number of pod replicas are running at any given time.
 * @deprecated
 */
export declare class ReplicaSet extends Model<IReplicaSet> implements IReplicaSet {
    "apiVersion": IReplicaSet["apiVersion"];
    "kind": IReplicaSet["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiExtensionsV1beta1ReplicaSetSpec;
    "status"?: IIoK8sApiExtensionsV1beta1ReplicaSetStatus;
    static apiVersion: IReplicaSet["apiVersion"];
    static kind: IReplicaSet["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IReplicaSet>;
    constructor(data?: ModelData<IReplicaSet>);
}
export { IReplicaSet as IIoK8sApiExtensionsV1beta1ReplicaSet, ReplicaSet as IoK8sApiExtensionsV1beta1ReplicaSet };
