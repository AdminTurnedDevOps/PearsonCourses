import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAuthorizationV1beta1SubjectAccessReviewSpec } from "./SubjectAccessReviewSpec";
import { IIoK8sApiAuthorizationV1beta1SubjectAccessReviewStatus } from "./SubjectAccessReviewStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * SubjectAccessReview checks whether or not a user or group can perform an action.
 */
export interface ISubjectAccessReview extends TypeMeta {
    "apiVersion": "authorization.k8s.io/v1beta1";
    "kind": "SubjectAccessReview";
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec holds information about the request being evaluated
     */
    "spec": IIoK8sApiAuthorizationV1beta1SubjectAccessReviewSpec;
    /**
     * Status is filled in by the server and indicates whether the request is allowed or not
     */
    "status"?: IIoK8sApiAuthorizationV1beta1SubjectAccessReviewStatus;
}
/**
 * SubjectAccessReview checks whether or not a user or group can perform an action.
 */
export declare class SubjectAccessReview extends Model<ISubjectAccessReview> implements ISubjectAccessReview {
    "apiVersion": ISubjectAccessReview["apiVersion"];
    "kind": ISubjectAccessReview["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec": IIoK8sApiAuthorizationV1beta1SubjectAccessReviewSpec;
    "status"?: IIoK8sApiAuthorizationV1beta1SubjectAccessReviewStatus;
    static apiVersion: ISubjectAccessReview["apiVersion"];
    static kind: ISubjectAccessReview["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ISubjectAccessReview>;
    constructor(data?: ModelData<ISubjectAccessReview>);
}
export { ISubjectAccessReview as IIoK8sApiAuthorizationV1beta1SubjectAccessReview, SubjectAccessReview as IoK8sApiAuthorizationV1beta1SubjectAccessReview };
