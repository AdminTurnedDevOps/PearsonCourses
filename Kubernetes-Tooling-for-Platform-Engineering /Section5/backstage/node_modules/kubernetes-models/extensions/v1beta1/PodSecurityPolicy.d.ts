import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiExtensionsV1beta1PodSecurityPolicySpec } from "./PodSecurityPolicySpec";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PodSecurityPolicy governs the ability to make requests that affect the Security Context that will be applied to a pod and container. Deprecated: use PodSecurityPolicy from policy API Group instead.
 * @deprecated
 */
export interface IPodSecurityPolicy extends TypeMeta {
    "apiVersion": "extensions/v1beta1";
    "kind": "PodSecurityPolicy";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * spec defines the policy enforced.
     */
    "spec"?: IIoK8sApiExtensionsV1beta1PodSecurityPolicySpec;
}
/**
 * PodSecurityPolicy governs the ability to make requests that affect the Security Context that will be applied to a pod and container. Deprecated: use PodSecurityPolicy from policy API Group instead.
 * @deprecated
 */
export declare class PodSecurityPolicy extends Model<IPodSecurityPolicy> implements IPodSecurityPolicy {
    "apiVersion": IPodSecurityPolicy["apiVersion"];
    "kind": IPodSecurityPolicy["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiExtensionsV1beta1PodSecurityPolicySpec;
    static apiVersion: IPodSecurityPolicy["apiVersion"];
    static kind: IPodSecurityPolicy["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPodSecurityPolicy>;
    constructor(data?: ModelData<IPodSecurityPolicy>);
}
export { IPodSecurityPolicy as IIoK8sApiExtensionsV1beta1PodSecurityPolicy, PodSecurityPolicy as IoK8sApiExtensionsV1beta1PodSecurityPolicy };
