import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PriorityClass defines mapping from a priority class name to the priority integer value. The value can be any valid integer.
 */
export interface IPriorityClass extends TypeMeta {
    "apiVersion": "scheduling.k8s.io/v1";
    /**
     * description is an arbitrary string that usually provides guidelines on when this priority class should be used.
     */
    "description"?: string;
    /**
     * globalDefault specifies whether this PriorityClass should be considered as the default priority for pods that do not have any priority class. Only one PriorityClass can be marked as `globalDefault`. However, if more than one PriorityClasses exists with their `globalDefault` field set to true, the smallest value of such global default PriorityClasses will be used as the default priority.
     */
    "globalDefault"?: boolean;
    "kind": "PriorityClass";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * preemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset.
     *
     * Possible enum values:
     *  - `"Never"` means that pod never preempts other pods with lower priority.
     *  - `"PreemptLowerPriority"` means that pod can preempt other pods with lower priority.
     */
    "preemptionPolicy"?: "Never" | "PreemptLowerPriority";
    /**
     * value represents the integer value of this priority class. This is the actual priority that pods receive when they have the name of this class in their pod spec.
     */
    "value": number;
}
/**
 * PriorityClass defines mapping from a priority class name to the priority integer value. The value can be any valid integer.
 */
export declare class PriorityClass extends Model<IPriorityClass> implements IPriorityClass {
    "apiVersion": IPriorityClass["apiVersion"];
    "description"?: string;
    "globalDefault"?: boolean;
    "kind": IPriorityClass["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "preemptionPolicy"?: "Never" | "PreemptLowerPriority";
    "value": number;
    static apiVersion: IPriorityClass["apiVersion"];
    static kind: IPriorityClass["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPriorityClass>;
    constructor(data?: ModelData<IPriorityClass>);
}
export { IPriorityClass as IIoK8sApiSchedulingV1PriorityClass, PriorityClass as IoK8sApiSchedulingV1PriorityClass };
