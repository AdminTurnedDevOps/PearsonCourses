import { ModelData, Model } from "@kubernetes-models/base";
/**
 * StatefulSetOrdinals describes the policy used for replica ordinal assignment in this StatefulSet.
 */
export interface IStatefulSetOrdinals {
    /**
     * start is the number representing the first replica's index. It may be used to number replicas from an alternate index (eg: 1-indexed) over the default 0-indexed names, or to orchestrate progressive movement of replicas from one StatefulSet to another. If set, replica indices will be in the range:
     *   [.spec.ordinals.start, .spec.ordinals.start + .spec.replicas).
     * If unset, defaults to 0. Replica indices will be in the range:
     *   [0, .spec.replicas).
     */
    "start"?: number;
}
/**
 * StatefulSetOrdinals describes the policy used for replica ordinal assignment in this StatefulSet.
 */
export declare class StatefulSetOrdinals extends Model<IStatefulSetOrdinals> implements IStatefulSetOrdinals {
    "start"?: number;
    constructor(data?: ModelData<IStatefulSetOrdinals>);
}
export { IStatefulSetOrdinals as IIoK8sApiAppsV1StatefulSetOrdinals, StatefulSetOrdinals as IoK8sApiAppsV1StatefulSetOrdinals };
