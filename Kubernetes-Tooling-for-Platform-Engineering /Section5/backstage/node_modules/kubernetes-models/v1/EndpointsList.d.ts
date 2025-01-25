import { IIoK8sApiCoreV1Endpoints } from "./Endpoints";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * EndpointsList is a list of endpoints.
 */
export interface IEndpointsList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * List of endpoints.
     */
    "items": Array<IIoK8sApiCoreV1Endpoints>;
    "kind": "EndpointsList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * EndpointsList is a list of endpoints.
 */
export declare class EndpointsList extends Model<IEndpointsList> implements IEndpointsList {
    "apiVersion": IEndpointsList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1Endpoints>;
    "kind": IEndpointsList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IEndpointsList["apiVersion"];
    static kind: IEndpointsList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IEndpointsList>;
    constructor(data?: ModelData<IEndpointsList>);
}
export { IEndpointsList as IIoK8sApiCoreV1EndpointsList, EndpointsList as IoK8sApiCoreV1EndpointsList };
