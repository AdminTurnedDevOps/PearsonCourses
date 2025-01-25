import { IIoK8sApiCoreV1ReplicationControllerCondition } from "./ReplicationControllerCondition";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ReplicationControllerStatus represents the current status of a replication controller.
 */
export interface IReplicationControllerStatus {
    /**
     * The number of available replicas (ready for at least minReadySeconds) for this replication controller.
     */
    "availableReplicas"?: number;
    /**
     * Represents the latest available observations of a replication controller's current state.
     */
    "conditions"?: Array<IIoK8sApiCoreV1ReplicationControllerCondition>;
    /**
     * The number of pods that have labels matching the labels of the pod template of the replication controller.
     */
    "fullyLabeledReplicas"?: number;
    /**
     * ObservedGeneration reflects the generation of the most recently observed replication controller.
     */
    "observedGeneration"?: number;
    /**
     * The number of ready replicas for this replication controller.
     */
    "readyReplicas"?: number;
    /**
     * Replicas is the most recently observed number of replicas. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#what-is-a-replicationcontroller
     */
    "replicas": number;
}
/**
 * ReplicationControllerStatus represents the current status of a replication controller.
 */
export declare class ReplicationControllerStatus extends Model<IReplicationControllerStatus> implements IReplicationControllerStatus {
    "availableReplicas"?: number;
    "conditions"?: Array<IIoK8sApiCoreV1ReplicationControllerCondition>;
    "fullyLabeledReplicas"?: number;
    "observedGeneration"?: number;
    "readyReplicas"?: number;
    "replicas": number;
    constructor(data?: ModelData<IReplicationControllerStatus>);
}
export { IReplicationControllerStatus as IIoK8sApiCoreV1ReplicationControllerStatus, ReplicationControllerStatus as IoK8sApiCoreV1ReplicationControllerStatus };
