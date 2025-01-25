import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCertificatesV1beta1CertificateSigningRequestSpec } from "./CertificateSigningRequestSpec";
import { IIoK8sApiCertificatesV1beta1CertificateSigningRequestStatus } from "./CertificateSigningRequestStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Describes a certificate signing request
 */
export interface ICertificateSigningRequest extends TypeMeta {
    "apiVersion": "certificates.k8s.io/v1beta1";
    "kind": "CertificateSigningRequest";
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * The certificate request itself and any additional information.
     */
    "spec"?: IIoK8sApiCertificatesV1beta1CertificateSigningRequestSpec;
    /**
     * Derived information about the request.
     */
    "status"?: IIoK8sApiCertificatesV1beta1CertificateSigningRequestStatus;
}
/**
 * Describes a certificate signing request
 */
export declare class CertificateSigningRequest extends Model<ICertificateSigningRequest> implements ICertificateSigningRequest {
    "apiVersion": ICertificateSigningRequest["apiVersion"];
    "kind": ICertificateSigningRequest["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiCertificatesV1beta1CertificateSigningRequestSpec;
    "status"?: IIoK8sApiCertificatesV1beta1CertificateSigningRequestStatus;
    static apiVersion: ICertificateSigningRequest["apiVersion"];
    static kind: ICertificateSigningRequest["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICertificateSigningRequest>;
    constructor(data?: ModelData<ICertificateSigningRequest>);
}
export { ICertificateSigningRequest as IIoK8sApiCertificatesV1beta1CertificateSigningRequest, CertificateSigningRequest as IoK8sApiCertificatesV1beta1CertificateSigningRequest };
