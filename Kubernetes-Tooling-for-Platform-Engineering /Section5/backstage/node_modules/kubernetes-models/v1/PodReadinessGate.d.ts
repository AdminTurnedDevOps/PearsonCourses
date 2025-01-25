import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodReadinessGate contains the reference to a pod condition
 */
export interface IPodReadinessGate {
    /**
     * ConditionType refers to a condition in the pod's condition list with matching type.
     */
    "conditionType": string;
}
/**
 * PodReadinessGate contains the reference to a pod condition
 */
export declare class PodReadinessGate extends Model<IPodReadinessGate> implements IPodReadinessGate {
    "conditionType": string;
    constructor(data?: ModelData<IPodReadinessGate>);
}
export { IPodReadinessGate as IIoK8sApiCoreV1PodReadinessGate, PodReadinessGate as IoK8sApiCoreV1PodReadinessGate };
