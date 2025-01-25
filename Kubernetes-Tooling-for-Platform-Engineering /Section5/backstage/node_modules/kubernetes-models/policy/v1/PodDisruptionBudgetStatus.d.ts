import { IIoK8sApimachineryPkgApisMetaV1Condition } from "@kubernetes-models/apimachinery/apis/meta/v1/Condition";
import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodDisruptionBudgetStatus represents information about the status of a PodDisruptionBudget. Status may trail the actual state of a system.
 */
export interface IPodDisruptionBudgetStatus {
    /**
     * Conditions contain conditions for PDB. The disruption controller sets the DisruptionAllowed condition. The following are known values for the reason field (additional reasons could be added in the future): - SyncFailed: The controller encountered an error and wasn't able to compute
     *               the number of allowed disruptions. Therefore no disruptions are
     *               allowed and the status of the condition will be False.
     * - InsufficientPods: The number of pods are either at or below the number
     *                     required by the PodDisruptionBudget. No disruptions are
     *                     allowed and the status of the condition will be False.
     * - SufficientPods: There are more pods than required by the PodDisruptionBudget.
     *                   The condition will be True, and the number of allowed
     *                   disruptions are provided by the disruptionsAllowed property.
     */
    "conditions"?: Array<IIoK8sApimachineryPkgApisMetaV1Condition>;
    /**
     * current number of healthy pods
     */
    "currentHealthy": number;
    /**
     * minimum desired number of healthy pods
     */
    "desiredHealthy": number;
    /**
     * DisruptedPods contains information about pods whose eviction was processed by the API server eviction subresource handler but has not yet been observed by the PodDisruptionBudget controller. A pod will be in this map from the time when the API server processed the eviction request to the time when the pod is seen by PDB controller as having been marked for deletion (or after a timeout). The key in the map is the name of the pod and the value is the time when the API server processed the eviction request. If the deletion didn't occur and a pod is still there it will be removed from the list automatically by PodDisruptionBudget controller after some time. If everything goes smooth this map should be empty for the most of the time. Large number of entries in the map may indicate problems with pod deletions.
     */
    "disruptedPods"?: {
        [key: string]: IIoK8sApimachineryPkgApisMetaV1Time;
    };
    /**
     * Number of pod disruptions that are currently allowed.
     */
    "disruptionsAllowed": number;
    /**
     * total number of pods counted by this disruption budget
     */
    "expectedPods": number;
    /**
     * Most recent generation observed when updating this PDB status. DisruptionsAllowed and other status information is valid only if observedGeneration equals to PDB's object generation.
     */
    "observedGeneration"?: number;
}
/**
 * PodDisruptionBudgetStatus represents information about the status of a PodDisruptionBudget. Status may trail the actual state of a system.
 */
export declare class PodDisruptionBudgetStatus extends Model<IPodDisruptionBudgetStatus> implements IPodDisruptionBudgetStatus {
    "conditions"?: Array<IIoK8sApimachineryPkgApisMetaV1Condition>;
    "currentHealthy": number;
    "desiredHealthy": number;
    "disruptedPods"?: {
        [key: string]: IIoK8sApimachineryPkgApisMetaV1Time;
    };
    "disruptionsAllowed": number;
    "expectedPods": number;
    "observedGeneration"?: number;
    constructor(data?: ModelData<IPodDisruptionBudgetStatus>);
}
export { IPodDisruptionBudgetStatus as IIoK8sApiPolicyV1PodDisruptionBudgetStatus, PodDisruptionBudgetStatus as IoK8sApiPolicyV1PodDisruptionBudgetStatus };
