import { OpenApiContext } from '../framework/openapi.context';
import { OpenApiRequestHandler, OpenAPIV3 } from '../framework/types';
export declare function applyOpenApiMetadata(openApiContext: OpenApiContext, responseApiDoc: OpenAPIV3.Document): OpenApiRequestHandler;
