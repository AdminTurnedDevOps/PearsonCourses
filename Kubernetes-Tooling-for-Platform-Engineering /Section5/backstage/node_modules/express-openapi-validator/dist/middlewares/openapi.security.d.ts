import { OpenApiRequestHandler, OpenAPIV3, SecurityHandlers } from '../framework/types';
export declare function security(apiDoc: OpenAPIV3.Document, securityHandlers: SecurityHandlers): OpenApiRequestHandler;
