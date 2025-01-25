type IncomingMessage = any;
type ServerResponse = any;
import type { Logger } from "../../createLogger";
export type MiddlewareOptions = {
    path?: string;
    log?: Logger;
    /** @deprecated `onUnhandledRequest()` is deprecated and will be removed in a future release of `@octokit/webhooks` */
    onUnhandledRequest?: (request: IncomingMessage, response: ServerResponse) => void;
};
export {};
