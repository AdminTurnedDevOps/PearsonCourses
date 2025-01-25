import { IIoK8sApimachineryPkgApisMetaV1Condition } from "@kubernetes-models/apimachinery/apis/meta/v1/Condition";
import { IIoK8sApiCoreV1LoadBalancerStatus } from "./LoadBalancerStatus";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ServiceStatus represents the current status of a service.
 */
export interface IServiceStatus {
    /**
     * Current service state
     */
    "conditions"?: Array<IIoK8sApimachineryPkgApisMetaV1Condition>;
    /**
     * LoadBalancer contains the current status of the load-balancer, if one is present.
     */
    "loadBalancer"?: IIoK8sApiCoreV1LoadBalancerStatus;
}
/**
 * ServiceStatus represents the current status of a service.
 */
export declare class ServiceStatus extends Model<IServiceStatus> implements IServiceStatus {
    "conditions"?: Array<IIoK8sApimachineryPkgApisMetaV1Condition>;
    "loadBalancer"?: IIoK8sApiCoreV1LoadBalancerStatus;
    constructor(data?: ModelData<IServiceStatus>);
}
export { IServiceStatus as IIoK8sApiCoreV1ServiceStatus, ServiceStatus as IoK8sApiCoreV1ServiceStatus };
