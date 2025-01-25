import { IIoK8sApiNetworkingV1IngressLoadBalancerStatus } from "./IngressLoadBalancerStatus";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * IngressStatus describe the current state of the Ingress.
 */
export interface IIngressStatus {
    /**
     * loadBalancer contains the current status of the load-balancer.
     */
    "loadBalancer"?: IIoK8sApiNetworkingV1IngressLoadBalancerStatus;
}
/**
 * IngressStatus describe the current state of the Ingress.
 */
export declare class IngressStatus extends Model<IIngressStatus> implements IIngressStatus {
    "loadBalancer"?: IIoK8sApiNetworkingV1IngressLoadBalancerStatus;
    constructor(data?: ModelData<IIngressStatus>);
}
export { IIngressStatus as IIoK8sApiNetworkingV1IngressStatus, IngressStatus as IoK8sApiNetworkingV1IngressStatus };
