import { IIoK8sApiBatchV1beta1JobTemplateSpec } from "./JobTemplateSpec";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CronJobSpec describes how the job execution will look like and when it will actually run.
 */
export interface ICronJobSpec {
    /**
     * Specifies how to treat concurrent executions of a Job. Valid values are: - "Allow" (default): allows CronJobs to run concurrently; - "Forbid": forbids concurrent runs, skipping next run if previous run hasn't finished yet; - "Replace": cancels currently running job and replaces it with a new one
     */
    "concurrencyPolicy"?: string;
    /**
     * The number of failed finished jobs to retain. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.
     */
    "failedJobsHistoryLimit"?: number;
    /**
     * Specifies the job that will be created when executing a CronJob.
     */
    "jobTemplate": IIoK8sApiBatchV1beta1JobTemplateSpec;
    /**
     * The schedule in Cron format, see https://en.wikipedia.org/wiki/Cron.
     */
    "schedule": string;
    /**
     * Optional deadline in seconds for starting the job if it misses scheduled time for any reason.  Missed jobs executions will be counted as failed ones.
     */
    "startingDeadlineSeconds"?: number;
    /**
     * The number of successful finished jobs to retain. This is a pointer to distinguish between explicit zero and not specified. Defaults to 3.
     */
    "successfulJobsHistoryLimit"?: number;
    /**
     * This flag tells the controller to suspend subsequent executions, it does not apply to already started executions.  Defaults to false.
     */
    "suspend"?: boolean;
    /**
     * The time zone for the given schedule, see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones. If not specified, this will rely on the time zone of the kube-controller-manager process. ALPHA: This field is in alpha and must be enabled via the `CronJobTimeZone` feature gate.
     */
    "timeZone"?: string;
}
/**
 * CronJobSpec describes how the job execution will look like and when it will actually run.
 */
export declare class CronJobSpec extends Model<ICronJobSpec> implements ICronJobSpec {
    "concurrencyPolicy"?: string;
    "failedJobsHistoryLimit"?: number;
    "jobTemplate": IIoK8sApiBatchV1beta1JobTemplateSpec;
    "schedule": string;
    "startingDeadlineSeconds"?: number;
    "successfulJobsHistoryLimit"?: number;
    "suspend"?: boolean;
    "timeZone"?: string;
    constructor(data?: ModelData<ICronJobSpec>);
}
export { ICronJobSpec as IIoK8sApiBatchV1beta1CronJobSpec, CronJobSpec as IoK8sApiBatchV1beta1CronJobSpec };
