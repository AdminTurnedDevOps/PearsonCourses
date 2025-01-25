import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ReplicationControllerCondition describes the state of a replication controller at a certain point.
 */
export interface IReplicationControllerCondition {
    /**
     * The last time the condition transitioned from one status to another.
     */
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * A human readable message indicating details about the transition.
     */
    "message"?: string;
    /**
     * The reason for the condition's last transition.
     */
    "reason"?: string;
    /**
     * Status of the condition, one of True, False, Unknown.
     */
    "status": string;
    /**
     * Type of replication controller condition.
     */
    "type": string;
}
/**
 * ReplicationControllerCondition describes the state of a replication controller at a certain point.
 */
export declare class ReplicationControllerCondition extends Model<IReplicationControllerCondition> implements IReplicationControllerCondition {
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<IReplicationControllerCondition>);
}
export { IReplicationControllerCondition as IIoK8sApiCoreV1ReplicationControllerCondition, ReplicationControllerCondition as IoK8sApiCoreV1ReplicationControllerCondition };
