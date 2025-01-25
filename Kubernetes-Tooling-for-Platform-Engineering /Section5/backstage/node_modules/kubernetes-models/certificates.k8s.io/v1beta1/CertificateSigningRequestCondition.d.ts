import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
export interface ICertificateSigningRequestCondition {
    /**
     * lastTransitionTime is the time the condition last transitioned from one status to another. If unset, when a new condition type is added or an existing condition's status is changed, the server defaults this to the current time.
     */
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * timestamp for the last update to this condition
     */
    "lastUpdateTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * human readable message with details about the request state
     */
    "message"?: string;
    /**
     * brief reason for the request state
     */
    "reason"?: string;
    /**
     * Status of the condition, one of True, False, Unknown. Approved, Denied, and Failed conditions may not be "False" or "Unknown". Defaults to "True". If unset, should be treated as "True".
     */
    "status"?: string;
    /**
     * type of the condition. Known conditions include "Approved", "Denied", and "Failed".
     */
    "type": string;
}
export declare class CertificateSigningRequestCondition extends Model<ICertificateSigningRequestCondition> implements ICertificateSigningRequestCondition {
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "lastUpdateTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status"?: string;
    "type": string;
    constructor(data?: ModelData<ICertificateSigningRequestCondition>);
}
export { ICertificateSigningRequestCondition as IIoK8sApiCertificatesV1beta1CertificateSigningRequestCondition, CertificateSigningRequestCondition as IoK8sApiCertificatesV1beta1CertificateSigningRequestCondition };
