import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiBatchV1JobSpec } from "../v1/JobSpec";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * JobTemplateSpec describes the data a Job should have when created from a template
 */
export interface IJobTemplateSpec {
    /**
     * Standard object's metadata of the jobs created from this template. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Specification of the desired behavior of the job. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiBatchV1JobSpec;
}
/**
 * JobTemplateSpec describes the data a Job should have when created from a template
 */
export declare class JobTemplateSpec extends Model<IJobTemplateSpec> implements IJobTemplateSpec {
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiBatchV1JobSpec;
    constructor(data?: ModelData<IJobTemplateSpec>);
}
export { IJobTemplateSpec as IIoK8sApiBatchV1beta1JobTemplateSpec, JobTemplateSpec as IoK8sApiBatchV1beta1JobTemplateSpec };
