import Ajv from 'ajv';
import { OpenAPIV3 } from '../../framework/types';
export declare function dereferenceParameter(apiDocs: OpenAPIV3.Document, parameter: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject): OpenAPIV3.ParameterObject;
export declare function normalizeParameter(ajv: Ajv, parameter: OpenAPIV3.ParameterObject): {
    name: string;
    schema: OpenAPIV3.SchemaObject;
};
export declare function dereferenceSchema(ajv: Ajv, ref: string): any;
