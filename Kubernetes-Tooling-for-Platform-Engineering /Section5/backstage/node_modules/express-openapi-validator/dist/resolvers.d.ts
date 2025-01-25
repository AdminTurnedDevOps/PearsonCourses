import { RequestHandler } from 'express';
import { RouteMetadata } from './framework/openapi.spec.loader';
import { OpenAPIV3 } from './framework/types';
export declare function defaultResolver(handlersPath: string, route: RouteMetadata, apiDoc: OpenAPIV3.Document): RequestHandler;
export declare function modulePathResolver(handlersPath: string, route: RouteMetadata, apiDoc: OpenAPIV3.Document): RequestHandler;
