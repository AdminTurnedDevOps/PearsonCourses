import { IIoK8sApiCoreV1LoadBalancerIngress } from "./LoadBalancerIngress";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * LoadBalancerStatus represents the status of a load-balancer.
 */
export interface ILoadBalancerStatus {
    /**
     * Ingress is a list containing ingress points for the load-balancer. Traffic intended for the service should be sent to these ingress points.
     */
    "ingress"?: Array<IIoK8sApiCoreV1LoadBalancerIngress>;
}
/**
 * LoadBalancerStatus represents the status of a load-balancer.
 */
export declare class LoadBalancerStatus extends Model<ILoadBalancerStatus> implements ILoadBalancerStatus {
    "ingress"?: Array<IIoK8sApiCoreV1LoadBalancerIngress>;
    constructor(data?: ModelData<ILoadBalancerStatus>);
}
export { ILoadBalancerStatus as IIoK8sApiCoreV1LoadBalancerStatus, LoadBalancerStatus as IoK8sApiCoreV1LoadBalancerStatus };
