import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ServiceReference holds a reference to Service.legacy.k8s.io
 */
export interface IServiceReference {
    /**
     * Name is the name of the service
     */
    "name"?: string;
    /**
     * Namespace is the namespace of the service
     */
    "namespace"?: string;
    /**
     * If specified, the port on the service that hosting webhook. Default to 443 for backward compatibility. `port` should be a valid port number (1-65535, inclusive).
     */
    "port"?: number;
}
/**
 * ServiceReference holds a reference to Service.legacy.k8s.io
 */
export declare class ServiceReference extends Model<IServiceReference> implements IServiceReference {
    "name"?: string;
    "namespace"?: string;
    "port"?: number;
    constructor(data?: ModelData<IServiceReference>);
}
export { IServiceReference as IIoK8sKubeAggregatorPkgApisApiregistrationV1ServiceReference, ServiceReference as IoK8sKubeAggregatorPkgApisApiregistrationV1ServiceReference };
