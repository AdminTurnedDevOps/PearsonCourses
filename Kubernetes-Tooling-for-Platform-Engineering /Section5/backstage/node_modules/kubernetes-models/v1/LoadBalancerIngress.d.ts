import { IIoK8sApiCoreV1PortStatus } from "./PortStatus";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * LoadBalancerIngress represents the status of a load-balancer ingress point: traffic intended for the service should be sent to an ingress point.
 */
export interface ILoadBalancerIngress {
    /**
     * Hostname is set for load-balancer ingress points that are DNS based (typically AWS load-balancers)
     */
    "hostname"?: string;
    /**
     * IP is set for load-balancer ingress points that are IP based (typically GCE or OpenStack load-balancers)
     */
    "ip"?: string;
    /**
     * Ports is a list of records of service ports If used, every port defined in the service should have an entry in it
     */
    "ports"?: Array<IIoK8sApiCoreV1PortStatus>;
}
/**
 * LoadBalancerIngress represents the status of a load-balancer ingress point: traffic intended for the service should be sent to an ingress point.
 */
export declare class LoadBalancerIngress extends Model<ILoadBalancerIngress> implements ILoadBalancerIngress {
    "hostname"?: string;
    "ip"?: string;
    "ports"?: Array<IIoK8sApiCoreV1PortStatus>;
    constructor(data?: ModelData<ILoadBalancerIngress>);
}
export { ILoadBalancerIngress as IIoK8sApiCoreV1LoadBalancerIngress, LoadBalancerIngress as IoK8sApiCoreV1LoadBalancerIngress };
