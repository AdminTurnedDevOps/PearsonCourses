import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAdmissionregistrationV1beta1MutatingWebhook } from "./MutatingWebhook";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * MutatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and may change the object. Deprecated in v1.16, planned for removal in v1.19. Use admissionregistration.k8s.io/v1 MutatingWebhookConfiguration instead.
 * @deprecated
 */
export interface IMutatingWebhookConfiguration extends TypeMeta {
    "apiVersion": "admissionregistration.k8s.io/v1beta1";
    "kind": "MutatingWebhookConfiguration";
    /**
     * Standard object metadata; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Webhooks is a list of webhooks and the affected resources and operations.
     */
    "webhooks"?: Array<IIoK8sApiAdmissionregistrationV1beta1MutatingWebhook>;
}
/**
 * MutatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and may change the object. Deprecated in v1.16, planned for removal in v1.19. Use admissionregistration.k8s.io/v1 MutatingWebhookConfiguration instead.
 * @deprecated
 */
export declare class MutatingWebhookConfiguration extends Model<IMutatingWebhookConfiguration> implements IMutatingWebhookConfiguration {
    "apiVersion": IMutatingWebhookConfiguration["apiVersion"];
    "kind": IMutatingWebhookConfiguration["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "webhooks"?: Array<IIoK8sApiAdmissionregistrationV1beta1MutatingWebhook>;
    static apiVersion: IMutatingWebhookConfiguration["apiVersion"];
    static kind: IMutatingWebhookConfiguration["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IMutatingWebhookConfiguration>;
    constructor(data?: ModelData<IMutatingWebhookConfiguration>);
}
export { IMutatingWebhookConfiguration as IIoK8sApiAdmissionregistrationV1beta1MutatingWebhookConfiguration, MutatingWebhookConfiguration as IoK8sApiAdmissionregistrationV1beta1MutatingWebhookConfiguration };
