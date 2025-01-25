import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAdmissionregistrationV1beta1ValidatingWebhook } from "./ValidatingWebhook";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ValidatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and object without changing it. Deprecated in v1.16, planned for removal in v1.19. Use admissionregistration.k8s.io/v1 ValidatingWebhookConfiguration instead.
 * @deprecated
 */
export interface IValidatingWebhookConfiguration extends TypeMeta {
    "apiVersion": "admissionregistration.k8s.io/v1beta1";
    "kind": "ValidatingWebhookConfiguration";
    /**
     * Standard object metadata; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Webhooks is a list of webhooks and the affected resources and operations.
     */
    "webhooks"?: Array<IIoK8sApiAdmissionregistrationV1beta1ValidatingWebhook>;
}
/**
 * ValidatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and object without changing it. Deprecated in v1.16, planned for removal in v1.19. Use admissionregistration.k8s.io/v1 ValidatingWebhookConfiguration instead.
 * @deprecated
 */
export declare class ValidatingWebhookConfiguration extends Model<IValidatingWebhookConfiguration> implements IValidatingWebhookConfiguration {
    "apiVersion": IValidatingWebhookConfiguration["apiVersion"];
    "kind": IValidatingWebhookConfiguration["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "webhooks"?: Array<IIoK8sApiAdmissionregistrationV1beta1ValidatingWebhook>;
    static apiVersion: IValidatingWebhookConfiguration["apiVersion"];
    static kind: IValidatingWebhookConfiguration["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IValidatingWebhookConfiguration>;
    constructor(data?: ModelData<IValidatingWebhookConfiguration>);
}
export { IValidatingWebhookConfiguration as IIoK8sApiAdmissionregistrationV1beta1ValidatingWebhookConfiguration, ValidatingWebhookConfiguration as IoK8sApiAdmissionregistrationV1beta1ValidatingWebhookConfiguration };
