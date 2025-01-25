import { IIoK8sApiCertificatesV1beta1CertificateSigningRequestCondition } from "./CertificateSigningRequestCondition";
import { ModelData, Model } from "@kubernetes-models/base";
export interface ICertificateSigningRequestStatus {
    /**
     * If request was approved, the controller will place the issued certificate here.
     */
    "certificate"?: string;
    /**
     * Conditions applied to the request, such as approval or denial.
     */
    "conditions"?: Array<IIoK8sApiCertificatesV1beta1CertificateSigningRequestCondition>;
}
export declare class CertificateSigningRequestStatus extends Model<ICertificateSigningRequestStatus> implements ICertificateSigningRequestStatus {
    "certificate"?: string;
    "conditions"?: Array<IIoK8sApiCertificatesV1beta1CertificateSigningRequestCondition>;
    constructor(data?: ModelData<ICertificateSigningRequestStatus>);
}
export { ICertificateSigningRequestStatus as IIoK8sApiCertificatesV1beta1CertificateSigningRequestStatus, CertificateSigningRequestStatus as IoK8sApiCertificatesV1beta1CertificateSigningRequestStatus };
