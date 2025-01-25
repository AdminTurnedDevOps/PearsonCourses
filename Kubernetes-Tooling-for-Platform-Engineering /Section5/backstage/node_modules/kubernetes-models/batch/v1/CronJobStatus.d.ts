import { IIoK8sApiCoreV1ObjectReference } from "../../v1/ObjectReference";
import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CronJobStatus represents the current state of a cron job.
 */
export interface ICronJobStatus {
    /**
     * A list of pointers to currently running jobs.
     */
    "active"?: Array<IIoK8sApiCoreV1ObjectReference>;
    /**
     * Information when was the last time the job was successfully scheduled.
     */
    "lastScheduleTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * Information when was the last time the job successfully completed.
     */
    "lastSuccessfulTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
}
/**
 * CronJobStatus represents the current state of a cron job.
 */
export declare class CronJobStatus extends Model<ICronJobStatus> implements ICronJobStatus {
    "active"?: Array<IIoK8sApiCoreV1ObjectReference>;
    "lastScheduleTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "lastSuccessfulTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    constructor(data?: ModelData<ICronJobStatus>);
}
export { ICronJobStatus as IIoK8sApiBatchV1CronJobStatus, CronJobStatus as IoK8sApiBatchV1CronJobStatus };
