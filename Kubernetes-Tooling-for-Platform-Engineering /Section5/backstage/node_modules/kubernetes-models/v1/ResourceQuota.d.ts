import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1ResourceQuotaSpec } from "./ResourceQuotaSpec";
import { IIoK8sApiCoreV1ResourceQuotaStatus } from "./ResourceQuotaStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ResourceQuota sets aggregate quota restrictions enforced per namespace
 */
export interface IResourceQuota extends TypeMeta {
    "apiVersion": "v1";
    "kind": "ResourceQuota";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec defines the desired quota. https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiCoreV1ResourceQuotaSpec;
    /**
     * Status defines the actual enforced quota and its current usage. https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "status"?: IIoK8sApiCoreV1ResourceQuotaStatus;
}
/**
 * ResourceQuota sets aggregate quota restrictions enforced per namespace
 */
export declare class ResourceQuota extends Model<IResourceQuota> implements IResourceQuota {
    "apiVersion": IResourceQuota["apiVersion"];
    "kind": IResourceQuota["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiCoreV1ResourceQuotaSpec;
    "status"?: IIoK8sApiCoreV1ResourceQuotaStatus;
    static apiVersion: IResourceQuota["apiVersion"];
    static kind: IResourceQuota["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IResourceQuota>;
    constructor(data?: ModelData<IResourceQuota>);
}
export { IResourceQuota as IIoK8sApiCoreV1ResourceQuota, ResourceQuota as IoK8sApiCoreV1ResourceQuota };
