import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAuthorizationV1SelfSubjectRulesReviewSpec } from "./SelfSubjectRulesReviewSpec";
import { IIoK8sApiAuthorizationV1SubjectRulesReviewStatus } from "./SubjectRulesReviewStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * SelfSubjectRulesReview enumerates the set of actions the current user can perform within a namespace. The returned list of actions may be incomplete depending on the server's authorization mode, and any errors experienced during the evaluation. SelfSubjectRulesReview should be used by UIs to show/hide actions, or to quickly let an end user reason about their permissions. It should NOT Be used by external systems to drive authorization decisions as this raises confused deputy, cache lifetime/revocation, and correctness concerns. SubjectAccessReview, and LocalAccessReview are the correct way to defer authorization decisions to the API server.
 */
export interface ISelfSubjectRulesReview extends TypeMeta {
    "apiVersion": "authorization.k8s.io/v1";
    "kind": "SelfSubjectRulesReview";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec holds information about the request being evaluated.
     */
    "spec": IIoK8sApiAuthorizationV1SelfSubjectRulesReviewSpec;
    /**
     * Status is filled in by the server and indicates the set of actions a user can perform.
     */
    "status"?: IIoK8sApiAuthorizationV1SubjectRulesReviewStatus;
}
/**
 * SelfSubjectRulesReview enumerates the set of actions the current user can perform within a namespace. The returned list of actions may be incomplete depending on the server's authorization mode, and any errors experienced during the evaluation. SelfSubjectRulesReview should be used by UIs to show/hide actions, or to quickly let an end user reason about their permissions. It should NOT Be used by external systems to drive authorization decisions as this raises confused deputy, cache lifetime/revocation, and correctness concerns. SubjectAccessReview, and LocalAccessReview are the correct way to defer authorization decisions to the API server.
 */
export declare class SelfSubjectRulesReview extends Model<ISelfSubjectRulesReview> implements ISelfSubjectRulesReview {
    "apiVersion": ISelfSubjectRulesReview["apiVersion"];
    "kind": ISelfSubjectRulesReview["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec": IIoK8sApiAuthorizationV1SelfSubjectRulesReviewSpec;
    "status"?: IIoK8sApiAuthorizationV1SubjectRulesReviewStatus;
    static apiVersion: ISelfSubjectRulesReview["apiVersion"];
    static kind: ISelfSubjectRulesReview["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ISelfSubjectRulesReview>;
    constructor(data?: ModelData<ISelfSubjectRulesReview>);
}
export { ISelfSubjectRulesReview as IIoK8sApiAuthorizationV1SelfSubjectRulesReview, SelfSubjectRulesReview as IoK8sApiAuthorizationV1SelfSubjectRulesReview };
