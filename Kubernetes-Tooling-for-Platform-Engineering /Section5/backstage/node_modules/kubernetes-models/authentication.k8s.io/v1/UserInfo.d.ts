import { ModelData, Model } from "@kubernetes-models/base";
/**
 * UserInfo holds the information about the user needed to implement the user.Info interface.
 */
export interface IUserInfo {
    /**
     * Any additional information provided by the authenticator.
     */
    "extra"?: {
        [key: string]: Array<string>;
    };
    /**
     * The names of groups this user is a part of.
     */
    "groups"?: Array<string>;
    /**
     * A unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs.
     */
    "uid"?: string;
    /**
     * The name that uniquely identifies this user among all active users.
     */
    "username"?: string;
}
/**
 * UserInfo holds the information about the user needed to implement the user.Info interface.
 */
export declare class UserInfo extends Model<IUserInfo> implements IUserInfo {
    "extra"?: {
        [key: string]: Array<string>;
    };
    "groups"?: Array<string>;
    "uid"?: string;
    "username"?: string;
    constructor(data?: ModelData<IUserInfo>);
}
export { IUserInfo as IIoK8sApiAuthenticationV1UserInfo, UserInfo as IoK8sApiAuthenticationV1UserInfo };
