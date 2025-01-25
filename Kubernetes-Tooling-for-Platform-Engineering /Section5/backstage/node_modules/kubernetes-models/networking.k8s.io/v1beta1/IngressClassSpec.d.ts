import { IIoK8sApiNetworkingV1beta1IngressClassParametersReference } from "./IngressClassParametersReference";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * IngressClassSpec provides information about the class of an Ingress.
 */
export interface IIngressClassSpec {
    /**
     * Controller refers to the name of the controller that should handle this class. This allows for different "flavors" that are controlled by the same controller. For example, you may have different Parameters for the same implementing controller. This should be specified as a domain-prefixed path no more than 250 characters in length, e.g. "acme.io/ingress-controller". This field is immutable.
     */
    "controller"?: string;
    /**
     * Parameters is a link to a custom resource containing additional configuration for the controller. This is optional if the controller does not require extra parameters.
     */
    "parameters"?: IIoK8sApiNetworkingV1beta1IngressClassParametersReference;
}
/**
 * IngressClassSpec provides information about the class of an Ingress.
 */
export declare class IngressClassSpec extends Model<IIngressClassSpec> implements IIngressClassSpec {
    "controller"?: string;
    "parameters"?: IIoK8sApiNetworkingV1beta1IngressClassParametersReference;
    constructor(data?: ModelData<IIngressClassSpec>);
}
export { IIngressClassSpec as IIoK8sApiNetworkingV1beta1IngressClassSpec, IngressClassSpec as IoK8sApiNetworkingV1beta1IngressClassSpec };
