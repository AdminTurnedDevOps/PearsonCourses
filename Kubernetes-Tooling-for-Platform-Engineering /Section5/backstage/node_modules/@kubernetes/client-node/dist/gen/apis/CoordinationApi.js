"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordinationApiResponseProcessor = exports.CoordinationApiRequestFactory = void 0;
// TODO: better import syntax?
const baseapi_1 = require("./baseapi");
const http_1 = require("../http/http");
const ObjectSerializer_1 = require("../models/ObjectSerializer");
const exception_1 = require("./exception");
const util_1 = require("../util");
/**
 * no description
 */
class CoordinationApiRequestFactory extends baseapi_1.BaseAPIRequestFactory {
    /**
     * get information of a group
     */
    async getAPIGroup(_options) {
        var _a, _b, _c;
        let _config = _options || this.configuration;
        // Path Params
        const localVarPath = '/apis/coordination.k8s.io/';
        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, http_1.HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8");
        let authMethod;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"];
        if (authMethod === null || authMethod === void 0 ? void 0 : authMethod.applySecurityAuthentication) {
            await (authMethod === null || authMethod === void 0 ? void 0 : authMethod.applySecurityAuthentication(requestContext));
        }
        const defaultAuth = ((_a = _options === null || _options === void 0 ? void 0 : _options.authMethods) === null || _a === void 0 ? void 0 : _a.default) || ((_c = (_b = this.configuration) === null || _b === void 0 ? void 0 : _b.authMethods) === null || _c === void 0 ? void 0 : _c.default);
        if (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication) {
            await (defaultAuth === null || defaultAuth === void 0 ? void 0 : defaultAuth.applySecurityAuthentication(requestContext));
        }
        return requestContext;
    }
}
exports.CoordinationApiRequestFactory = CoordinationApiRequestFactory;
class CoordinationApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getAPIGroup
     * @throws ApiException if the response code was not in [200, 299]
     */
    async getAPIGroupWithHttpInfo(response) {
        const contentType = ObjectSerializer_1.ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if ((0, util_1.isCodeInRange)("200", response.httpStatusCode)) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "V1APIGroup", "");
            return new http_1.HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if ((0, util_1.isCodeInRange)("401", response.httpStatusCode)) {
            throw new exception_1.ApiException(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }
        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body = ObjectSerializer_1.ObjectSerializer.deserialize(ObjectSerializer_1.ObjectSerializer.parse(await response.body.text(), contentType), "V1APIGroup", "");
            return new http_1.HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        throw new exception_1.ApiException(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }
}
exports.CoordinationApiResponseProcessor = CoordinationApiResponseProcessor;
//# sourceMappingURL=CoordinationApi.js.map