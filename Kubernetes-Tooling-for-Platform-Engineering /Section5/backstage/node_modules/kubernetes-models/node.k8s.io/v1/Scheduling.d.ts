import { IIoK8sApiCoreV1Toleration } from "../../v1/Toleration";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Scheduling specifies the scheduling constraints for nodes supporting a RuntimeClass.
 */
export interface IScheduling {
    /**
     * nodeSelector lists labels that must be present on nodes that support this RuntimeClass. Pods using this RuntimeClass can only be scheduled to a node matched by this selector. The RuntimeClass nodeSelector is merged with a pod's existing nodeSelector. Any conflicts will cause the pod to be rejected in admission.
     */
    "nodeSelector"?: {
        [key: string]: string;
    };
    /**
     * tolerations are appended (excluding duplicates) to pods running with this RuntimeClass during admission, effectively unioning the set of nodes tolerated by the pod and the RuntimeClass.
     */
    "tolerations"?: Array<IIoK8sApiCoreV1Toleration>;
}
/**
 * Scheduling specifies the scheduling constraints for nodes supporting a RuntimeClass.
 */
export declare class Scheduling extends Model<IScheduling> implements IScheduling {
    "nodeSelector"?: {
        [key: string]: string;
    };
    "tolerations"?: Array<IIoK8sApiCoreV1Toleration>;
    constructor(data?: ModelData<IScheduling>);
}
export { IScheduling as IIoK8sApiNodeV1Scheduling, Scheduling as IoK8sApiNodeV1Scheduling };
