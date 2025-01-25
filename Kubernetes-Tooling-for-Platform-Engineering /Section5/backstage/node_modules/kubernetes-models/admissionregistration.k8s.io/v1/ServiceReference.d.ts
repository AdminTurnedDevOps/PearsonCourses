import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ServiceReference holds a reference to Service.legacy.k8s.io
 */
export interface IServiceReference {
    /**
     * `name` is the name of the service. Required
     */
    "name": string;
    /**
     * `namespace` is the namespace of the service. Required
     */
    "namespace": string;
    /**
     * `path` is an optional URL path which will be sent in any request to this service.
     */
    "path"?: string;
    /**
     * If specified, the port on the service that hosting webhook. Default to 443 for backward compatibility. `port` should be a valid port number (1-65535, inclusive).
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
export { IServiceReference as IIoK8sApiAdmissionregistrationV1ServiceReference, ServiceReference as IoK8sApiAdmissionregistrationV1ServiceReference };
