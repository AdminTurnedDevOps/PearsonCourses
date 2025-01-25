import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAuthenticationV1TokenRequestSpec } from "./TokenRequestSpec";
import { IIoK8sApiAuthenticationV1TokenRequestStatus } from "./TokenRequestStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * TokenRequest requests a token for a given service account.
 */
export interface ITokenRequest extends TypeMeta {
    "apiVersion": "authentication.k8s.io/v1";
    "kind": "TokenRequest";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec holds information about the request being evaluated
     */
    "spec": IIoK8sApiAuthenticationV1TokenRequestSpec;
    /**
     * Status is filled in by the server and indicates whether the token can be authenticated.
     */
    "status"?: IIoK8sApiAuthenticationV1TokenRequestStatus;
}
/**
 * TokenRequest requests a token for a given service account.
 */
export declare class TokenRequest extends Model<ITokenRequest> implements ITokenRequest {
    "apiVersion": ITokenRequest["apiVersion"];
    "kind": ITokenRequest["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec": IIoK8sApiAuthenticationV1TokenRequestSpec;
    "status"?: IIoK8sApiAuthenticationV1TokenRequestStatus;
    static apiVersion: ITokenRequest["apiVersion"];
    static kind: ITokenRequest["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ITokenRequest>;
    constructor(data?: ModelData<ITokenRequest>);
}
export { ITokenRequest as IIoK8sApiAuthenticationV1TokenRequest, TokenRequest as IoK8sApiAuthenticationV1TokenRequest };
