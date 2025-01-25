import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CustomResourceSubresourceStatus defines how to serve the status subresource for CustomResources. Status is represented by the `.status` JSON path inside of a CustomResource. When set, \* exposes a /status subresource for the custom resource \* PUT requests to the /status subresource take a custom resource object, and ignore changes to anything except the status stanza \* PUT/POST/PATCH requests to the custom resource ignore changes to the status stanza
 */
export interface ICustomResourceSubresourceStatus {
}
/**
 * CustomResourceSubresourceStatus defines how to serve the status subresource for CustomResources. Status is represented by the `.status` JSON path inside of a CustomResource. When set, \* exposes a /status subresource for the custom resource \* PUT requests to the /status subresource take a custom resource object, and ignore changes to anything except the status stanza \* PUT/POST/PATCH requests to the custom resource ignore changes to the status stanza
 */
export declare class CustomResourceSubresourceStatus extends Model<ICustomResourceSubresourceStatus> implements ICustomResourceSubresourceStatus {
    constructor(data?: ModelData<ICustomResourceSubresourceStatus>);
}
export { ICustomResourceSubresourceStatus as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceSubresourceStatus, CustomResourceSubresourceStatus as IoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceSubresourceStatus };
