import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAdmissionregistrationV1MutatingWebhook } from "./MutatingWebhook";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * MutatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and may change the object.
 */
export interface IMutatingWebhookConfiguration extends TypeMeta {
    "apiVersion": "admissionregistration.k8s.io/v1";
    "kind": "MutatingWebhookConfiguration";
    /**
     * Standard object metadata; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Webhooks is a list of webhooks and the affected resources and operations.
     */
    "webhooks"?: Array<IIoK8sApiAdmissionregistrationV1MutatingWebhook>;
}
/**
 * MutatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and may change the object.
 */
export declare class MutatingWebhookConfiguration extends Model<IMutatingWebhookConfiguration> implements IMutatingWebhookConfiguration {
    "apiVersion": IMutatingWebhookConfiguration["apiVersion"];
    "kind": IMutatingWebhookConfiguration["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "webhooks"?: Array<IIoK8sApiAdmissionregistrationV1MutatingWebhook>;
    static apiVersion: IMutatingWebhookConfiguration["apiVersion"];
    static kind: IMutatingWebhookConfiguration["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IMutatingWebhookConfiguration>;
    constructor(data?: ModelData<IMutatingWebhookConfiguration>);
}
export { IMutatingWebhookConfiguration as IIoK8sApiAdmissionregistrationV1MutatingWebhookConfiguration, MutatingWebhookConfiguration as IoK8sApiAdmissionregistrationV1MutatingWebhookConfiguration };
