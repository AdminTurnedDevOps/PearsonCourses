import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CustomResourceDefinitionCondition contains details for the current condition of this pod.
 */
export interface ICustomResourceDefinitionCondition {
    /**
     * lastTransitionTime last time the condition transitioned from one status to another.
     */
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * message is a human-readable message indicating details about last transition.
     */
    "message"?: string;
    /**
     * reason is a unique, one-word, CamelCase reason for the condition's last transition.
     */
    "reason"?: string;
    /**
     * status is the status of the condition. Can be True, False, Unknown.
     */
    "status": string;
    /**
     * type is the type of the condition. Types include Established, NamesAccepted and Terminating.
     */
    "type": string;
}
/**
 * CustomResourceDefinitionCondition contains details for the current condition of this pod.
 */
export declare class CustomResourceDefinitionCondition extends Model<ICustomResourceDefinitionCondition> implements ICustomResourceDefinitionCondition {
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<ICustomResourceDefinitionCondition>);
}
export { ICustomResourceDefinitionCondition as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceDefinitionCondition, CustomResourceDefinitionCondition as IoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceDefinitionCondition };
