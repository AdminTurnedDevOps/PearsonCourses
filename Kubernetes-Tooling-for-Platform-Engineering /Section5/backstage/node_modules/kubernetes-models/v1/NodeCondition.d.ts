import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NodeCondition contains condition information for a node.
 */
export interface INodeCondition {
    /**
     * Last time we got an update on a given condition.
     */
    "lastHeartbeatTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * Last time the condition transit from one status to another.
     */
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * Human readable message indicating details about last transition.
     */
    "message"?: string;
    /**
     * (brief) reason for the condition's last transition.
     */
    "reason"?: string;
    /**
     * Status of the condition, one of True, False, Unknown.
     */
    "status": string;
    /**
     * Type of node condition.
     */
    "type": string;
}
/**
 * NodeCondition contains condition information for a node.
 */
export declare class NodeCondition extends Model<INodeCondition> implements INodeCondition {
    "lastHeartbeatTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<INodeCondition>);
}
export { INodeCondition as IIoK8sApiCoreV1NodeCondition, NodeCondition as IoK8sApiCoreV1NodeCondition };
