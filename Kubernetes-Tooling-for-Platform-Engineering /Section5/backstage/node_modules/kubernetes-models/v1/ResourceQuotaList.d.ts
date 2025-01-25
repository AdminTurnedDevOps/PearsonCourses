import { IIoK8sApiCoreV1ResourceQuota } from "./ResourceQuota";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ResourceQuotaList is a list of ResourceQuota items.
 */
export interface IResourceQuotaList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * Items is a list of ResourceQuota objects. More info: https://kubernetes.io/docs/concepts/policy/resource-quotas/
     */
    "items": Array<IIoK8sApiCoreV1ResourceQuota>;
    "kind": "ResourceQuotaList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * ResourceQuotaList is a list of ResourceQuota items.
 */
export declare class ResourceQuotaList extends Model<IResourceQuotaList> implements IResourceQuotaList {
    "apiVersion": IResourceQuotaList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1ResourceQuota>;
    "kind": IResourceQuotaList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IResourceQuotaList["apiVersion"];
    static kind: IResourceQuotaList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IResourceQuotaList>;
    constructor(data?: ModelData<IResourceQuotaList>);
}
export { IResourceQuotaList as IIoK8sApiCoreV1ResourceQuotaList, ResourceQuotaList as IoK8sApiCoreV1ResourceQuotaList };
