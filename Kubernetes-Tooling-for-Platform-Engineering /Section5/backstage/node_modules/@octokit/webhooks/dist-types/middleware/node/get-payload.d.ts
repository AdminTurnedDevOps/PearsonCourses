import type { WebhookEvent } from "@octokit/webhooks-types";
type IncomingMessage = any;
export declare function getPayload(request: IncomingMessage): Promise<WebhookEvent | string>;
export {};
