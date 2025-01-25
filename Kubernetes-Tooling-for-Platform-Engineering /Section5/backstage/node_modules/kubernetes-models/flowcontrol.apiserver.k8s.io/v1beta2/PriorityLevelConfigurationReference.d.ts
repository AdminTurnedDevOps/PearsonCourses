import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PriorityLevelConfigurationReference contains information that points to the "request-priority" being used.
 */
export interface IPriorityLevelConfigurationReference {
    /**
     * `name` is the name of the priority level configuration being referenced Required.
     */
    "name": string;
}
/**
 * PriorityLevelConfigurationReference contains information that points to the "request-priority" being used.
 */
export declare class PriorityLevelConfigurationReference extends Model<IPriorityLevelConfigurationReference> implements IPriorityLevelConfigurationReference {
    "name": string;
    constructor(data?: ModelData<IPriorityLevelConfigurationReference>);
}
export { IPriorityLevelConfigurationReference as IIoK8sApiFlowcontrolV1beta2PriorityLevelConfigurationReference, PriorityLevelConfigurationReference as IoK8sApiFlowcontrolV1beta2PriorityLevelConfigurationReference };
