import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sKubeAggregatorPkgApisApiregistrationV1beta1APIServiceSpec } from "./APIServiceSpec";
import { IIoK8sKubeAggregatorPkgApisApiregistrationV1beta1APIServiceStatus } from "./APIServiceStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * APIService represents a server for a particular GroupVersion. Name must be "version.group".
 */
export interface IAPIService extends TypeMeta {
    "apiVersion": "apiregistration.k8s.io/v1beta1";
    "kind": "APIService";
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec contains information for locating and communicating with a server
     */
    "spec"?: IIoK8sKubeAggregatorPkgApisApiregistrationV1beta1APIServiceSpec;
    /**
     * Status contains derived information about an API server
     */
    "status"?: IIoK8sKubeAggregatorPkgApisApiregistrationV1beta1APIServiceStatus;
}
/**
 * APIService represents a server for a particular GroupVersion. Name must be "version.group".
 */
export declare class APIService extends Model<IAPIService> implements IAPIService {
    "apiVersion": IAPIService["apiVersion"];
    "kind": IAPIService["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sKubeAggregatorPkgApisApiregistrationV1beta1APIServiceSpec;
    "status"?: IIoK8sKubeAggregatorPkgApisApiregistrationV1beta1APIServiceStatus;
    static apiVersion: IAPIService["apiVersion"];
    static kind: IAPIService["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IAPIService>;
    constructor(data?: ModelData<IAPIService>);
}
export { IAPIService as IIoK8sKubeAggregatorPkgApisApiregistrationV1beta1APIService, APIService as IoK8sKubeAggregatorPkgApisApiregistrationV1beta1APIService };
