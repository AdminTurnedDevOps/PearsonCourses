import { IIoK8sApiCertificatesV1CertificateSigningRequest } from "./CertificateSigningRequest";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * CertificateSigningRequestList is a collection of CertificateSigningRequest objects
 */
export interface ICertificateSigningRequestList extends TypeMeta {
    "apiVersion": "certificates.k8s.io/v1";
    /**
     * items is a collection of CertificateSigningRequest objects
     */
    "items": Array<IIoK8sApiCertificatesV1CertificateSigningRequest>;
    "kind": "CertificateSigningRequestList";
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * CertificateSigningRequestList is a collection of CertificateSigningRequest objects
 */
export declare class CertificateSigningRequestList extends Model<ICertificateSigningRequestList> implements ICertificateSigningRequestList {
    "apiVersion": ICertificateSigningRequestList["apiVersion"];
    "items": Array<IIoK8sApiCertificatesV1CertificateSigningRequest>;
    "kind": ICertificateSigningRequestList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: ICertificateSigningRequestList["apiVersion"];
    static kind: ICertificateSigningRequestList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICertificateSigningRequestList>;
    constructor(data?: ModelData<ICertificateSigningRequestList>);
}
export { ICertificateSigningRequestList as IIoK8sApiCertificatesV1CertificateSigningRequestList, CertificateSigningRequestList as IoK8sApiCertificatesV1CertificateSigningRequestList };
