import { IIoK8sApiCoreV1NamespaceCondition } from "./NamespaceCondition";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NamespaceStatus is information about the current status of a Namespace.
 */
export interface INamespaceStatus {
    /**
     * Represents the latest available observations of a namespace's current state.
     */
    "conditions"?: Array<IIoK8sApiCoreV1NamespaceCondition>;
    /**
     * Phase is the current lifecycle phase of the namespace. More info: https://kubernetes.io/docs/tasks/administer-cluster/namespaces/
     *
     * Possible enum values:
     *  - `"Active"` means the namespace is available for use in the system
     *  - `"Terminating"` means the namespace is undergoing graceful termination
     */
    "phase"?: "Active" | "Terminating";
}
/**
 * NamespaceStatus is information about the current status of a Namespace.
 */
export declare class NamespaceStatus extends Model<INamespaceStatus> implements INamespaceStatus {
    "conditions"?: Array<IIoK8sApiCoreV1NamespaceCondition>;
    "phase"?: "Active" | "Terminating";
    constructor(data?: ModelData<INamespaceStatus>);
}
export { INamespaceStatus as IIoK8sApiCoreV1NamespaceStatus, NamespaceStatus as IoK8sApiCoreV1NamespaceStatus };
