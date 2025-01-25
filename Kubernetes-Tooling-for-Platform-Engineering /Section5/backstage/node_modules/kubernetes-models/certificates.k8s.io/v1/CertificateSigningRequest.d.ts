import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCertificatesV1CertificateSigningRequestSpec } from "./CertificateSigningRequestSpec";
import { IIoK8sApiCertificatesV1CertificateSigningRequestStatus } from "./CertificateSigningRequestStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * CertificateSigningRequest objects provide a mechanism to obtain x509 certificates by submitting a certificate signing request, and having it asynchronously approved and issued.
 *
 * Kubelets use this API to obtain:
 *  1. client certificates to authenticate to kube-apiserver (with the "kubernetes.io/kube-apiserver-client-kubelet" signerName).
 *  2. serving certificates for TLS endpoints kube-apiserver can connect to securely (with the "kubernetes.io/kubelet-serving" signerName).
 *
 * This API can be used to request client certificates to authenticate to kube-apiserver (with the "kubernetes.io/kube-apiserver-client" signerName), or to obtain certificates from custom non-Kubernetes signers.
 */
export interface ICertificateSigningRequest extends TypeMeta {
    "apiVersion": "certificates.k8s.io/v1";
    "kind": "CertificateSigningRequest";
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * spec contains the certificate request, and is immutable after creation. Only the request, signerName, expirationSeconds, and usages fields can be set on creation. Other fields are derived by Kubernetes and cannot be modified by users.
     */
    "spec": IIoK8sApiCertificatesV1CertificateSigningRequestSpec;
    /**
     * status contains information about whether the request is approved or denied, and the certificate issued by the signer, or the failure condition indicating signer failure.
     */
    "status"?: IIoK8sApiCertificatesV1CertificateSigningRequestStatus;
}
/**
 * CertificateSigningRequest objects provide a mechanism to obtain x509 certificates by submitting a certificate signing request, and having it asynchronously approved and issued.
 *
 * Kubelets use this API to obtain:
 *  1. client certificates to authenticate to kube-apiserver (with the "kubernetes.io/kube-apiserver-client-kubelet" signerName).
 *  2. serving certificates for TLS endpoints kube-apiserver can connect to securely (with the "kubernetes.io/kubelet-serving" signerName).
 *
 * This API can be used to request client certificates to authenticate to kube-apiserver (with the "kubernetes.io/kube-apiserver-client" signerName), or to obtain certificates from custom non-Kubernetes signers.
 */
export declare class CertificateSigningRequest extends Model<ICertificateSigningRequest> implements ICertificateSigningRequest {
    "apiVersion": ICertificateSigningRequest["apiVersion"];
    "kind": ICertificateSigningRequest["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec": IIoK8sApiCertificatesV1CertificateSigningRequestSpec;
    "status"?: IIoK8sApiCertificatesV1CertificateSigningRequestStatus;
    static apiVersion: ICertificateSigningRequest["apiVersion"];
    static kind: ICertificateSigningRequest["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICertificateSigningRequest>;
    constructor(data?: ModelData<ICertificateSigningRequest>);
}
export { ICertificateSigningRequest as IIoK8sApiCertificatesV1CertificateSigningRequest, CertificateSigningRequest as IoK8sApiCertificatesV1CertificateSigningRequest };
