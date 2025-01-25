import Ajv from 'ajv';
import { OpenApiRequest, OpenAPIV3, ValidationSchema } from '../../framework/types';
/**
 * A class top parse and mutate the incoming request parameters according to the openapi spec.
 * the request is mutated to accomodate various styles and types e.g. form, explode, deepObject, etc
 */
export declare class RequestParameterMutator {
    private _apiDocs;
    private path;
    private ajv;
    private parsedSchema;
    constructor(ajv: Ajv, apiDocs: OpenAPIV3.Document, path: string, parsedSchema: ValidationSchema);
    /**
     * Modifies an incoming request object by applying the openapi schema
     * req values may be parsed/mutated as a JSON object, JSON Exploded Object, JSON Array, or JSON Exploded Array
     * @param req
     */
    modifyRequest(req: OpenApiRequest): void;
    private handleDeepObject;
    private handleContent;
    private handleFormExplode;
    private parseJsonAndMutateRequest;
    /**
     * used for !explode array parameters
     * @param req
     * @param $in
     * @param name
     * @param delimiter
     * @param rawQuery
     * @private
     */
    private parseJsonArrayAndMutateRequest;
    private explodedJsonObjectAndMutateRequest;
    private explodeJsonArrayAndMutateRequest;
    private isObjectOrXOf;
    private validateArrayDelimiter;
    private validateReservedCharacters;
    private parseQueryStringUndecoded;
}
