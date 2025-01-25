import { ModelData, Model } from "@kubernetes-models/base";
/**
 * GroupSubject holds detailed information for group-kind subject.
 */
export interface IGroupSubject {
    /**
     * name is the user group that matches, or "\*" to match all user groups. See https://github.com/kubernetes/apiserver/blob/master/pkg/authentication/user/user.go for some well-known group names. Required.
     */
    "name": string;
}
/**
 * GroupSubject holds detailed information for group-kind subject.
 */
export declare class GroupSubject extends Model<IGroupSubject> implements IGroupSubject {
    "name": string;
    constructor(data?: ModelData<IGroupSubject>);
}
export { IGroupSubject as IIoK8sApiFlowcontrolV1beta2GroupSubject, GroupSubject as IoK8sApiFlowcontrolV1beta2GroupSubject };
