import { IIoK8sApiAuthorizationV1beta1NonResourceAttributes } from "./NonResourceAttributes";
import { IIoK8sApiAuthorizationV1beta1ResourceAttributes } from "./ResourceAttributes";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * SelfSubjectAccessReviewSpec is a description of the access request.  Exactly one of ResourceAuthorizationAttributes and NonResourceAuthorizationAttributes must be set
 */
export interface ISelfSubjectAccessReviewSpec {
    /**
     * NonResourceAttributes describes information for a non-resource access request
     */
    "nonResourceAttributes"?: IIoK8sApiAuthorizationV1beta1NonResourceAttributes;
    /**
     * ResourceAuthorizationAttributes describes information for a resource access request
     */
    "resourceAttributes"?: IIoK8sApiAuthorizationV1beta1ResourceAttributes;
}
/**
 * SelfSubjectAccessReviewSpec is a description of the access request.  Exactly one of ResourceAuthorizationAttributes and NonResourceAuthorizationAttributes must be set
 */
export declare class SelfSubjectAccessReviewSpec extends Model<ISelfSubjectAccessReviewSpec> implements ISelfSubjectAccessReviewSpec {
    "nonResourceAttributes"?: IIoK8sApiAuthorizationV1beta1NonResourceAttributes;
    "resourceAttributes"?: IIoK8sApiAuthorizationV1beta1ResourceAttributes;
    constructor(data?: ModelData<ISelfSubjectAccessReviewSpec>);
}
export { ISelfSubjectAccessReviewSpec as IIoK8sApiAuthorizationV1beta1SelfSubjectAccessReviewSpec, SelfSubjectAccessReviewSpec as IoK8sApiAuthorizationV1beta1SelfSubjectAccessReviewSpec };
