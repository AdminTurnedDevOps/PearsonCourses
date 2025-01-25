import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ServiceReference holds a reference to Service.legacy.k8s.io
 */
export interface IServiceReference {
    /**
     * name is the name of the service. Required
     */
    "name": string;
    /**
     * namespace is the namespace of the service. Required
     */
    "namespace": string;
    /**
     * path is an optional URL path at which the webhook will be contacted.
     */
    "path"?: string;
    /**
     * port is an optional service port at which the webhook will be contacted. `port` should be a valid port number (1-65535, inclusive). Defaults to 443 for backward compatibility.
     */
    "port"?: number;
}
/**
 * ServiceReference holds a reference to Service.legacy.k8s.io
 */
export declare class ServiceReference extends Model<IServiceReference> implements IServiceReference {
    "name": string;
    "namespace": string;
    "path"?: string;
    "port"?: number;
    constructor(data?: ModelData<IServiceReference>);
}
export { IServiceReference as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1ServiceReference, ServiceReference as IoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1ServiceReference };
