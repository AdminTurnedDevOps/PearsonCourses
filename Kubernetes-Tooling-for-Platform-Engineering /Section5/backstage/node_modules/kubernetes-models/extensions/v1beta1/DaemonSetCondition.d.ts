import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * DaemonSetCondition describes the state of a DaemonSet at a certain point.
 */
export interface IDaemonSetCondition {
    /**
     * Last time the condition transitioned from one status to another.
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
     * Type of DaemonSet condition.
     */
    "type": string;
}
/**
 * DaemonSetCondition describes the state of a DaemonSet at a certain point.
 */
export declare class DaemonSetCondition extends Model<IDaemonSetCondition> implements IDaemonSetCondition {
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<IDaemonSetCondition>);
}
export { IDaemonSetCondition as IIoK8sApiExtensionsV1beta1DaemonSetCondition, DaemonSetCondition as IoK8sApiExtensionsV1beta1DaemonSetCondition };
