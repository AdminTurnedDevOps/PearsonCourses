import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CrossVersionObjectReference contains enough information to let you identify the referred resource.
 */
export interface ICrossVersionObjectReference {
    /**
     * apiVersion is the API version of the referent
     */
    "apiVersion"?: string;
    /**
     * kind is the kind of the referent; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "kind": string;
    /**
     * name is the name of the referent; More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
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
export { ICrossVersionObjectReference as IIoK8sApiAutoscalingV2CrossVersionObjectReference, CrossVersionObjectReference as IoK8sApiAutoscalingV2CrossVersionObjectReference };
