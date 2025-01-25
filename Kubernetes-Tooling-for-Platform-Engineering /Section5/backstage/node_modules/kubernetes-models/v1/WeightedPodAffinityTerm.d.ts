import { IIoK8sApiCoreV1PodAffinityTerm } from "./PodAffinityTerm";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * The weights of all of the matched WeightedPodAffinityTerm fields are added per-node to find the most preferred node(s)
 */
export interface IWeightedPodAffinityTerm {
    /**
     * Required. A pod affinity term, associated with the corresponding weight.
     */
    "podAffinityTerm": IIoK8sApiCoreV1PodAffinityTerm;
    /**
     * weight associated with matching the corresponding podAffinityTerm, in the range 1-100.
     */
    "weight": number;
}
/**
 * The weights of all of the matched WeightedPodAffinityTerm fields are added per-node to find the most preferred node(s)
 */
export declare class WeightedPodAffinityTerm extends Model<IWeightedPodAffinityTerm> implements IWeightedPodAffinityTerm {
    "podAffinityTerm": IIoK8sApiCoreV1PodAffinityTerm;
    "weight": number;
    constructor(data?: ModelData<IWeightedPodAffinityTerm>);
}
export { IWeightedPodAffinityTerm as IIoK8sApiCoreV1WeightedPodAffinityTerm, WeightedPodAffinityTerm as IoK8sApiCoreV1WeightedPodAffinityTerm };
