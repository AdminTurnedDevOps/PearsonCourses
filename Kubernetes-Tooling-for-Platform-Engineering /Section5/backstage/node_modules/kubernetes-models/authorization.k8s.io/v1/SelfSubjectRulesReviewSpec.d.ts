import { ModelData, Model } from "@kubernetes-models/base";
/**
 * SelfSubjectRulesReviewSpec defines the specification for SelfSubjectRulesReview.
 */
export interface ISelfSubjectRulesReviewSpec {
    /**
     * Namespace to evaluate rules for. Required.
     */
    "namespace"?: string;
}
/**
 * SelfSubjectRulesReviewSpec defines the specification for SelfSubjectRulesReview.
 */
export declare class SelfSubjectRulesReviewSpec extends Model<ISelfSubjectRulesReviewSpec> implements ISelfSubjectRulesReviewSpec {
    "namespace"?: string;
    constructor(data?: ModelData<ISelfSubjectRulesReviewSpec>);
}
export { ISelfSubjectRulesReviewSpec as IIoK8sApiAuthorizationV1SelfSubjectRulesReviewSpec, SelfSubjectRulesReviewSpec as IoK8sApiAuthorizationV1SelfSubjectRulesReviewSpec };
