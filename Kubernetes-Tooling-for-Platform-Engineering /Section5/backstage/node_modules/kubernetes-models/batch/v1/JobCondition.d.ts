import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * JobCondition describes current state of a job.
 */
export interface IJobCondition {
    /**
     * Last time the condition was checked.
     */
    "lastProbeTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
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
     * Type of job condition, Complete or Failed.
     */
    "type": string;
}
/**
 * JobCondition describes current state of a job.
 */
export declare class JobCondition extends Model<IJobCondition> implements IJobCondition {
    "lastProbeTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<IJobCondition>);
}
export { IJobCondition as IIoK8sApiBatchV1JobCondition, JobCondition as IoK8sApiBatchV1JobCondition };
