import { IIoK8sApiAppsV1ReplicaSet } from "./ReplicaSet";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ReplicaSetList is a collection of ReplicaSets.
 */
export interface IReplicaSetList extends TypeMeta {
    "apiVersion": "apps/v1";
    /**
     * List of ReplicaSets. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller
     */
    "items": Array<IIoK8sApiAppsV1ReplicaSet>;
    "kind": "ReplicaSetList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * ReplicaSetList is a collection of ReplicaSets.
 */
export declare class ReplicaSetList extends Model<IReplicaSetList> implements IReplicaSetList {
    "apiVersion": IReplicaSetList["apiVersion"];
    "items": Array<IIoK8sApiAppsV1ReplicaSet>;
    "kind": IReplicaSetList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IReplicaSetList["apiVersion"];
    static kind: IReplicaSetList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IReplicaSetList>;
    constructor(data?: ModelData<IReplicaSetList>);
}
export { IReplicaSetList as IIoK8sApiAppsV1ReplicaSetList, ReplicaSetList as IoK8sApiAppsV1ReplicaSetList };
