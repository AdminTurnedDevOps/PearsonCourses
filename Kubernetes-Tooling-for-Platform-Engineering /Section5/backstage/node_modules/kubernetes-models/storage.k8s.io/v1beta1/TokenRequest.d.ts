import { ModelData, Model } from "@kubernetes-models/base";
/**
 * TokenRequest contains parameters of a service account token.
 */
export interface ITokenRequest {
    /**
     * Audience is the intended audience of the token in "TokenRequestSpec". It will default to the audiences of kube apiserver.
     */
    "audience": string;
    /**
     * ExpirationSeconds is the duration of validity of the token in "TokenRequestSpec". It has the same default value of "ExpirationSeconds" in "TokenRequestSpec"
     */
    "expirationSeconds"?: number;
}
/**
 * TokenRequest contains parameters of a service account token.
 */
export declare class TokenRequest extends Model<ITokenRequest> implements ITokenRequest {
    "audience": string;
    "expirationSeconds"?: number;
    constructor(data?: ModelData<ITokenRequest>);
}
export { ITokenRequest as IIoK8sApiStorageV1beta1TokenRequest, TokenRequest as IoK8sApiStorageV1beta1TokenRequest };
