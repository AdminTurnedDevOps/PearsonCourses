import { BaseAPIRequestFactory } from './baseapi';
import { Configuration } from '../configuration';
import { RequestContext, ResponseContext, HttpInfo } from '../http/http';
import { V1APIGroup } from '../models/V1APIGroup';
/**
 * no description
 */
export declare class EventsApiRequestFactory extends BaseAPIRequestFactory {
    /**
     * get information of a group
     */
    getAPIGroup(_options?: Configuration): Promise<RequestContext>;
}
export declare class EventsApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getAPIGroup
     * @throws ApiException if the response code was not in [200, 299]
     */
    getAPIGroupWithHttpInfo(response: ResponseContext): Promise<HttpInfo<V1APIGroup>>;
}
