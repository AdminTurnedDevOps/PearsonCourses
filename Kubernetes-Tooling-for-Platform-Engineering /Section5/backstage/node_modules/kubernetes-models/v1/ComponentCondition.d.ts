import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Information about the condition of a component.
 */
export interface IComponentCondition {
    /**
     * Condition error code for a component. For example, a health check error code.
     */
    "error"?: string;
    /**
     * Message about the condition for a component. For example, information about a health check.
     */
    "message"?: string;
    /**
     * Status of the condition for a component. Valid values for "Healthy": "True", "False", or "Unknown".
     */
    "status": string;
    /**
     * Type of condition for a component. Valid value: "Healthy"
     */
    "type": string;
}
/**
 * Information about the condition of a component.
 */
export declare class ComponentCondition extends Model<IComponentCondition> implements IComponentCondition {
    "error"?: string;
    "message"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<IComponentCondition>);
}
export { IComponentCondition as IIoK8sApiCoreV1ComponentCondition, ComponentCondition as IoK8sApiCoreV1ComponentCondition };
