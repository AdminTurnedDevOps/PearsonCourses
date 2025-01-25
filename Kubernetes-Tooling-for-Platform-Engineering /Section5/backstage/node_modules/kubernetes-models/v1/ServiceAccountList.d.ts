import { IIoK8sApiCoreV1ServiceAccount } from "./ServiceAccount";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ServiceAccountList is a list of ServiceAccount objects
 */
export interface IServiceAccountList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * List of ServiceAccounts. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
     */
    "items": Array<IIoK8sApiCoreV1ServiceAccount>;
    "kind": "ServiceAccountList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * ServiceAccountList is a list of ServiceAccount objects
 */
export declare class ServiceAccountList extends Model<IServiceAccountList> implements IServiceAccountList {
    "apiVersion": IServiceAccountList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1ServiceAccount>;
    "kind": IServiceAccountList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IServiceAccountList["apiVersion"];
    static kind: IServiceAccountList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IServiceAccountList>;
    constructor(data?: ModelData<IServiceAccountList>);
}
export { IServiceAccountList as IIoK8sApiCoreV1ServiceAccountList, ServiceAccountList as IoK8sApiCoreV1ServiceAccountList };
