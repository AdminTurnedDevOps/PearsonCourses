import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1PodSpec } from "./PodSpec";
import { IIoK8sApiCoreV1PodStatus } from "./PodStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Pod is a collection of containers that can run on a host. This resource is created by clients and scheduled onto hosts.
 */
export interface IPod extends TypeMeta {
    "apiVersion": "v1";
    "kind": "Pod";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Specification of the desired behavior of the pod. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiCoreV1PodSpec;
    /**
     * Most recently observed status of the pod. This data may not be up to date. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "status"?: IIoK8sApiCoreV1PodStatus;
}
/**
 * Pod is a collection of containers that can run on a host. This resource is created by clients and scheduled onto hosts.
 */
export declare class Pod extends Model<IPod> implements IPod {
    "apiVersion": IPod["apiVersion"];
    "kind": IPod["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiCoreV1PodSpec;
    "status"?: IIoK8sApiCoreV1PodStatus;
    static apiVersion: IPod["apiVersion"];
    static kind: IPod["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPod>;
    constructor(data?: ModelData<IPod>);
}
export { IPod as IIoK8sApiCoreV1Pod, Pod as IoK8sApiCoreV1Pod };
