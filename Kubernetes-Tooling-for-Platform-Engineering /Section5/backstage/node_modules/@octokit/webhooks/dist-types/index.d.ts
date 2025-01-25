import { createEventHandler } from "./event-handler/index";
import type { EmitterWebhookEvent, EmitterWebhookEventName, HandlerFunction, RemoveHandlerFunction, Options, WebhookError, WebhookEventHandlerError, EmitterWebhookEventWithStringPayloadAndSignature, EmitterWebhookEventWithSignature } from "./types";
export { createNodeMiddleware } from "./middleware/node/index";
export { emitterEventNames } from "./generated/webhook-names";
export type Iverify = {
    /** @deprecated Passing a JSON payload object to `verify()` is deprecated and the functionality will be removed in a future release of `@octokit/webhooks`. */
    (eventPayload: object, signature: string): Promise<boolean>;
    (eventPayload: string, signature: string): Promise<boolean>;
};
export type IverifyAndReceive = {
    /** @deprecated Passing a JSON payload object to `verifyAndReceive()` is deprecated and the functionality will be removed in a future release of `@octokit/webhooks`. */
    (options: EmitterWebhookEventWithSignature): Promise<void>;
    (options: EmitterWebhookEventWithStringPayloadAndSignature): Promise<void>;
};
declare class Webhooks<TTransformed = unknown> {
    sign: (payload: string | object) => Promise<string>;
    verify: Iverify;
    on: <E extends EmitterWebhookEventName>(event: E | E[], callback: HandlerFunction<E, TTransformed>) => void;
    onAny: (callback: (event: EmitterWebhookEvent) => any) => void;
    onError: (callback: (event: WebhookEventHandlerError) => any) => void;
    removeListener: <E extends EmitterWebhookEventName | "*">(event: E | E[], callback: RemoveHandlerFunction<E, TTransformed>) => void;
    receive: (event: EmitterWebhookEvent) => Promise<void>;
    verifyAndReceive: IverifyAndReceive;
    constructor(options: Options<TTransformed> & {
        secret: string;
    });
}
export { createEventHandler, Webhooks, type EmitterWebhookEvent, type EmitterWebhookEventName, type WebhookError, };
