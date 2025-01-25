import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key <topologyKey> matches that of any node on which a pod of the set of pods is running
 */
export interface IPodAffinityTerm {
    /**
     * A label query over a set of resources, in this case pods.
     */
    "labelSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * A label query over the set of namespaces that the term applies to. The term is applied to the union of the namespaces selected by this field and the ones listed in the namespaces field. null selector and null or empty namespaces list means "this pod's namespace". An empty selector ({}) matches all namespaces.
     */
    "namespaceSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * namespaces specifies a static list of namespace names that the term applies to. The term is applied to the union of the namespaces listed in this field and the ones selected by namespaceSelector. null or empty namespaces list and null namespaceSelector means "this pod's namespace".
     */
    "namespaces"?: Array<string>;
    /**
     * This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. Empty topologyKey is not allowed.
     */
    "topologyKey": string;
}
/**
 * Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key <topologyKey> matches that of any node on which a pod of the set of pods is running
 */
export declare class PodAffinityTerm extends Model<IPodAffinityTerm> implements IPodAffinityTerm {
    "labelSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "namespaceSelector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "namespaces"?: Array<string>;
    "topologyKey": string;
    constructor(data?: ModelData<IPodAffinityTerm>);
}
export { IPodAffinityTerm as IIoK8sApiCoreV1PodAffinityTerm, PodAffinityTerm as IoK8sApiCoreV1PodAffinityTerm };
