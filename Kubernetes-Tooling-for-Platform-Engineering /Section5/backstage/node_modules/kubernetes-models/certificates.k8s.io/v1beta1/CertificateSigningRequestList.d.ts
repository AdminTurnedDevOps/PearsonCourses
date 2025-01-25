import { IIoK8sApiCertificatesV1beta1CertificateSigningRequest } from "./CertificateSigningRequest";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
export interface ICertificateSigningRequestList extends TypeMeta {
    "apiVersion": "certificates.k8s.io/v1beta1";
    "items": Array<IIoK8sApiCertificatesV1beta1CertificateSigningRequest>;
    "kind": "CertificateSigningRequestList";
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
export declare class CertificateSigningRequestList extends Model<ICertificateSigningRequestList> implements ICertificateSigningRequestList {
    "apiVersion": ICertificateSigningRequestList["apiVersion"];
    "items": Array<IIoK8sApiCertificatesV1beta1CertificateSigningRequest>;
    "kind": ICertificateSigningRequestList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: ICertificateSigningRequestList["apiVersion"];
    static kind: ICertificateSigningRequestList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICertificateSigningRequestList>;
    constructor(data?: ModelData<ICertificateSigningRequestList>);
}
export { ICertificateSigningRequestList as IIoK8sApiCertificatesV1beta1CertificateSigningRequestList, CertificateSigningRequestList as IoK8sApiCertificatesV1beta1CertificateSigningRequestList };
