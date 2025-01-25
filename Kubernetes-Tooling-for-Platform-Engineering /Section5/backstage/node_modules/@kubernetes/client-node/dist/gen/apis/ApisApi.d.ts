import { BaseAPIRequestFactory } from './baseapi';
import { Configuration } from '../configuration';
import { RequestContext, ResponseContext, HttpInfo } from '../http/http';
import { V1APIGroupList } from '../models/V1APIGroupList';
/**
 * no description
 */
export declare class ApisApiRequestFactory extends BaseAPIRequestFactory {
    /**
     * get available API versions
     */
    getAPIVersions(_options?: Configuration): Promise<RequestContext>;
}
export declare class ApisApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getAPIVersions
     * @throws ApiException if the response code was not in [200, 299]
     */
    getAPIVersionsWithHttpInfo(response: ResponseContext): Promise<HttpInfo<V1APIGroupList>>;
}
