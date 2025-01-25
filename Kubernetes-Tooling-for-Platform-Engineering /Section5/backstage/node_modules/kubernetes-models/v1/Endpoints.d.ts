import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1EndpointSubset } from "./EndpointSubset";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Endpoints is a collection of endpoints that implement the actual service. Example:
 *
 * 	 Name: "mysvc",
 * 	 Subsets: [
 * 	   {
 * 	     Addresses: [{"ip": "10.10.1.1"}, {"ip": "10.10.2.2"}],
 * 	     Ports: [{"name": "a", "port": 8675}, {"name": "b", "port": 309}]
 * 	   },
 * 	   {
 * 	     Addresses: [{"ip": "10.10.3.3"}],
 * 	     Ports: [{"name": "a", "port": 93}, {"name": "b", "port": 76}]
 * 	   },
 * 	]
 */
export interface IEndpoints extends TypeMeta {
    "apiVersion": "v1";
    "kind": "Endpoints";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * The set of all endpoints is the union of all subsets. Addresses are placed into subsets according to the IPs they share. A single address with multiple ports, some of which are ready and some of which are not (because they come from different containers) will result in the address being displayed in different subsets for the different ports. No address will appear in both Addresses and NotReadyAddresses in the same subset. Sets of addresses and ports that comprise a service.
     */
    "subsets"?: Array<IIoK8sApiCoreV1EndpointSubset>;
}
/**
 * Endpoints is a collection of endpoints that implement the actual service. Example:
 *
 * 	 Name: "mysvc",
 * 	 Subsets: [
 * 	   {
 * 	     Addresses: [{"ip": "10.10.1.1"}, {"ip": "10.10.2.2"}],
 * 	     Ports: [{"name": "a", "port": 8675}, {"name": "b", "port": 309}]
 * 	   },
 * 	   {
 * 	     Addresses: [{"ip": "10.10.3.3"}],
 * 	     Ports: [{"name": "a", "port": 93}, {"name": "b", "port": 76}]
 * 	   },
 * 	]
 */
export declare class Endpoints extends Model<IEndpoints> implements IEndpoints {
    "apiVersion": IEndpoints["apiVersion"];
    "kind": IEndpoints["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "subsets"?: Array<IIoK8sApiCoreV1EndpointSubset>;
    static apiVersion: IEndpoints["apiVersion"];
    static kind: IEndpoints["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IEndpoints>;
    constructor(data?: ModelData<IEndpoints>);
}
export { IEndpoints as IIoK8sApiCoreV1Endpoints, Endpoints as IoK8sApiCoreV1Endpoints };
