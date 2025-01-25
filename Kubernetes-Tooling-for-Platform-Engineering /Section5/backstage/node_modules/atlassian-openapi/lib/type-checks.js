"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerTypeChecks = void 0;
var SwaggerTypeChecks;
(function (SwaggerTypeChecks) {
    function isPrimitiveType(t) {
        return t === 'boolean' || t === 'integer' || t === 'number' || t === 'string';
    }
    SwaggerTypeChecks.isPrimitiveType = isPrimitiveType;
    function isMediaTypeWithExamples(t) {
        return 'examples' in t;
    }
    SwaggerTypeChecks.isMediaTypeWithExamples = isMediaTypeWithExamples;
    // tslint:disable-next-line:no-any
    function matchesObjectShape(o, allKeys, requiredKeys) {
        if (typeof o !== 'object') {
            return false;
        }
        const nonExtensionKeys = removeExtensions(Object.keys(o));
        const keysMatch = nonExtensionKeys.every(key => allKeys.has(key));
        const hasRequiredKeys = typeof requiredKeys === 'undefined' ||
            requiredKeys.every(rk => !!nonExtensionKeys.find(k => k === rk));
        return keysMatch && hasRequiredKeys;
    }
    const parameterWithSchemaRequiredKeys = [
        'name',
        'in',
        'schema'
    ];
    const parameterWithSchemaOptionalKeys = [
        'description',
        'deprecated',
        'allowEmptyValue',
        'required',
        'style',
        'explode',
        'allowReserved',
        'example',
        'examples'
    ];
    const parameterWithContentRequiredKeys = [
        'name',
        'in',
        'content'
    ];
    const parameterWithContentOptionalKeys = [
        'description',
        'required',
        'deprecated',
        'allowEmptyValue'
    ];
    // tslint:disable-next-line:no-any
    function isParameter(p) {
        return isParameterWithSchema(p) || isParameterWithContent(p);
    }
    SwaggerTypeChecks.isParameter = isParameter;
    // tslint:disable-next-line:no-any
    function isParameterWithSchema(p) {
        if (typeof p !== 'object') {
            return false;
        }
        const nonExtensionKeys = removeExtensions(Object.keys(p));
        const isParameterWithSchemaKey = (key) => !!parameterWithSchemaRequiredKeys.find(k => k === key) ||
            !!parameterWithSchemaOptionalKeys.find(k => k === key);
        const keysMatch = nonExtensionKeys.every(isParameterWithSchemaKey);
        const requiredKeysPresent = parameterWithSchemaRequiredKeys.every(key => !!nonExtensionKeys.find(k => k === key));
        return keysMatch && requiredKeysPresent;
    }
    SwaggerTypeChecks.isParameterWithSchema = isParameterWithSchema;
    // tslint:disable-next-line:no-any
    function isParameterWithContent(p) {
        if (typeof p !== 'object') {
            return false;
        }
        const nonExtensionKeys = removeExtensions(Object.keys(p));
        const isParameterWithSchemaKey = (key) => !!parameterWithContentRequiredKeys.find(k => k === key) ||
            !!parameterWithContentOptionalKeys.find(k => k === key);
        const keysMatch = nonExtensionKeys.every(isParameterWithSchemaKey);
        const requiredKeysPresent = parameterWithContentRequiredKeys.every(key => !!nonExtensionKeys.find(k => k === key));
        return keysMatch && requiredKeysPresent;
    }
    SwaggerTypeChecks.isParameterWithContent = isParameterWithContent;
    // tslint:disable-next-line:no-any
    function isReference(s) {
        return typeof s === 'object' && '$ref' in s;
    }
    SwaggerTypeChecks.isReference = isReference;
    const schemaStandardKeys = new Set([
        'title',
        'multipleOf',
        'maximum',
        'exclusiveMaximum',
        'minimum',
        'exclusiveMinimum',
        'maxLength',
        'minLength',
        'pattern',
        'maxItems',
        'minItems',
        'uniqueItems',
        'maxProperties',
        'minProperties',
        'required',
        'enum',
        'type',
        'not',
        'allOf',
        'oneOf',
        'anyOf',
        'items',
        'properties',
        'additionalProperties',
        'description',
        'format',
        'default',
        'nullable',
        'discriminator',
        'readOnly',
        'writeOnly',
        'example',
        'externalDocs',
        'deprecated',
        'xml'
    ]);
    function removeExtensions(keys) {
        return keys.filter(k => !k.startsWith('x-'));
    }
    // tslint:disable-next-line:no-any
    function isSchema(s) {
        return matchesObjectShape(s, schemaStandardKeys);
    }
    SwaggerTypeChecks.isSchema = isSchema;
    const requestBodyKeys = new Set([
        'description',
        'content',
        'required'
    ]);
    const requiredRequestBodyKeys = [
        'content'
    ];
    // tslint:disable-next-line:no-any
    function isRequestBody(b) {
        return matchesObjectShape(b, requestBodyKeys, requiredRequestBodyKeys);
    }
    SwaggerTypeChecks.isRequestBody = isRequestBody;
    const optionalExampleKeys = new Set([
        'summary',
        'description',
        'value',
        'externalValue'
    ]);
    // tslint:disable-next-line:no-any
    function isExample(e) {
        return matchesObjectShape(e, optionalExampleKeys);
    }
    SwaggerTypeChecks.isExample = isExample;
    const optionalPathItemKeys = new Set([
        '$ref',
        'summary',
        'description',
        'get',
        'put',
        'post',
        'delete',
        'options',
        'head',
        'patch',
        'trace',
        'servers',
        'parameters'
    ]);
    // tslint:disable-next-line:no-any
    function isPathItem(o) {
        return matchesObjectShape(o, optionalPathItemKeys);
    }
    SwaggerTypeChecks.isPathItem = isPathItem;
    // tslint:disable-next-line:no-any
    function isCallback(o) {
        if (typeof o !== 'object') {
            return false;
        }
        // Every key in the object must point to a path-item
        const nonExtensionKeys = removeExtensions(Object.keys(o));
        return nonExtensionKeys.every(key => isPathItem(o[key]));
    }
    SwaggerTypeChecks.isCallback = isCallback;
    const headerWithSchemaKeys = new Set([
        'description',
        'required',
        'deprecated',
        'allowEmptyValue',
        'style',
        'explode',
        'allowReserved',
        'schema',
        'example',
        'examples'
    ]);
    const headerWithSchemaRequiredKeys = [
        'schema'
    ];
    // tslint:disable-next-line:no-any
    function isHeaderWithSchema(o) {
        return matchesObjectShape(o, headerWithSchemaKeys, headerWithSchemaRequiredKeys);
    }
    SwaggerTypeChecks.isHeaderWithSchema = isHeaderWithSchema;
    const headerWithContentKeys = new Set([
        'description',
        'required',
        'deprecated',
        'allowEmptyValue',
        'content'
    ]);
    const headerWithContentRequiredKeys = [
        'content'
    ];
    // tslint:disable-next-line:no-any
    function isHeaderWithContent(o) {
        return matchesObjectShape(o, headerWithContentKeys, headerWithContentRequiredKeys);
    }
    SwaggerTypeChecks.isHeaderWithContent = isHeaderWithContent;
    // tslint:disable-next-line:no-any
    function isHeader(o) {
        return isHeaderWithSchema(o) || isHeaderWithContent(o);
    }
    SwaggerTypeChecks.isHeader = isHeader;
    const optionalLinkWithOperationRefKeys = new Set([
        'operationRef',
        'parameters',
        'requestBody',
        'description',
        'server'
    ]);
    // tslint:disable-next-line:no-any
    function isLinkWithOperationRef(o) {
        return matchesObjectShape(o, optionalLinkWithOperationRefKeys);
    }
    SwaggerTypeChecks.isLinkWithOperationRef = isLinkWithOperationRef;
    const optionalLinkWithOperationIdKeys = new Set([
        'operationId',
        'parameters',
        'requestBody',
        'description',
        'server'
    ]);
    // tslint:disable-next-line:no-any
    function isLinkWithOperationId(o) {
        return matchesObjectShape(o, optionalLinkWithOperationIdKeys);
    }
    SwaggerTypeChecks.isLinkWithOperationId = isLinkWithOperationId;
    // tslint:disable-next-line:no-any
    function isLink(o) {
        return isLinkWithOperationId(o) || isLinkWithOperationRef(o);
    }
    SwaggerTypeChecks.isLink = isLink;
    const responseKeys = new Set([
        'description',
        'headers',
        'content',
        'links'
    ]);
    const requiredResponseKeys = [
        'description'
    ];
    // tslint:disable-next-line:no-any
    function isResponse(o) {
        return matchesObjectShape(o, responseKeys, requiredResponseKeys);
    }
    SwaggerTypeChecks.isResponse = isResponse;
    const apiKeySecuritySchemeKeys = new Set([
        'type',
        'name',
        'in',
        'description'
    ]);
    const apiKeySecuritySchemeRequiredKeys = [
        'type',
        'name',
        'in'
    ];
    // tslint:disable-next-line:no-any
    function isApiKeySecurityScheme(o) {
        return matchesObjectShape(o, apiKeySecuritySchemeKeys, apiKeySecuritySchemeRequiredKeys);
    }
    SwaggerTypeChecks.isApiKeySecurityScheme = isApiKeySecurityScheme;
    const nonBearerHttpSecuritySchemeKeys = new Set([
        'scheme',
        'description',
        'type'
    ]);
    const nonBearerHttpSecuritySchemeRequiredKeys = [
        'scheme',
        'type'
    ];
    // tslint:disable-next-line:no-any
    function isNonBearerHTTPSecurityScheme(o) {
        return matchesObjectShape(o, nonBearerHttpSecuritySchemeKeys, nonBearerHttpSecuritySchemeRequiredKeys) && o.scheme !== 'bearer';
    }
    SwaggerTypeChecks.isNonBearerHTTPSecurityScheme = isNonBearerHTTPSecurityScheme;
    const bearerHttpSecuritySchemeKeys = new Set([
        'scheme',
        'bearerFormat',
        'type',
        'description'
    ]);
    const bearerHttpSecuritySchemeRequiredKeys = [
        'type',
        'scheme'
    ];
    // tslint:disable-next-line:no-any
    function isBearerHttpSecurityScheme(o) {
        return matchesObjectShape(o, bearerHttpSecuritySchemeKeys, bearerHttpSecuritySchemeRequiredKeys) && o.scheme === 'bearer';
    }
    SwaggerTypeChecks.isBearerHttpSecurityScheme = isBearerHttpSecurityScheme;
    const oauth2SecuritySchemeKeys = new Set([
        'type',
        'flows',
        'description'
    ]);
    const oauth2SecuritySchemeRequiredKeys = [
        'type',
        'flows'
    ];
    // tslint:disable-next-line:no-any
    function isOAuth2SecurityScheme(o) {
        return matchesObjectShape(o, oauth2SecuritySchemeKeys, oauth2SecuritySchemeRequiredKeys);
    }
    SwaggerTypeChecks.isOAuth2SecurityScheme = isOAuth2SecurityScheme;
    const openIdConnectSecuritySchemeKeys = new Set([
        'type',
        'openIdConnectUrl',
        'description'
    ]);
    const openIdConnectSecuritySchemeRequiredKeys = [
        'type',
        'openIdConnectUrl'
    ];
    // tslint:disable-next-line:no-any
    function isOpenIdConnectSecurityScheme(o) {
        return matchesObjectShape(o, openIdConnectSecuritySchemeKeys, openIdConnectSecuritySchemeRequiredKeys);
    }
    SwaggerTypeChecks.isOpenIdConnectSecurityScheme = isOpenIdConnectSecurityScheme;
    // tslint:disable-next-line:no-any
    function isHttpSecurityScheme(o) {
        return isBearerHttpSecurityScheme(o) || isNonBearerHTTPSecurityScheme(o);
    }
    SwaggerTypeChecks.isHttpSecurityScheme = isHttpSecurityScheme;
    // tslint:disable-next-line:no-any
    function isSecurityScheme(o) {
        return isApiKeySecurityScheme(o)
            || isBearerHttpSecurityScheme(o)
            || isNonBearerHTTPSecurityScheme(o)
            || isOAuth2SecurityScheme(o)
            || isOpenIdConnectSecurityScheme(o);
    }
    SwaggerTypeChecks.isSecurityScheme = isSecurityScheme;
    function isPathParam(p) {
        return p.in === 'path';
    }
    SwaggerTypeChecks.isPathParam = isPathParam;
    // tslint:disable-next-line:max-line-length
    function isOAuth2ScopesArray(o) {
        return o.every(isOAuth2Scopes);
    }
    SwaggerTypeChecks.isOAuth2ScopesArray = isOAuth2ScopesArray;
    // tslint:disable-next-line:max-line-length
    function isOAuth2ScopesWithStateArray(o) {
        return o.every(isOAuth2ScopesWithState);
    }
    SwaggerTypeChecks.isOAuth2ScopesWithStateArray = isOAuth2ScopesWithStateArray;
    function isOAuth2Scopes(o) {
        return 'deprecated' in o;
    }
    SwaggerTypeChecks.isOAuth2Scopes = isOAuth2Scopes;
    // tslint:disable-next-line:max-line-length
    function isOAuth2ScopesWithState(o) {
        return 'state' in o;
    }
    SwaggerTypeChecks.isOAuth2ScopesWithState = isOAuth2ScopesWithState;
})(SwaggerTypeChecks = exports.SwaggerTypeChecks || (exports.SwaggerTypeChecks = {}));
