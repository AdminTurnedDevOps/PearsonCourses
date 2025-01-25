import { IIoK8sApiBatchV1CronJob } from "./CronJob";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * CronJobList is a collection of cron jobs.
 */
export interface ICronJobList extends TypeMeta {
    "apiVersion": "batch/v1";
    /**
     * items is the list of CronJobs.
     */
    "items": Array<IIoK8sApiBatchV1CronJob>;
    "kind": "CronJobList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * CronJobList is a collection of cron jobs.
 */
export declare class CronJobList extends Model<ICronJobList> implements ICronJobList {
    "apiVersion": ICronJobList["apiVersion"];
    "items": Array<IIoK8sApiBatchV1CronJob>;
    "kind": ICronJobList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: ICronJobList["apiVersion"];
    static kind: ICronJobList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICronJobList>;
    constructor(data?: ModelData<ICronJobList>);
}
export { ICronJobList as IIoK8sApiBatchV1CronJobList, CronJobList as IoK8sApiBatchV1CronJobList };
