import { IIoK8sApiCoreV1TypedLocalObjectReference } from "../../v1/TypedLocalObjectReference";
import { IIoK8sApiNetworkingV1IngressServiceBackend } from "./IngressServiceBackend";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * IngressBackend describes all endpoints for a given service and port.
 */
export interface IIngressBackend {
    /**
     * resource is an ObjectRef to another Kubernetes resource in the namespace of the Ingress object. If resource is specified, a service.Name and service.Port must not be specified. This is a mutually exclusive setting with "Service".
     */
    "resource"?: IIoK8sApiCoreV1TypedLocalObjectReference;
    /**
     * service references a service as a backend. This is a mutually exclusive setting with "Resource".
     */
    "service"?: IIoK8sApiNetworkingV1IngressServiceBackend;
}
/**
 * IngressBackend describes all endpoints for a given service and port.
 */
export declare class IngressBackend extends Model<IIngressBackend> implements IIngressBackend {
    "resource"?: IIoK8sApiCoreV1TypedLocalObjectReference;
    "service"?: IIoK8sApiNetworkingV1IngressServiceBackend;
    constructor(data?: ModelData<IIngressBackend>);
}
export { IIngressBackend as IIoK8sApiNetworkingV1IngressBackend, IngressBackend as IoK8sApiNetworkingV1IngressBackend };
