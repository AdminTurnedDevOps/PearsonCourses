import { IIoK8sApiAuthenticationV1beta1UserInfo } from "./UserInfo";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * TokenReviewStatus is the result of the token authentication request.
 */
export interface ITokenReviewStatus {
    /**
     * Audiences are audience identifiers chosen by the authenticator that are compatible with both the TokenReview and token. An identifier is any identifier in the intersection of the TokenReviewSpec audiences and the token's audiences. A client of the TokenReview API that sets the spec.audiences field should validate that a compatible audience identifier is returned in the status.audiences field to ensure that the TokenReview server is audience aware. If a TokenReview returns an empty status.audience field where status.authenticated is "true", the token is valid against the audience of the Kubernetes API server.
     */
    "audiences"?: Array<string>;
    /**
     * Authenticated indicates that the token was associated with a known user.
     */
    "authenticated"?: boolean;
    /**
     * Error indicates that the token couldn't be checked
     */
    "error"?: string;
    /**
     * User is the UserInfo associated with the provided token.
     */
    "user"?: IIoK8sApiAuthenticationV1beta1UserInfo;
}
/**
 * TokenReviewStatus is the result of the token authentication request.
 */
export declare class TokenReviewStatus extends Model<ITokenReviewStatus> implements ITokenReviewStatus {
    "audiences"?: Array<string>;
    "authenticated"?: boolean;
    "error"?: string;
    "user"?: IIoK8sApiAuthenticationV1beta1UserInfo;
    constructor(data?: ModelData<ITokenReviewStatus>);
}
export { ITokenReviewStatus as IIoK8sApiAuthenticationV1beta1TokenReviewStatus, TokenReviewStatus as IoK8sApiAuthenticationV1beta1TokenReviewStatus };
