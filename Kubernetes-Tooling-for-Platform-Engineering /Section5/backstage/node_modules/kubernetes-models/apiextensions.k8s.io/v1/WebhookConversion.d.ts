import { IIoK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookClientConfig } from "./WebhookClientConfig";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * WebhookConversion describes how to call a conversion webhook
 */
export interface IWebhookConversion {
    /**
     * clientConfig is the instructions for how to call the webhook if strategy is `Webhook`.
     */
    "clientConfig"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookClientConfig;
    /**
     * conversionReviewVersions is an ordered list of preferred `ConversionReview` versions the Webhook expects. The API server will use the first version in the list which it supports. If none of the versions specified in this list are supported by API server, conversion will fail for the custom resource. If a persisted Webhook configuration specifies allowed versions and does not include any versions known to the API Server, calls to the webhook will fail.
     */
    "conversionReviewVersions": Array<string>;
}
/**
 * WebhookConversion describes how to call a conversion webhook
 */
export declare class WebhookConversion extends Model<IWebhookConversion> implements IWebhookConversion {
    "clientConfig"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookClientConfig;
    "conversionReviewVersions": Array<string>;
    constructor(data?: ModelData<IWebhookConversion>);
}
export { IWebhookConversion as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookConversion, WebhookConversion as IoK8sApiextensionsApiserverPkgApisApiextensionsV1WebhookConversion };
