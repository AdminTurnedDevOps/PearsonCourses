var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';
import specs from '@asyncapi/specs';
import { specVersions } from '../constants';
export function AsyncAPISchemaParser() {
    return {
        validate,
        parse,
        getMimeTypes,
    };
}
function validate(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const version = input.asyncapi.semver.version;
        const validator = getSchemaValidator(version);
        let result = [];
        const valid = validator(input.data);
        if (!valid && validator.errors) {
            result = ajvToSpectralResult(input.path, [...validator.errors]);
        }
        return result;
    });
}
function parse(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return input.data;
    });
}
function getMimeTypes() {
    const mimeTypes = [
        'application/schema;version=draft-07',
        'application/schema+json;version=draft-07',
        'application/schema+yaml;version=draft-07',
    ];
    specVersions.forEach((version) => {
        mimeTypes.push(`application/vnd.aai.asyncapi;version=${version}`, `application/vnd.aai.asyncapi+json;version=${version}`, `application/vnd.aai.asyncapi+yaml;version=${version}`);
    });
    return mimeTypes;
}
function ajvToSpectralResult(path, errors) {
    return errors.map(error => {
        return {
            message: error.message,
            path: [...path, ...error.instancePath.replace(/^\//, '').split('/')],
        };
    });
}
function getSchemaValidator(version) {
    const ajv = getAjvInstance();
    let validator = ajv.getSchema(version);
    if (!validator) {
        const schema = preparePayloadSchema(specs.schemas[version], version);
        ajv.addSchema(schema, version);
        validator = ajv.getSchema(version);
    }
    return validator;
}
/**
 * To validate the schema of the payload we just need a small portion of official AsyncAPI spec JSON Schema, the Schema Object in particular. The definition of Schema Object must be
 * included in the returned JSON Schema.
 */
function preparePayloadSchema(asyncapiSchema, version) {
    const payloadSchema = `http://asyncapi.com/definitions/${version}/schema.json`;
    const definitions = asyncapiSchema.definitions;
    if (definitions === undefined) {
        throw new Error('AsyncAPI schema must contain definitions');
    }
    // Remove the meta schemas because they are already present within Ajv, and it's not possible to add duplicated schemas.
    delete definitions['http://json-schema.org/draft-07/schema'];
    delete definitions['http://json-schema.org/draft-04/schema'];
    return {
        $ref: payloadSchema,
        definitions
    };
}
let _ajv;
function getAjvInstance() {
    if (_ajv) {
        return _ajv;
    }
    _ajv = new Ajv({
        allErrors: true,
        meta: true,
        messages: true,
        strict: false,
        allowUnionTypes: true,
        unicodeRegExp: false,
    });
    addFormats(_ajv);
    ajvErrors(_ajv);
    return _ajv;
}
