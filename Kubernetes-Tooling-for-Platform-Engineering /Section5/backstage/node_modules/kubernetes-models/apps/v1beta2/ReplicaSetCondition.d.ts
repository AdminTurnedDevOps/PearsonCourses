import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ReplicaSetCondition describes the state of a replica set at a certain point.
 */
export interface IReplicaSetCondition {
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
     * Type of replica set condition.
     */
    "type": string;
}
/**
 * ReplicaSetCondition describes the state of a replica set at a certain point.
 */
export declare class ReplicaSetCondition extends Model<IReplicaSetCondition> implements IReplicaSetCondition {
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<IReplicaSetCondition>);
}
export { IReplicaSetCondition as IIoK8sApiAppsV1beta2ReplicaSetCondition, ReplicaSetCondition as IoK8sApiAppsV1beta2ReplicaSetCondition };
