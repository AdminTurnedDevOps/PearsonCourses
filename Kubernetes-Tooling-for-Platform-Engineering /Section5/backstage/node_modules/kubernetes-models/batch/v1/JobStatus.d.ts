import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { IIoK8sApiBatchV1JobCondition } from "./JobCondition";
import { IIoK8sApiBatchV1UncountedTerminatedPods } from "./UncountedTerminatedPods";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * JobStatus represents the current state of a Job.
 */
export interface IJobStatus {
    /**
     * The number of pending and running pods.
     */
    "active"?: number;
    /**
     * completedIndexes holds the completed indexes when .spec.completionMode = "Indexed" in a text format. The indexes are represented as decimal integers separated by commas. The numbers are listed in increasing order. Three or more consecutive numbers are compressed and represented by the first and last element of the series, separated by a hyphen. For example, if the completed indexes are 1, 3, 4, 5 and 7, they are represented as "1,3-5,7".
     */
    "completedIndexes"?: string;
    /**
     * Represents time when the job was completed. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. The completion time is only set when the job finishes successfully.
     */
    "completionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * The latest available observations of an object's current state. When a Job fails, one of the conditions will have type "Failed" and status true. When a Job is suspended, one of the conditions will have type "Suspended" and status true; when the Job is resumed, the status of this condition will become false. When a Job is completed, one of the conditions will have type "Complete" and status true. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
     */
    "conditions"?: Array<IIoK8sApiBatchV1JobCondition>;
    /**
     * The number of pods which reached phase Failed.
     */
    "failed"?: number;
    /**
     * The number of pods which have a Ready condition.
     *
     * This field is beta-level. The job controller populates the field when the feature gate JobReadyPods is enabled (enabled by default).
     */
    "ready"?: number;
    /**
     * Represents time when the job controller started processing a job. When a Job is created in the suspended state, this field is not set until the first time it is resumed. This field is reset every time a Job is resumed from suspension. It is represented in RFC3339 form and is in UTC.
     */
    "startTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * The number of pods which reached phase Succeeded.
     */
    "succeeded"?: number;
    /**
     * uncountedTerminatedPods holds the UIDs of Pods that have terminated but the job controller hasn't yet accounted for in the status counters.
     *
     * The job controller creates pods with a finalizer. When a pod terminates (succeeded or failed), the controller does three steps to account for it in the job status:
     *
     * 1. Add the pod UID to the arrays in this field. 2. Remove the pod finalizer. 3. Remove the pod UID from the arrays while increasing the corresponding
     *     counter.
     *
     * Old jobs might not be tracked using this field, in which case the field remains null.
     */
    "uncountedTerminatedPods"?: IIoK8sApiBatchV1UncountedTerminatedPods;
}
/**
 * JobStatus represents the current state of a Job.
 */
export declare class JobStatus extends Model<IJobStatus> implements IJobStatus {
    "active"?: number;
    "completedIndexes"?: string;
    "completionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "conditions"?: Array<IIoK8sApiBatchV1JobCondition>;
    "failed"?: number;
    "ready"?: number;
    "startTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "succeeded"?: number;
    "uncountedTerminatedPods"?: IIoK8sApiBatchV1UncountedTerminatedPods;
    constructor(data?: ModelData<IJobStatus>);
}
export { IJobStatus as IIoK8sApiBatchV1JobStatus, JobStatus as IoK8sApiBatchV1JobStatus };
