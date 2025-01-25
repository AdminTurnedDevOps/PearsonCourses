import { ModelData, Model } from "@kubernetes-models/base";
/**
 * TokenReviewSpec is a description of the token authentication request.
 */
export interface ITokenReviewSpec {
    /**
     * Audiences is a list of the identifiers that the resource server presented with the token identifies as. Audience-aware token authenticators will verify that the token was intended for at least one of the audiences in this list. If no audiences are provided, the audience will default to the audience of the Kubernetes apiserver.
     */
    "audiences"?: Array<string>;
    /**
     * Token is the opaque bearer token.
     */
    "token"?: string;
}
/**
 * TokenReviewSpec is a description of the token authentication request.
 */
export declare class TokenReviewSpec extends Model<ITokenReviewSpec> implements ITokenReviewSpec {
    "audiences"?: Array<string>;
    "token"?: string;
    constructor(data?: ModelData<ITokenReviewSpec>);
}
export { ITokenReviewSpec as IIoK8sApiAuthenticationV1beta1TokenReviewSpec, TokenReviewSpec as IoK8sApiAuthenticationV1beta1TokenReviewSpec };
