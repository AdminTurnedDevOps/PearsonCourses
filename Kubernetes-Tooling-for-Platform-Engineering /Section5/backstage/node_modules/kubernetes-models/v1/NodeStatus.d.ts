import { IIoK8sApiCoreV1NodeAddress } from "./NodeAddress";
import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { IIoK8sApiCoreV1NodeCondition } from "./NodeCondition";
import { IIoK8sApiCoreV1NodeConfigStatus } from "./NodeConfigStatus";
import { IIoK8sApiCoreV1NodeDaemonEndpoints } from "./NodeDaemonEndpoints";
import { IIoK8sApiCoreV1ContainerImage } from "./ContainerImage";
import { IIoK8sApiCoreV1NodeSystemInfo } from "./NodeSystemInfo";
import { IIoK8sApiCoreV1AttachedVolume } from "./AttachedVolume";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NodeStatus is information about the current status of a node.
 */
export interface INodeStatus {
    /**
     * List of addresses reachable to the node. Queried from cloud provider, if available. More info: https://kubernetes.io/docs/concepts/nodes/node/#addresses Note: This field is declared as mergeable, but the merge key is not sufficiently unique, which can cause data corruption when it is merged. Callers should instead use a full-replacement patch. See https://pr.k8s.io/79391 for an example. Consumers should assume that addresses can change during the lifetime of a Node. However, there are some exceptions where this may not be possible, such as Pods that inherit a Node's address in its own status or consumers of the downward API (status.hostIP).
     */
    "addresses"?: Array<IIoK8sApiCoreV1NodeAddress>;
    /**
     * Allocatable represents the resources of a node that are available for scheduling. Defaults to Capacity.
     */
    "allocatable"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * Capacity represents the total resources of a node. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#capacity
     */
    "capacity"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * Conditions is an array of current observed node conditions. More info: https://kubernetes.io/docs/concepts/nodes/node/#condition
     */
    "conditions"?: Array<IIoK8sApiCoreV1NodeCondition>;
    /**
     * Status of the config assigned to the node via the dynamic Kubelet config feature.
     */
    "config"?: IIoK8sApiCoreV1NodeConfigStatus;
    /**
     * Endpoints of daemons running on the Node.
     */
    "daemonEndpoints"?: IIoK8sApiCoreV1NodeDaemonEndpoints;
    /**
     * List of container images on this node
     */
    "images"?: Array<IIoK8sApiCoreV1ContainerImage>;
    /**
     * Set of ids/uuids to uniquely identify the node. More info: https://kubernetes.io/docs/concepts/nodes/node/#info
     */
    "nodeInfo"?: IIoK8sApiCoreV1NodeSystemInfo;
    /**
     * NodePhase is the recently observed lifecycle phase of the node. More info: https://kubernetes.io/docs/concepts/nodes/node/#phase The field is never populated, and now is deprecated.
     *
     * Possible enum values:
     *  - `"Pending"` means the node has been created/added by the system, but not configured.
     *  - `"Running"` means the node has been configured and has Kubernetes components running.
     *  - `"Terminated"` means the node has been removed from the cluster.
     */
    "phase"?: "Pending" | "Running" | "Terminated";
    /**
     * List of volumes that are attached to the node.
     */
    "volumesAttached"?: Array<IIoK8sApiCoreV1AttachedVolume>;
    /**
     * List of attachable volumes in use (mounted) by the node.
     */
    "volumesInUse"?: Array<string>;
}
/**
 * NodeStatus is information about the current status of a node.
 */
export declare class NodeStatus extends Model<INodeStatus> implements INodeStatus {
    "addresses"?: Array<IIoK8sApiCoreV1NodeAddress>;
    "allocatable"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "capacity"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "conditions"?: Array<IIoK8sApiCoreV1NodeCondition>;
    "config"?: IIoK8sApiCoreV1NodeConfigStatus;
    "daemonEndpoints"?: IIoK8sApiCoreV1NodeDaemonEndpoints;
    "images"?: Array<IIoK8sApiCoreV1ContainerImage>;
    "nodeInfo"?: IIoK8sApiCoreV1NodeSystemInfo;
    "phase"?: "Pending" | "Running" | "Terminated";
    "volumesAttached"?: Array<IIoK8sApiCoreV1AttachedVolume>;
    "volumesInUse"?: Array<string>;
    constructor(data?: ModelData<INodeStatus>);
}
export { INodeStatus as IIoK8sApiCoreV1NodeStatus, NodeStatus as IoK8sApiCoreV1NodeStatus };
