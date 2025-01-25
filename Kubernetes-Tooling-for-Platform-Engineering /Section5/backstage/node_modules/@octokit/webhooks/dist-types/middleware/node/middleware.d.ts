type IncomingMessage = any;
type ServerResponse = any;
import type { Webhooks } from "../../index";
import type { MiddlewareOptions } from "./types";
export declare function middleware(webhooks: Webhooks, options: Required<MiddlewareOptions>, request: IncomingMessage, response: ServerResponse, next?: Function): Promise<any>;
export {};
