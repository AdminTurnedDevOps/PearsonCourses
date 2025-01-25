import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiPolicyV1PodDisruptionBudgetSpec } from "./PodDisruptionBudgetSpec";
import { IIoK8sApiPolicyV1PodDisruptionBudgetStatus } from "./PodDisruptionBudgetStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PodDisruptionBudget is an object to define the max disruption that can be caused to a collection of pods
 */
export interface IPodDisruptionBudget extends TypeMeta {
    "apiVersion": "policy/v1";
    "kind": "PodDisruptionBudget";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Specification of the desired behavior of the PodDisruptionBudget.
     */
    "spec"?: IIoK8sApiPolicyV1PodDisruptionBudgetSpec;
    /**
     * Most recently observed status of the PodDisruptionBudget.
     */
    "status"?: IIoK8sApiPolicyV1PodDisruptionBudgetStatus;
}
/**
 * PodDisruptionBudget is an object to define the max disruption that can be caused to a collection of pods
 */
export declare class PodDisruptionBudget extends Model<IPodDisruptionBudget> implements IPodDisruptionBudget {
    "apiVersion": IPodDisruptionBudget["apiVersion"];
    "kind": IPodDisruptionBudget["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiPolicyV1PodDisruptionBudgetSpec;
    "status"?: IIoK8sApiPolicyV1PodDisruptionBudgetStatus;
    static apiVersion: IPodDisruptionBudget["apiVersion"];
    static kind: IPodDisruptionBudget["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPodDisruptionBudget>;
    constructor(data?: ModelData<IPodDisruptionBudget>);
}
export { IPodDisruptionBudget as IIoK8sApiPolicyV1PodDisruptionBudget, PodDisruptionBudget as IoK8sApiPolicyV1PodDisruptionBudget };
