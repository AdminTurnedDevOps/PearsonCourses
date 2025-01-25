import { IIoK8sApiCoreV1NodeConfigSource } from "./NodeConfigSource";
import { IIoK8sApiCoreV1Taint } from "./Taint";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NodeSpec describes the attributes that a node is created with.
 */
export interface INodeSpec {
    /**
     * Deprecated: Previously used to specify the source of the node's configuration for the DynamicKubeletConfig feature. This feature is removed.
     */
    "configSource"?: IIoK8sApiCoreV1NodeConfigSource;
    /**
     * Deprecated. Not all kubelets will set this field. Remove field after 1.13. see: https://issues.k8s.io/61966
     */
    "externalID"?: string;
    /**
     * PodCIDR represents the pod IP range assigned to the node.
     */
    "podCIDR"?: string;
    /**
     * podCIDRs represents the IP ranges assigned to the node for usage by Pods on that node. If this field is specified, the 0th entry must match the podCIDR field. It may contain at most 1 value for each of IPv4 and IPv6.
     */
    "podCIDRs"?: Array<string>;
    /**
     * ID of the node assigned by the cloud provider in the format: <ProviderName>://<ProviderSpecificNodeID>
     */
    "providerID"?: string;
    /**
     * If specified, the node's taints.
     */
    "taints"?: Array<IIoK8sApiCoreV1Taint>;
    /**
     * Unschedulable controls node schedulability of new pods. By default, node is schedulable. More info: https://kubernetes.io/docs/concepts/nodes/node/#manual-node-administration
     */
    "unschedulable"?: boolean;
}
/**
 * NodeSpec describes the attributes that a node is created with.
 */
export declare class NodeSpec extends Model<INodeSpec> implements INodeSpec {
    "configSource"?: IIoK8sApiCoreV1NodeConfigSource;
    "externalID"?: string;
    "podCIDR"?: string;
    "podCIDRs"?: Array<string>;
    "providerID"?: string;
    "taints"?: Array<IIoK8sApiCoreV1Taint>;
    "unschedulable"?: boolean;
    constructor(data?: ModelData<INodeSpec>);
}
export { INodeSpec as IIoK8sApiCoreV1NodeSpec, NodeSpec as IoK8sApiCoreV1NodeSpec };
