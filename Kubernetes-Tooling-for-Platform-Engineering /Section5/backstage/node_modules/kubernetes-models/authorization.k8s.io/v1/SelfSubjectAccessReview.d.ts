import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAuthorizationV1SelfSubjectAccessReviewSpec } from "./SelfSubjectAccessReviewSpec";
import { IIoK8sApiAuthorizationV1SubjectAccessReviewStatus } from "./SubjectAccessReviewStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * SelfSubjectAccessReview checks whether or the current user can perform an action.  Not filling in a spec.namespace means "in all namespaces".  Self is a special case, because users should always be able to check whether they can perform an action
 */
export interface ISelfSubjectAccessReview extends TypeMeta {
    "apiVersion": "authorization.k8s.io/v1";
    "kind": "SelfSubjectAccessReview";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec holds information about the request being evaluated.  user and groups must be empty
     */
    "spec": IIoK8sApiAuthorizationV1SelfSubjectAccessReviewSpec;
    /**
     * Status is filled in by the server and indicates whether the request is allowed or not
     */
    "status"?: IIoK8sApiAuthorizationV1SubjectAccessReviewStatus;
}
/**
 * SelfSubjectAccessReview checks whether or the current user can perform an action.  Not filling in a spec.namespace means "in all namespaces".  Self is a special case, because users should always be able to check whether they can perform an action
 */
export declare class SelfSubjectAccessReview extends Model<ISelfSubjectAccessReview> implements ISelfSubjectAccessReview {
    "apiVersion": ISelfSubjectAccessReview["apiVersion"];
    "kind": ISelfSubjectAccessReview["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec": IIoK8sApiAuthorizationV1SelfSubjectAccessReviewSpec;
    "status"?: IIoK8sApiAuthorizationV1SubjectAccessReviewStatus;
    static apiVersion: ISelfSubjectAccessReview["apiVersion"];
    static kind: ISelfSubjectAccessReview["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ISelfSubjectAccessReview>;
    constructor(data?: ModelData<ISelfSubjectAccessReview>);
}
export { ISelfSubjectAccessReview as IIoK8sApiAuthorizationV1SelfSubjectAccessReview, SelfSubjectAccessReview as IoK8sApiAuthorizationV1SelfSubjectAccessReview };
