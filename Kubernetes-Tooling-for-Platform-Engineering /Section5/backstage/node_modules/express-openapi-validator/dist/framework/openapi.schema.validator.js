"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAPISchemaValidator = void 0;
const ajv_draft_04_1 = require("ajv-draft-04");
const ajv_formats_1 = require("ajv-formats");
// https://github.com/OAI/OpenAPI-Specification/blob/master/schemas/v3.0/schema.json
const openapi3Schema = require("./openapi.v3.schema.json");
class OpenAPISchemaValidator {
    constructor(opts) {
        const options = {
            schemaId: 'id',
            allErrors: true,
            validateFormats: true,
            coerceTypes: false,
            useDefaults: false,
            // Strict enforcement is nice, but schema is controlled by this library and known to be valid
            strict: false,
        };
        if (!opts.validateApiSpec) {
            options.validateSchema = false;
        }
        const v = new ajv_draft_04_1.default(options);
        (0, ajv_formats_1.default)(v, ['email', 'regex', 'uri', 'uri-reference']);
        const ver = opts.version && parseInt(String(opts.version), 10);
        if (!ver)
            throw Error('version missing from OpenAPI specification');
        if (ver != 3)
            throw Error('OpenAPI v3 specification version is required');
        v.addSchema(openapi3Schema);
        this.validator = v.compile(openapi3Schema);
    }
    validate(openapiDoc) {
        const valid = this.validator(openapiDoc);
        if (!valid) {
            return { errors: this.validator.errors };
        }
        else {
            return { errors: [] };
        }
    }
}
exports.OpenAPISchemaValidator = OpenAPISchemaValidator;
//# sourceMappingURL=openapi.schema.validator.js.map