import type { Webhooks } from "../../index";
import type { MiddlewareOptions } from "./types";
export declare function createNodeMiddleware(webhooks: Webhooks, { path, onUnhandledRequest, log, }?: MiddlewareOptions): (request: any, response: any, next?: Function | undefined) => Promise<any>;
