import { ErrorObject } from 'ajv-draft-04';
import { OpenAPIV3 } from './types.js';
export interface OpenAPISchemaValidatorOpts {
    version: string;
    validateApiSpec: boolean;
    extensions?: object;
}
export declare class OpenAPISchemaValidator {
    private validator;
    constructor(opts: OpenAPISchemaValidatorOpts);
    validate(openapiDoc: OpenAPIV3.Document): {
        errors: Array<ErrorObject> | null;
    };
}
