import { IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceSubresourceScale } from "./CustomResourceSubresourceScale";
import { IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceSubresourceStatus } from "./CustomResourceSubresourceStatus";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CustomResourceSubresources defines the status and scale subresources for CustomResources.
 */
export interface ICustomResourceSubresources {
    /**
     * scale indicates the custom resource should serve a `/scale` subresource that returns an `autoscaling/v1` Scale object.
     */
    "scale"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceSubresourceScale;
    /**
     * status indicates the custom resource should serve a `/status` subresource. When enabled: 1. requests to the custom resource primary endpoint ignore changes to the `status` stanza of the object. 2. requests to the custom resource `/status` subresource ignore changes to anything other than the `status` stanza of the object.
     */
    "status"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceSubresourceStatus;
}
/**
 * CustomResourceSubresources defines the status and scale subresources for CustomResources.
 */
export declare class CustomResourceSubresources extends Model<ICustomResourceSubresources> implements ICustomResourceSubresources {
    "scale"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceSubresourceScale;
    "status"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceSubresourceStatus;
    constructor(data?: ModelData<ICustomResourceSubresources>);
}
export { ICustomResourceSubresources as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceSubresources, CustomResourceSubresources as IoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceSubresources };
