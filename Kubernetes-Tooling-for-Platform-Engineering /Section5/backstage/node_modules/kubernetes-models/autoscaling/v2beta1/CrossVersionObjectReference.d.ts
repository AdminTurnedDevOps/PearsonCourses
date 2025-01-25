import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CrossVersionObjectReference contains enough information to let you identify the referred resource.
 */
export interface ICrossVersionObjectReference {
    /**
     * API version of the referent
     */
    "apiVersion"?: string;
    /**
     * Kind of the referent; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds"
     */
    "kind": string;
    /**
     * Name of the referent; More info: http://kubernetes.io/docs/user-guide/identifiers#names
     */
    "name": string;
}
/**
 * CrossVersionObjectReference contains enough information to let you identify the referred resource.
 */
export declare class CrossVersionObjectReference extends Model<ICrossVersionObjectReference> implements ICrossVersionObjectReference {
    "apiVersion"?: ICrossVersionObjectReference["apiVersion"];
    "kind": ICrossVersionObjectReference["kind"];
    "name": string;
    constructor(data?: ModelData<ICrossVersionObjectReference>);
}
export { ICrossVersionObjectReference as IIoK8sApiAutoscalingV2beta1CrossVersionObjectReference, CrossVersionObjectReference as IoK8sApiAutoscalingV2beta1CrossVersionObjectReference };
