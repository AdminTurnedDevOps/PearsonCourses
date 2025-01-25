import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * TokenRequestStatus is the result of a token request.
 */
export interface ITokenRequestStatus {
    /**
     * ExpirationTimestamp is the time of expiration of the returned token.
     */
    "expirationTimestamp": IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * Token is the opaque bearer token.
     */
    "token": string;
}
/**
 * TokenRequestStatus is the result of a token request.
 */
export declare class TokenRequestStatus extends Model<ITokenRequestStatus> implements ITokenRequestStatus {
    "expirationTimestamp": IIoK8sApimachineryPkgApisMetaV1Time;
    "token": string;
    constructor(data?: ModelData<ITokenRequestStatus>);
}
export { ITokenRequestStatus as IIoK8sApiAuthenticationV1TokenRequestStatus, TokenRequestStatus as IoK8sApiAuthenticationV1TokenRequestStatus };
