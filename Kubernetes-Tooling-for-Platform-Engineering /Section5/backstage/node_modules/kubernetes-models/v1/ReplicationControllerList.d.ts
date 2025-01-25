import { IIoK8sApiCoreV1ReplicationController } from "./ReplicationController";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ReplicationControllerList is a collection of replication controllers.
 */
export interface IReplicationControllerList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * List of replication controllers. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller
     */
    "items": Array<IIoK8sApiCoreV1ReplicationController>;
    "kind": "ReplicationControllerList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * ReplicationControllerList is a collection of replication controllers.
 */
export declare class ReplicationControllerList extends Model<IReplicationControllerList> implements IReplicationControllerList {
    "apiVersion": IReplicationControllerList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1ReplicationController>;
    "kind": IReplicationControllerList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IReplicationControllerList["apiVersion"];
    static kind: IReplicationControllerList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IReplicationControllerList>;
    constructor(data?: ModelData<IReplicationControllerList>);
}
export { IReplicationControllerList as IIoK8sApiCoreV1ReplicationControllerList, ReplicationControllerList as IoK8sApiCoreV1ReplicationControllerList };
