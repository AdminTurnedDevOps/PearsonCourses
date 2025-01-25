import { IIoK8sApiFlowcontrolV1beta2LimitedPriorityLevelConfiguration } from "./LimitedPriorityLevelConfiguration";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PriorityLevelConfigurationSpec specifies the configuration of a priority level.
 */
export interface IPriorityLevelConfigurationSpec {
    /**
     * `limited` specifies how requests are handled for a Limited priority level. This field must be non-empty if and only if `type` is `"Limited"`.
     */
    "limited"?: IIoK8sApiFlowcontrolV1beta2LimitedPriorityLevelConfiguration;
    /**
     * `type` indicates whether this priority level is subject to limitation on request execution.  A value of `"Exempt"` means that requests of this priority level are not subject to a limit (and thus are never queued) and do not detract from the capacity made available to other priority levels.  A value of `"Limited"` means that (a) requests of this priority level _are_ subject to limits and (b) some of the server's limited capacity is made available exclusively to this priority level. Required.
     */
    "type": string;
}
/**
 * PriorityLevelConfigurationSpec specifies the configuration of a priority level.
 */
export declare class PriorityLevelConfigurationSpec extends Model<IPriorityLevelConfigurationSpec> implements IPriorityLevelConfigurationSpec {
    "limited"?: IIoK8sApiFlowcontrolV1beta2LimitedPriorityLevelConfiguration;
    "type": string;
    constructor(data?: ModelData<IPriorityLevelConfigurationSpec>);
}
export { IPriorityLevelConfigurationSpec as IIoK8sApiFlowcontrolV1beta2PriorityLevelConfigurationSpec, PriorityLevelConfigurationSpec as IoK8sApiFlowcontrolV1beta2PriorityLevelConfigurationSpec };
