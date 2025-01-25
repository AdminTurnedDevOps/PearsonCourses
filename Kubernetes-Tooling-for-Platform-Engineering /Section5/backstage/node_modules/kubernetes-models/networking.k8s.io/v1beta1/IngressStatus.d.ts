import { IIoK8sApiCoreV1LoadBalancerStatus } from "../../v1/LoadBalancerStatus";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * IngressStatus describe the current state of the Ingress.
 */
export interface IIngressStatus {
    /**
     * LoadBalancer contains the current status of the load-balancer.
     */
    "loadBalancer"?: IIoK8sApiCoreV1LoadBalancerStatus;
}
/**
 * IngressStatus describe the current state of the Ingress.
 */
export declare class IngressStatus extends Model<IIngressStatus> implements IIngressStatus {
    "loadBalancer"?: IIoK8sApiCoreV1LoadBalancerStatus;
    constructor(data?: ModelData<IIngressStatus>);
}
export { IIngressStatus as IIoK8sApiNetworkingV1beta1IngressStatus, IngressStatus as IoK8sApiNetworkingV1beta1IngressStatus };
