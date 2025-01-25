"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walkAllReferences = exports.walkPathReferences = exports.walkComponentReferences = exports.walkCallbackReferences = exports.walkResponseReferences = exports.walkLinkReferences = exports.walkHeaderReferences = exports.walkRequestBodyReferences = exports.walkParameterReferences = exports.walkExampleReferences = exports.walkSchemaReferences = void 0;
/* eslint-disable no-prototype-builtins */
const atlassian_openapi_1 = require("atlassian-openapi");
function walkSchemaReferences(schema, modify) {
    if (atlassian_openapi_1.SwaggerTypeChecks.isReference(schema)) {
        schema.$ref = modify(schema.$ref);
    }
    else {
        if (schema.not !== undefined)
            walkSchemaReferences(schema.not, modify);
        if (schema.allOf !== undefined) {
            for (const childSchema of schema.allOf) {
                walkSchemaReferences(childSchema, modify);
            }
        }
        if (schema.oneOf !== undefined) {
            for (const childSchema of schema.oneOf) {
                walkSchemaReferences(childSchema, modify);
            }
        }
        if (schema.anyOf !== undefined) {
            for (const childSchema of schema.anyOf) {
                walkSchemaReferences(childSchema, modify);
            }
        }
        if (schema.items !== undefined) {
            walkSchemaReferences(schema.items, modify);
        }
        for (const propertyKey in schema.properties) {
            if (schema.properties.hasOwnProperty(propertyKey)) {
                const property = schema.properties[propertyKey];
                walkSchemaReferences(property, modify);
            }
        }
        if (schema.additionalProperties !== undefined && typeof schema.additionalProperties !== 'boolean') {
            walkSchemaReferences(schema.additionalProperties, modify);
        }
    }
}
exports.walkSchemaReferences = walkSchemaReferences;
function walkExampleReferences(example, modify) {
    if (atlassian_openapi_1.SwaggerTypeChecks.isReference(example)) {
        example.$ref = modify(example.$ref);
    }
}
exports.walkExampleReferences = walkExampleReferences;
function walkMediaTypeReferences(mediaType, modify) {
    if (mediaType.schema !== undefined)
        walkSchemaReferences(mediaType.schema, modify);
    if (atlassian_openapi_1.SwaggerTypeChecks.isMediaTypeWithExamples(mediaType)) {
        if (mediaType.schema !== undefined)
            walkSchemaReferences(mediaType.schema, modify);
        for (const exampleKey of Object.keys(mediaType.examples)) {
            const example = mediaType.examples[exampleKey];
            walkExampleReferences(example, modify);
        }
    }
}
function walkParameterReferences(parameterOrRef, modify) {
    if (atlassian_openapi_1.SwaggerTypeChecks.isReference(parameterOrRef)) {
        parameterOrRef.$ref = modify(parameterOrRef.$ref);
    }
    else if (atlassian_openapi_1.SwaggerTypeChecks.isParameterWithSchema(parameterOrRef)) {
        walkSchemaReferences(parameterOrRef.schema, modify);
        if ('examples' in parameterOrRef) {
            for (const exampleKey in parameterOrRef.examples) {
                if (parameterOrRef.examples.hasOwnProperty(exampleKey)) {
                    const example = parameterOrRef.examples[exampleKey];
                    walkExampleReferences(example, modify);
                }
            }
        }
    }
    else {
        for (const contentKey in parameterOrRef.content) {
            if (parameterOrRef.content.hasOwnProperty(contentKey)) {
                const mediaType = parameterOrRef.content[contentKey];
                walkMediaTypeReferences(mediaType, modify);
            }
        }
    }
}
exports.walkParameterReferences = walkParameterReferences;
function walkRequestBodyReferences(requestBody, modify) {
    if (atlassian_openapi_1.SwaggerTypeChecks.isReference(requestBody)) {
        requestBody.$ref = modify(requestBody.$ref);
    }
    else {
        for (const contentKey in requestBody.content) {
            if (requestBody.content.hasOwnProperty(contentKey)) {
                const mediaType = requestBody.content[contentKey];
                walkMediaTypeReferences(mediaType, modify);
            }
        }
    }
}
exports.walkRequestBodyReferences = walkRequestBodyReferences;
function walkHeaderReferences(header, modify) {
    if (atlassian_openapi_1.SwaggerTypeChecks.isReference(header)) {
        header.$ref = modify(header.$ref);
    }
    else if (atlassian_openapi_1.SwaggerTypeChecks.isHeaderWithSchema(header)) {
        if (header.schema !== undefined)
            walkSchemaReferences(header.schema, modify);
        if ('examples' in header) {
            for (const exampleKey in header.examples) {
                if (header.examples.hasOwnProperty(exampleKey)) {
                    const example = header.examples[exampleKey];
                    walkExampleReferences(example, modify);
                }
            }
        }
    }
    else {
        for (const contentKey in header.content) {
            if (header.content.hasOwnProperty(contentKey)) {
                const mediaType = header.content[contentKey];
                walkMediaTypeReferences(mediaType, modify);
            }
        }
    }
}
exports.walkHeaderReferences = walkHeaderReferences;
function walkLinkReferences(link, modify) {
    if (atlassian_openapi_1.SwaggerTypeChecks.isReference(link)) {
        link.$ref = modify(link.$ref);
    }
    else {
        // TODO work out if there are any references in here that should be updated
    }
}
exports.walkLinkReferences = walkLinkReferences;
function walkResponseReferences(response, modify) {
    if (atlassian_openapi_1.SwaggerTypeChecks.isReference(response)) {
        response.$ref = modify(response.$ref);
    }
    else {
        if (response.headers !== undefined) {
            for (const headerKey of Object.keys(response.headers)) {
                const headerOrRef = response.headers[headerKey];
                walkHeaderReferences(headerOrRef, modify);
            }
        }
        if (response.content !== undefined) {
            const contentKeys = Object.keys(response.content);
            for (let contentKeyIndex = 0; contentKeyIndex < contentKeys.length; contentKeyIndex++) {
                const contentKey = contentKeys[contentKeyIndex];
                const mediaType = response.content[contentKey];
                walkMediaTypeReferences(mediaType, modify);
            }
        }
        if (response.links !== undefined) {
            const linkKeys = Object.keys(response.links);
            for (let linkKeyIndex = 0; linkKeyIndex < linkKeys.length; linkKeyIndex++) {
                const linkKey = linkKeys[linkKeyIndex];
                const linkOrRef = response.links[linkKey];
                walkLinkReferences(linkOrRef, modify);
            }
        }
    }
}
exports.walkResponseReferences = walkResponseReferences;
function walkCallbackReferences(callback, modify) {
    if (atlassian_openapi_1.SwaggerTypeChecks.isReference(callback)) {
        callback.$ref = modify(callback.$ref);
    }
    else {
        for (const pathItemKey in callback) {
            if (callback.hasOwnProperty(pathItemKey)) {
                const pathItem = callback[pathItemKey];
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                walkPathItemReferences(pathItem, modify);
            }
        }
    }
}
exports.walkCallbackReferences = walkCallbackReferences;
function walkOperationReferences(operation, modify) {
    if (operation.parameters !== undefined) {
        for (const parameterOrRef of operation.parameters) {
            walkParameterReferences(parameterOrRef, modify);
        }
    }
    if (operation.requestBody !== undefined) {
        walkRequestBodyReferences(operation.requestBody, modify);
    }
    for (const responseKey in operation.responses) {
        if (operation.responses.hasOwnProperty(responseKey)) {
            const response = operation.responses[responseKey];
            walkResponseReferences(response, modify);
        }
    }
    if (operation.callbacks !== undefined) {
        const callbackKeys = Object.keys(operation.callbacks);
        for (let callbackKeyIndex = 0; callbackKeyIndex < callbackKeys.length; callbackKeyIndex++) {
            const callbackKey = callbackKeys[callbackKeyIndex];
            const callback = operation.callbacks[callbackKey];
            walkCallbackReferences(callback, modify);
        }
    }
}
function walkPathItemReferences(pathItem, modify) {
    if (pathItem['$ref'] !== undefined) {
        pathItem['$ref'] = modify(pathItem['$ref']);
    }
    else {
        if (pathItem.get !== undefined)
            walkOperationReferences(pathItem.get, modify);
        if (pathItem.put !== undefined)
            walkOperationReferences(pathItem.put, modify);
        if (pathItem.post !== undefined)
            walkOperationReferences(pathItem.post, modify);
        if (pathItem.delete !== undefined)
            walkOperationReferences(pathItem.delete, modify);
        if (pathItem.options !== undefined)
            walkOperationReferences(pathItem.options, modify);
        if (pathItem.head !== undefined)
            walkOperationReferences(pathItem.head, modify);
        if (pathItem.patch !== undefined)
            walkOperationReferences(pathItem.patch, modify);
        if (pathItem.trace !== undefined)
            walkOperationReferences(pathItem.trace, modify);
        if (pathItem.parameters !== undefined) {
            for (let parameterIndex = 0; parameterIndex < pathItem.parameters.length; parameterIndex++) {
                walkParameterReferences(pathItem.parameters[parameterIndex], modify);
            }
        }
    }
}
function walkComponentReferences(components, modify) {
    if (components.schemas !== undefined) {
        for (const schemaKey in components.schemas) {
            if (components.schemas.hasOwnProperty(schemaKey)) {
                const schema = components.schemas[schemaKey];
                walkSchemaReferences(schema, modify);
            }
        }
    }
    if (components.responses !== undefined) {
        for (const responsesKey in components.responses) {
            if (components.responses.hasOwnProperty(responsesKey)) {
                const response = components.responses[responsesKey];
                walkResponseReferences(response, modify);
            }
        }
    }
    if (components.parameters !== undefined) {
        for (const parameterKey in components.parameters) {
            if (components.parameters.hasOwnProperty(parameterKey)) {
                const parameter = components.parameters[parameterKey];
                walkParameterReferences(parameter, modify);
            }
        }
    }
    if (components.examples !== undefined) {
        for (const exampleKey in components.examples) {
            if (components.examples.hasOwnProperty(exampleKey)) {
                const example = components.examples[exampleKey];
                walkExampleReferences(example, modify);
            }
        }
    }
    if (components.requestBodies !== undefined) {
        for (const requestBodyKey in components.requestBodies) {
            if (components.requestBodies.hasOwnProperty(requestBodyKey)) {
                const requestBody = components.requestBodies[requestBodyKey];
                walkRequestBodyReferences(requestBody, modify);
            }
        }
    }
    if (components.headers !== undefined) {
        for (const headerKey in components.headers) {
            if (components.headers.hasOwnProperty(headerKey)) {
                const header = components.headers[headerKey];
                walkHeaderReferences(header, modify);
            }
        }
    }
    if (components.links !== undefined) {
        for (const linkKey in components.links) {
            if (components.links.hasOwnProperty(linkKey)) {
                const link = components.links[linkKey];
                walkLinkReferences(link, modify);
            }
        }
    }
    if (components.callbacks !== undefined) {
        for (const componentKey in components.callbacks) {
            if (components.callbacks.hasOwnProperty(componentKey)) {
                const callback = components.callbacks[componentKey];
                walkCallbackReferences(callback, modify);
            }
        }
    }
}
exports.walkComponentReferences = walkComponentReferences;
function walkPathReferences(paths, modify) {
    for (const pathKey in paths) {
        if (paths.hasOwnProperty(pathKey)) {
            const path = paths[pathKey];
            walkPathItemReferences(path, modify);
        }
    }
}
exports.walkPathReferences = walkPathReferences;
function walkAllReferences(oas, modify) {
    walkPathReferences(oas.paths, modify);
    if (oas.components !== undefined)
        walkComponentReferences(oas.components, modify);
}
exports.walkAllReferences = walkAllReferences;
