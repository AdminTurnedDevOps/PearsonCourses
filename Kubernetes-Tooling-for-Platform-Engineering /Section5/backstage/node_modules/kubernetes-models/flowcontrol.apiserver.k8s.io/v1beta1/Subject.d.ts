import { IIoK8sApiFlowcontrolV1beta1GroupSubject } from "./GroupSubject";
import { IIoK8sApiFlowcontrolV1beta1ServiceAccountSubject } from "./ServiceAccountSubject";
import { IIoK8sApiFlowcontrolV1beta1UserSubject } from "./UserSubject";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Subject matches the originator of a request, as identified by the request authentication system. There are three ways of matching an originator; by user, group, or service account.
 */
export interface ISubject {
    /**
     * `group` matches based on user group name.
     */
    "group"?: IIoK8sApiFlowcontrolV1beta1GroupSubject;
    /**
     * `kind` indicates which one of the other fields is non-empty. Required
     */
    "kind": string;
    /**
     * `serviceAccount` matches ServiceAccounts.
     */
    "serviceAccount"?: IIoK8sApiFlowcontrolV1beta1ServiceAccountSubject;
    /**
     * `user` matches based on username.
     */
    "user"?: IIoK8sApiFlowcontrolV1beta1UserSubject;
}
/**
 * Subject matches the originator of a request, as identified by the request authentication system. There are three ways of matching an originator; by user, group, or service account.
 */
export declare class Subject extends Model<ISubject> implements ISubject {
    "group"?: IIoK8sApiFlowcontrolV1beta1GroupSubject;
    "kind": ISubject["kind"];
    "serviceAccount"?: IIoK8sApiFlowcontrolV1beta1ServiceAccountSubject;
    "user"?: IIoK8sApiFlowcontrolV1beta1UserSubject;
    constructor(data?: ModelData<ISubject>);
}
export { ISubject as IIoK8sApiFlowcontrolV1beta1Subject, Subject as IoK8sApiFlowcontrolV1beta1Subject };
