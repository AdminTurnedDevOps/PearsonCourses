import { IIoK8sApiBatchV1Job } from "./Job";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * JobList is a collection of jobs.
 */
export interface IJobList extends TypeMeta {
    "apiVersion": "batch/v1";
    /**
     * items is the list of Jobs.
     */
    "items": Array<IIoK8sApiBatchV1Job>;
    "kind": "JobList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * JobList is a collection of jobs.
 */
export declare class JobList extends Model<IJobList> implements IJobList {
    "apiVersion": IJobList["apiVersion"];
    "items": Array<IIoK8sApiBatchV1Job>;
    "kind": IJobList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IJobList["apiVersion"];
    static kind: IJobList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IJobList>;
    constructor(data?: ModelData<IJobList>);
}
export { IJobList as IIoK8sApiBatchV1JobList, JobList as IoK8sApiBatchV1JobList };
