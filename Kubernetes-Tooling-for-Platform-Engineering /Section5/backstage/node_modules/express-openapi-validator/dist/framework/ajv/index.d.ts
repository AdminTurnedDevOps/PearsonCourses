import AjvDraft4 from 'ajv-draft-04';
import { OpenAPIV3, Options } from '../types';
export declare function createRequestAjv(openApiSpec: OpenAPIV3.Document, options?: Options): AjvDraft4;
export declare function createResponseAjv(openApiSpec: OpenAPIV3.Document, options?: Options): AjvDraft4;
