"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipObject = exports.findResponseContent = exports.deprecationWarning = exports.ajvErrorsToValidatorError = exports.augmentAjvErrors = exports.ContentType = void 0;
class ContentType {
    constructor(contentType) {
        this.mediaType = null;
        this.parameters = {};
        if (contentType) {
            const parameterRegExp = /;\s*([^=]+)=([^;]+)/g;
            const paramMatches = contentType.matchAll(parameterRegExp);
            if (paramMatches) {
                this.parameters = {};
                for (let match of paramMatches) {
                    const key = match[1].toLowerCase();
                    let value = match[2];
                    if (key === 'charset') {
                        // charset parameter is case insensitive
                        // @see [rfc2046, Section 4.1.2](https://www.rfc-editor.org/rfc/rfc2046#section-4.1.2)
                        value = value.toLowerCase();
                    }
                    this.parameters[key] = value;
                }
                ;
            }
            this.mediaType = contentType.split(';')[0].toLowerCase().trim();
            this.isWildCard = RegExp(/^[a-z]+\/\*$/).test(contentType);
        }
    }
    static from(req) {
        return new ContentType(req.headers['content-type']);
    }
    static fromString(type) {
        return new ContentType(type);
    }
    equivalents() {
        const types = [];
        if (!this.mediaType) {
            return types;
        }
        types.push(new ContentType(this.mediaType));
        if (!this.parameters['charset']) {
            types.push(new ContentType(`${this.normalize(['charset'])}; charset=utf-8`));
        }
        return types;
    }
    normalize(excludeParams = ['boundary']) {
        let parameters = '';
        Object.keys(this.parameters)
            .sort()
            .forEach((key) => {
            if (!excludeParams.includes(key)) {
                parameters += `; ${key}=${this.parameters[key]}`;
            }
        });
        if (this.mediaType)
            return this.mediaType + parameters;
    }
}
exports.ContentType = ContentType;
/**
 * (side-effecting) modifies the errors object
 * TODO - do this some other way
 * @param errors
 */
function augmentAjvErrors(errors = []) {
    errors.forEach((e) => {
        if (e.keyword === 'enum') {
            const params = e.params;
            const allowedEnumValues = params === null || params === void 0 ? void 0 : params.allowedValues;
            e.message = !!allowedEnumValues
                ? `${e.message}: ${allowedEnumValues.join(', ')}`
                : e.message;
        }
    });
    const serDesPaths = new Set();
    return errors.filter((e) => {
        if (serDesPaths.has(e.schemaPath)) {
            return false;
        }
        if (e.params['x-eov-res-serdes']) {
            // If response serialization failed,
            // silence additional errors about not being a string.
            serDesPaths.add(e.schemaPath.replace('x-eov-res-serdes', 'x-eov-type'));
        }
        return true;
    });
}
exports.augmentAjvErrors = augmentAjvErrors;
function ajvErrorsToValidatorError(status, errors) {
    return {
        status,
        errors: errors.map((e) => {
            var _a, _b;
            const params = e.params;
            const required = (params === null || params === void 0 ? void 0 : params.missingProperty) &&
                e.instancePath + '/' + params.missingProperty;
            const additionalProperty = (params === null || params === void 0 ? void 0 : params.additionalProperty) &&
                e.instancePath + '/' + params.additionalProperty;
            const path = (_b = (_a = required !== null && required !== void 0 ? required : additionalProperty) !== null && _a !== void 0 ? _a : e.instancePath) !== null && _b !== void 0 ? _b : e.schemaPath;
            return {
                path,
                message: e.message,
                errorCode: `${e.keyword}.openapi.validation`,
            };
        }),
    };
}
exports.ajvErrorsToValidatorError = ajvErrorsToValidatorError;
exports.deprecationWarning = process.env.NODE_ENV !== 'production' ? console.warn : () => { };
/**
 *
 * @param accepts the list of accepted media types
 * @param expectedTypes - expected media types defined in the response schema
 * @returns the content-type
 */
const findResponseContent = function (accepts, expectedTypes) {
    const expectedTypesMap = new Map();
    for (let type of expectedTypes) {
        expectedTypesMap.set(ContentType.fromString(type).normalize(), type);
    }
    // if accepts are supplied, try to find a match, and use its validator
    for (const accept of accepts) {
        const act = ContentType.fromString(accept);
        const normalizedCT = act.normalize();
        if (normalizedCT === '*/*') {
            return expectedTypes[0];
        }
        else if (expectedTypesMap.has(normalizedCT)) {
            return normalizedCT;
        }
        else if (expectedTypesMap.has(act.mediaType)) {
            return act.mediaType;
        }
        else if (act.isWildCard) {
            // wildcard of type application/*
            const [type] = normalizedCT.split('/', 1);
            for (const expectedType of expectedTypesMap) {
                if (new RegExp(`^${type}\/.+$`).test(expectedType[0])) {
                    return expectedType[1];
                }
            }
        }
        else {
            for (const expectedType of expectedTypes) {
                const ect = ContentType.fromString(expectedType);
                if (ect.mediaType === act.mediaType) {
                    return expectedType;
                }
            }
        }
    }
    return null;
};
exports.findResponseContent = findResponseContent;
const zipObject = (keys, values) => keys.reduce((acc, key, idx) => {
    acc[key] = values[idx];
    return acc;
}, {});
exports.zipObject = zipObject;
//# sourceMappingURL=util.js.map