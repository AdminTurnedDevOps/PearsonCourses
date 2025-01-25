import { IIoK8sApiCoreV1NodeAffinity } from "./NodeAffinity";
import { IIoK8sApiCoreV1PodAffinity } from "./PodAffinity";
import { IIoK8sApiCoreV1PodAntiAffinity } from "./PodAntiAffinity";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Affinity is a group of affinity scheduling rules.
 */
export interface IAffinity {
    /**
     * Describes node affinity scheduling rules for the pod.
     */
    "nodeAffinity"?: IIoK8sApiCoreV1NodeAffinity;
    /**
     * Describes pod affinity scheduling rules (e.g. co-locate this pod in the same node, zone, etc. as some other pod(s)).
     */
    "podAffinity"?: IIoK8sApiCoreV1PodAffinity;
    /**
     * Describes pod anti-affinity scheduling rules (e.g. avoid putting this pod in the same node, zone, etc. as some other pod(s)).
     */
    "podAntiAffinity"?: IIoK8sApiCoreV1PodAntiAffinity;
}
/**
 * Affinity is a group of affinity scheduling rules.
 */
export declare class Affinity extends Model<IAffinity> implements IAffinity {
    "nodeAffinity"?: IIoK8sApiCoreV1NodeAffinity;
    "podAffinity"?: IIoK8sApiCoreV1PodAffinity;
    "podAntiAffinity"?: IIoK8sApiCoreV1PodAntiAffinity;
    constructor(data?: ModelData<IAffinity>);
}
export { IAffinity as IIoK8sApiCoreV1Affinity, Affinity as IoK8sApiCoreV1Affinity };
