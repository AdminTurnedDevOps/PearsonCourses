import { BaseAPIRequestFactory } from './baseapi';
import { Configuration } from '../configuration';
import { RequestContext, ResponseContext, HttpInfo } from '../http/http';
/**
 * no description
 */
export declare class WellKnownApiRequestFactory extends BaseAPIRequestFactory {
    /**
     * get service account issuer OpenID configuration, also known as the \'OIDC discovery doc\'
     */
    getServiceAccountIssuerOpenIDConfiguration(_options?: Configuration): Promise<RequestContext>;
}
export declare class WellKnownApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getServiceAccountIssuerOpenIDConfiguration
     * @throws ApiException if the response code was not in [200, 299]
     */
    getServiceAccountIssuerOpenIDConfigurationWithHttpInfo(response: ResponseContext): Promise<HttpInfo<string>>;
}
