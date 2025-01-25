import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiBatchV1JobSpec } from "./JobSpec";
import { IIoK8sApiBatchV1JobStatus } from "./JobStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Job represents the configuration of a single job.
 */
export interface IJob extends TypeMeta {
    "apiVersion": "batch/v1";
    "kind": "Job";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Specification of the desired behavior of a job. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiBatchV1JobSpec;
    /**
     * Current status of a job. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "status"?: IIoK8sApiBatchV1JobStatus;
}
/**
 * Job represents the configuration of a single job.
 */
export declare class Job extends Model<IJob> implements IJob {
    "apiVersion": IJob["apiVersion"];
    "kind": IJob["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiBatchV1JobSpec;
    "status"?: IIoK8sApiBatchV1JobStatus;
    static apiVersion: IJob["apiVersion"];
    static kind: IJob["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IJob>;
    constructor(data?: ModelData<IJob>);
}
export { IJob as IIoK8sApiBatchV1Job, Job as IoK8sApiBatchV1Job };
