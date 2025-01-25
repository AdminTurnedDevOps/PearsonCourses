import { ModelData, Model } from "@kubernetes-models/base";
export interface ISelfSubjectRulesReviewSpec {
    /**
     * Namespace to evaluate rules for. Required.
     */
    "namespace"?: string;
}
export declare class SelfSubjectRulesReviewSpec extends Model<ISelfSubjectRulesReviewSpec> implements ISelfSubjectRulesReviewSpec {
    "namespace"?: string;
    constructor(data?: ModelData<ISelfSubjectRulesReviewSpec>);
}
export { ISelfSubjectRulesReviewSpec as IIoK8sApiAuthorizationV1beta1SelfSubjectRulesReviewSpec, SelfSubjectRulesReviewSpec as IoK8sApiAuthorizationV1beta1SelfSubjectRulesReviewSpec };
