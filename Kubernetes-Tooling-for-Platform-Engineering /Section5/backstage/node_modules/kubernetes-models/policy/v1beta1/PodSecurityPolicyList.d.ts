import { IIoK8sApiPolicyV1beta1PodSecurityPolicy } from "./PodSecurityPolicy";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PodSecurityPolicyList is a list of PodSecurityPolicy objects.
 */
export interface IPodSecurityPolicyList extends TypeMeta {
    "apiVersion": "policy/v1beta1";
    /**
     * items is a list of schema objects.
     */
    "items": Array<IIoK8sApiPolicyV1beta1PodSecurityPolicy>;
    "kind": "PodSecurityPolicyList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * PodSecurityPolicyList is a list of PodSecurityPolicy objects.
 */
export declare class PodSecurityPolicyList extends Model<IPodSecurityPolicyList> implements IPodSecurityPolicyList {
    "apiVersion": IPodSecurityPolicyList["apiVersion"];
    "items": Array<IIoK8sApiPolicyV1beta1PodSecurityPolicy>;
    "kind": IPodSecurityPolicyList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IPodSecurityPolicyList["apiVersion"];
    static kind: IPodSecurityPolicyList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPodSecurityPolicyList>;
    constructor(data?: ModelData<IPodSecurityPolicyList>);
}
export { IPodSecurityPolicyList as IIoK8sApiPolicyV1beta1PodSecurityPolicyList, PodSecurityPolicyList as IoK8sApiPolicyV1beta1PodSecurityPolicyList };
