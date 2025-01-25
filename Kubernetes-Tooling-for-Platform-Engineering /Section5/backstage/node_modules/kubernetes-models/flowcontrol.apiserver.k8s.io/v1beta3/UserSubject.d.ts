import { ModelData, Model } from "@kubernetes-models/base";
/**
 * UserSubject holds detailed information for user-kind subject.
 */
export interface IUserSubject {
    /**
     * `name` is the username that matches, or "\*" to match all usernames. Required.
     */
    "name": string;
}
/**
 * UserSubject holds detailed information for user-kind subject.
 */
export declare class UserSubject extends Model<IUserSubject> implements IUserSubject {
    "name": string;
    constructor(data?: ModelData<IUserSubject>);
}
export { IUserSubject as IIoK8sApiFlowcontrolV1beta3UserSubject, UserSubject as IoK8sApiFlowcontrolV1beta3UserSubject };
