import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NamespaceCondition contains details about state of namespace.
 */
export interface INamespaceCondition {
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    /**
     * Status of the condition, one of True, False, Unknown.
     */
    "status": string;
    /**
     * Type of namespace controller condition.
     */
    "type": string;
}
/**
 * NamespaceCondition contains details about state of namespace.
 */
export declare class NamespaceCondition extends Model<INamespaceCondition> implements INamespaceCondition {
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<INamespaceCondition>);
}
export { INamespaceCondition as IIoK8sApiCoreV1NamespaceCondition, NamespaceCondition as IoK8sApiCoreV1NamespaceCondition };
