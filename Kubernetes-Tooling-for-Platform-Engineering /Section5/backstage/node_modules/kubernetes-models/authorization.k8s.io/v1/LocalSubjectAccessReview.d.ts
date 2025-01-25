import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAuthorizationV1SubjectAccessReviewSpec } from "./SubjectAccessReviewSpec";
import { IIoK8sApiAuthorizationV1SubjectAccessReviewStatus } from "./SubjectAccessReviewStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * LocalSubjectAccessReview checks whether or not a user or group can perform an action in a given namespace. Having a namespace scoped resource makes it much easier to grant namespace scoped policy that includes permissions checking.
 */
export interface ILocalSubjectAccessReview extends TypeMeta {
    "apiVersion": "authorization.k8s.io/v1";
    "kind": "LocalSubjectAccessReview";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec holds information about the request being evaluated.  spec.namespace must be equal to the namespace you made the request against.  If empty, it is defaulted.
     */
    "spec": IIoK8sApiAuthorizationV1SubjectAccessReviewSpec;
    /**
     * Status is filled in by the server and indicates whether the request is allowed or not
     */
    "status"?: IIoK8sApiAuthorizationV1SubjectAccessReviewStatus;
}
/**
 * LocalSubjectAccessReview checks whether or not a user or group can perform an action in a given namespace. Having a namespace scoped resource makes it much easier to grant namespace scoped policy that includes permissions checking.
 */
export declare class LocalSubjectAccessReview extends Model<ILocalSubjectAccessReview> implements ILocalSubjectAccessReview {
    "apiVersion": ILocalSubjectAccessReview["apiVersion"];
    "kind": ILocalSubjectAccessReview["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec": IIoK8sApiAuthorizationV1SubjectAccessReviewSpec;
    "status"?: IIoK8sApiAuthorizationV1SubjectAccessReviewStatus;
    static apiVersion: ILocalSubjectAccessReview["apiVersion"];
    static kind: ILocalSubjectAccessReview["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ILocalSubjectAccessReview>;
    constructor(data?: ModelData<ILocalSubjectAccessReview>);
}
export { ILocalSubjectAccessReview as IIoK8sApiAuthorizationV1LocalSubjectAccessReview, LocalSubjectAccessReview as IoK8sApiAuthorizationV1LocalSubjectAccessReview };
