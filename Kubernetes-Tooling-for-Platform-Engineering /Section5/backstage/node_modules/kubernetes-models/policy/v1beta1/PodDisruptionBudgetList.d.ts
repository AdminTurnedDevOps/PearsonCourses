import { IIoK8sApiPolicyV1beta1PodDisruptionBudget } from "./PodDisruptionBudget";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PodDisruptionBudgetList is a collection of PodDisruptionBudgets.
 */
export interface IPodDisruptionBudgetList extends TypeMeta {
    "apiVersion": "policy/v1beta1";
    /**
     * items list individual PodDisruptionBudget objects
     */
    "items": Array<IIoK8sApiPolicyV1beta1PodDisruptionBudget>;
    "kind": "PodDisruptionBudgetList";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * PodDisruptionBudgetList is a collection of PodDisruptionBudgets.
 */
export declare class PodDisruptionBudgetList extends Model<IPodDisruptionBudgetList> implements IPodDisruptionBudgetList {
    "apiVersion": IPodDisruptionBudgetList["apiVersion"];
    "items": Array<IIoK8sApiPolicyV1beta1PodDisruptionBudget>;
    "kind": IPodDisruptionBudgetList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IPodDisruptionBudgetList["apiVersion"];
    static kind: IPodDisruptionBudgetList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPodDisruptionBudgetList>;
    constructor(data?: ModelData<IPodDisruptionBudgetList>);
}
export { IPodDisruptionBudgetList as IIoK8sApiPolicyV1beta1PodDisruptionBudgetList, PodDisruptionBudgetList as IoK8sApiPolicyV1beta1PodDisruptionBudgetList };
