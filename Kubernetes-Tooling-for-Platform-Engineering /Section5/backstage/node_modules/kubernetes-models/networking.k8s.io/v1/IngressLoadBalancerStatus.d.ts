import { IIoK8sApiNetworkingV1IngressLoadBalancerIngress } from "./IngressLoadBalancerIngress";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * IngressLoadBalancerStatus represents the status of a load-balancer.
 */
export interface IIngressLoadBalancerStatus {
    /**
     * ingress is a list containing ingress points for the load-balancer.
     */
    "ingress"?: Array<IIoK8sApiNetworkingV1IngressLoadBalancerIngress>;
}
/**
 * IngressLoadBalancerStatus represents the status of a load-balancer.
 */
export declare class IngressLoadBalancerStatus extends Model<IIngressLoadBalancerStatus> implements IIngressLoadBalancerStatus {
    "ingress"?: Array<IIoK8sApiNetworkingV1IngressLoadBalancerIngress>;
    constructor(data?: ModelData<IIngressLoadBalancerStatus>);
}
export { IIngressLoadBalancerStatus as IIoK8sApiNetworkingV1IngressLoadBalancerStatus, IngressLoadBalancerStatus as IoK8sApiNetworkingV1IngressLoadBalancerStatus };
