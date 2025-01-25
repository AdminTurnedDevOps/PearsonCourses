import { IIoK8sApiAuthorizationV1beta1NonResourceAttributes } from "./NonResourceAttributes";
import { IIoK8sApiAuthorizationV1beta1ResourceAttributes } from "./ResourceAttributes";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * SubjectAccessReviewSpec is a description of the access request.  Exactly one of ResourceAuthorizationAttributes and NonResourceAuthorizationAttributes must be set
 */
export interface ISubjectAccessReviewSpec {
    /**
     * Extra corresponds to the user.Info.GetExtra() method from the authenticator.  Since that is input to the authorizer it needs a reflection here.
     */
    "extra"?: {
        [key: string]: Array<string>;
    };
    /**
     * Groups is the groups you're testing for.
     */
    "group"?: Array<string>;
    /**
     * NonResourceAttributes describes information for a non-resource access request
     */
    "nonResourceAttributes"?: IIoK8sApiAuthorizationV1beta1NonResourceAttributes;
    /**
     * ResourceAuthorizationAttributes describes information for a resource access request
     */
    "resourceAttributes"?: IIoK8sApiAuthorizationV1beta1ResourceAttributes;
    /**
     * UID information about the requesting user.
     */
    "uid"?: string;
    /**
     * User is the user you're testing for. If you specify "User" but not "Group", then is it interpreted as "What if User were not a member of any groups
     */
    "user"?: string;
}
/**
 * SubjectAccessReviewSpec is a description of the access request.  Exactly one of ResourceAuthorizationAttributes and NonResourceAuthorizationAttributes must be set
 */
export declare class SubjectAccessReviewSpec extends Model<ISubjectAccessReviewSpec> implements ISubjectAccessReviewSpec {
    "extra"?: {
        [key: string]: Array<string>;
    };
    "group"?: Array<string>;
    "nonResourceAttributes"?: IIoK8sApiAuthorizationV1beta1NonResourceAttributes;
    "resourceAttributes"?: IIoK8sApiAuthorizationV1beta1ResourceAttributes;
    "uid"?: string;
    "user"?: string;
    constructor(data?: ModelData<ISubjectAccessReviewSpec>);
}
export { ISubjectAccessReviewSpec as IIoK8sApiAuthorizationV1beta1SubjectAccessReviewSpec, SubjectAccessReviewSpec as IoK8sApiAuthorizationV1beta1SubjectAccessReviewSpec };
