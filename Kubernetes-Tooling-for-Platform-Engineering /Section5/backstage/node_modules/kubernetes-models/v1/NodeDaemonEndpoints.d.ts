import { IIoK8sApiCoreV1DaemonEndpoint } from "./DaemonEndpoint";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NodeDaemonEndpoints lists ports opened by daemons running on the Node.
 */
export interface INodeDaemonEndpoints {
    /**
     * Endpoint on which Kubelet is listening.
     */
    "kubeletEndpoint"?: IIoK8sApiCoreV1DaemonEndpoint;
}
/**
 * NodeDaemonEndpoints lists ports opened by daemons running on the Node.
 */
export declare class NodeDaemonEndpoints extends Model<INodeDaemonEndpoints> implements INodeDaemonEndpoints {
    "kubeletEndpoint"?: IIoK8sApiCoreV1DaemonEndpoint;
    constructor(data?: ModelData<INodeDaemonEndpoints>);
}
export { INodeDaemonEndpoints as IIoK8sApiCoreV1NodeDaemonEndpoints, NodeDaemonEndpoints as IoK8sApiCoreV1NodeDaemonEndpoints };
