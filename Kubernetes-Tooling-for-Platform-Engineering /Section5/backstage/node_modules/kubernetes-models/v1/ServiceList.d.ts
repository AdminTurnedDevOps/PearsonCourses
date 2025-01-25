import { IIoK8sApiCoreV1Service } from "./Service";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ServiceList holds a list of services.
 */
export interface IServiceList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * List of services
     */
    "items": Array<IIoK8sApiCoreV1Service>;
    "kind": "ServiceList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * ServiceList holds a list of services.
 */
export declare class ServiceList extends Model<IServiceList> implements IServiceList {
    "apiVersion": IServiceList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1Service>;
    "kind": IServiceList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IServiceList["apiVersion"];
    static kind: IServiceList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IServiceList>;
    constructor(data?: ModelData<IServiceList>);
}
export { IServiceList as IIoK8sApiCoreV1ServiceList, ServiceList as IoK8sApiCoreV1ServiceList };
