import { IIoK8sApiAdmissionregistrationV1beta1ValidatingWebhookConfiguration } from "./ValidatingWebhookConfiguration";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ValidatingWebhookConfigurationList is a list of ValidatingWebhookConfiguration.
 */
export interface IValidatingWebhookConfigurationList extends TypeMeta {
    "apiVersion": "admissionregistration.k8s.io/v1beta1";
    /**
     * List of ValidatingWebhookConfiguration.
     */
    "items": Array<IIoK8sApiAdmissionregistrationV1beta1ValidatingWebhookConfiguration>;
    "kind": "ValidatingWebhookConfigurationList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * ValidatingWebhookConfigurationList is a list of ValidatingWebhookConfiguration.
 */
export declare class ValidatingWebhookConfigurationList extends Model<IValidatingWebhookConfigurationList> implements IValidatingWebhookConfigurationList {
    "apiVersion": IValidatingWebhookConfigurationList["apiVersion"];
    "items": Array<IIoK8sApiAdmissionregistrationV1beta1ValidatingWebhookConfiguration>;
    "kind": IValidatingWebhookConfigurationList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IValidatingWebhookConfigurationList["apiVersion"];
    static kind: IValidatingWebhookConfigurationList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IValidatingWebhookConfigurationList>;
    constructor(data?: ModelData<IValidatingWebhookConfigurationList>);
}
export { IValidatingWebhookConfigurationList as IIoK8sApiAdmissionregistrationV1beta1ValidatingWebhookConfigurationList, ValidatingWebhookConfigurationList as IoK8sApiAdmissionregistrationV1beta1ValidatingWebhookConfigurationList };
