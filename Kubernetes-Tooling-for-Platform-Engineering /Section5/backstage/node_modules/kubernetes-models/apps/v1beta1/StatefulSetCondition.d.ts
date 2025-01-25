import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * StatefulSetCondition describes the state of a statefulset at a certain point.
 */
export interface IStatefulSetCondition {
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
     * Type of statefulset condition.
     */
    "type": string;
}
/**
 * StatefulSetCondition describes the state of a statefulset at a certain point.
 */
export declare class StatefulSetCondition extends Model<IStatefulSetCondition> implements IStatefulSetCondition {
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<IStatefulSetCondition>);
}
export { IStatefulSetCondition as IIoK8sApiAppsV1beta1StatefulSetCondition, StatefulSetCondition as IoK8sApiAppsV1beta1StatefulSetCondition };
