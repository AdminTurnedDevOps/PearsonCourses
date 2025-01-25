import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ServiceAccountSubject holds detailed information for service-account-kind subject.
 */
export interface IServiceAccountSubject {
    /**
     * `name` is the name of matching ServiceAccount objects, or "\*" to match regardless of name. Required.
     */
    "name": string;
    /**
     * `namespace` is the namespace of matching ServiceAccount objects. Required.
     */
    "namespace": string;
}
/**
 * ServiceAccountSubject holds detailed information for service-account-kind subject.
 */
export declare class ServiceAccountSubject extends Model<IServiceAccountSubject> implements IServiceAccountSubject {
    "name": string;
    "namespace": string;
    constructor(data?: ModelData<IServiceAccountSubject>);
}
export { IServiceAccountSubject as IIoK8sApiFlowcontrolV1beta1ServiceAccountSubject, ServiceAccountSubject as IoK8sApiFlowcontrolV1beta1ServiceAccountSubject };
