import { IIoK8sApimachineryPkgUtilIntstrIntOrString } from "@kubernetes-models/apimachinery/util/intstr/IntOrString";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * TCPSocketAction describes an action based on opening a socket
 */
export interface ITCPSocketAction {
    /**
     * Optional: Host name to connect to, defaults to the pod IP.
     */
    "host"?: string;
    /**
     * Number or name of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
     */
    "port": IIoK8sApimachineryPkgUtilIntstrIntOrString;
}
/**
 * TCPSocketAction describes an action based on opening a socket
 */
export declare class TCPSocketAction extends Model<ITCPSocketAction> implements ITCPSocketAction {
    "host"?: string;
    "port": IIoK8sApimachineryPkgUtilIntstrIntOrString;
    constructor(data?: ModelData<ITCPSocketAction>);
}
export { ITCPSocketAction as IIoK8sApiCoreV1TCPSocketAction, TCPSocketAction as IoK8sApiCoreV1TCPSocketAction };
