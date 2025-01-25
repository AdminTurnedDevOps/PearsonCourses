import { IIoK8sApiCoreV1LocalObjectReference } from "./LocalObjectReference";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1ObjectReference } from "./ObjectReference";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ServiceAccount binds together: \* a name, understood by users, and perhaps by peripheral systems, for an identity \* a principal that can be authenticated and authorized \* a set of secrets
 */
export interface IServiceAccount extends TypeMeta {
    "apiVersion": "v1";
    /**
     * AutomountServiceAccountToken indicates whether pods running as this service account should have an API token automatically mounted. Can be overridden at the pod level.
     */
    "automountServiceAccountToken"?: boolean;
    /**
     * ImagePullSecrets is a list of references to secrets in the same namespace to use for pulling any images in pods that reference this ServiceAccount. ImagePullSecrets are distinct from Secrets because Secrets can be mounted in the pod, but ImagePullSecrets are only accessed by the kubelet. More info: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
     */
    "imagePullSecrets"?: Array<IIoK8sApiCoreV1LocalObjectReference>;
    "kind": "ServiceAccount";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Secrets is a list of the secrets in the same namespace that pods running using this ServiceAccount are allowed to use. Pods are only limited to this list if this service account has a "kubernetes.io/enforce-mountable-secrets" annotation set to "true". This field should not be used to find auto-generated service account token secrets for use outside of pods. Instead, tokens can be requested directly using the TokenRequest API, or service account token secrets can be manually created. More info: https://kubernetes.io/docs/concepts/configuration/secret
     */
    "secrets"?: Array<IIoK8sApiCoreV1ObjectReference>;
}
/**
 * ServiceAccount binds together: \* a name, understood by users, and perhaps by peripheral systems, for an identity \* a principal that can be authenticated and authorized \* a set of secrets
 */
export declare class ServiceAccount extends Model<IServiceAccount> implements IServiceAccount {
    "apiVersion": IServiceAccount["apiVersion"];
    "automountServiceAccountToken"?: boolean;
    "imagePullSecrets"?: Array<IIoK8sApiCoreV1LocalObjectReference>;
    "kind": IServiceAccount["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "secrets"?: Array<IIoK8sApiCoreV1ObjectReference>;
    static apiVersion: IServiceAccount["apiVersion"];
    static kind: IServiceAccount["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IServiceAccount>;
    constructor(data?: ModelData<IServiceAccount>);
}
export { IServiceAccount as IIoK8sApiCoreV1ServiceAccount, ServiceAccount as IoK8sApiCoreV1ServiceAccount };
