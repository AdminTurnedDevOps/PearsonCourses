import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1LimitRangeSpec } from "./LimitRangeSpec";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * LimitRange sets resource usage limits for each kind of resource in a Namespace.
 */
export interface ILimitRange extends TypeMeta {
    "apiVersion": "v1";
    "kind": "LimitRange";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec defines the limits enforced. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiCoreV1LimitRangeSpec;
}
/**
 * LimitRange sets resource usage limits for each kind of resource in a Namespace.
 */
export declare class LimitRange extends Model<ILimitRange> implements ILimitRange {
    "apiVersion": ILimitRange["apiVersion"];
    "kind": ILimitRange["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiCoreV1LimitRangeSpec;
    static apiVersion: ILimitRange["apiVersion"];
    static kind: ILimitRange["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ILimitRange>;
    constructor(data?: ModelData<ILimitRange>);
}
export { ILimitRange as IIoK8sApiCoreV1LimitRange, LimitRange as IoK8sApiCoreV1LimitRange };
