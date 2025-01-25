import { IIoK8sKubeAggregatorPkgApisApiregistrationV1APIService } from "./APIService";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * APIServiceList is a list of APIService objects.
 */
export interface IAPIServiceList extends TypeMeta {
    "apiVersion": "apiregistration.k8s.io/v1";
    /**
     * Items is the list of APIService
     */
    "items": Array<IIoK8sKubeAggregatorPkgApisApiregistrationV1APIService>;
    "kind": "APIServiceList";
    /**
     * Standard list metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * APIServiceList is a list of APIService objects.
 */
export declare class APIServiceList extends Model<IAPIServiceList> implements IAPIServiceList {
    "apiVersion": IAPIServiceList["apiVersion"];
    "items": Array<IIoK8sKubeAggregatorPkgApisApiregistrationV1APIService>;
    "kind": IAPIServiceList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IAPIServiceList["apiVersion"];
    static kind: IAPIServiceList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IAPIServiceList>;
    constructor(data?: ModelData<IAPIServiceList>);
}
export { IAPIServiceList as IIoK8sKubeAggregatorPkgApisApiregistrationV1APIServiceList, APIServiceList as IoK8sKubeAggregatorPkgApisApiregistrationV1APIServiceList };
