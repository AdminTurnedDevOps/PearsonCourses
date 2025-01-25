import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NodeAddress contains information for the node's address.
 */
export interface INodeAddress {
    /**
     * The node address.
     */
    "address": string;
    /**
     * Node address type, one of Hostname, ExternalIP or InternalIP.
     */
    "type": string;
}
/**
 * NodeAddress contains information for the node's address.
 */
export declare class NodeAddress extends Model<INodeAddress> implements INodeAddress {
    "address": string;
    "type": string;
    constructor(data?: ModelData<INodeAddress>);
}
export { INodeAddress as IIoK8sApiCoreV1NodeAddress, NodeAddress as IoK8sApiCoreV1NodeAddress };
