import { IIoK8sApiAutoscalingV2beta2HPAScalingPolicy } from "./HPAScalingPolicy";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * HPAScalingRules configures the scaling behavior for one direction. These Rules are applied after calculating DesiredReplicas from metrics for the HPA. They can limit the scaling velocity by specifying scaling policies. They can prevent flapping by specifying the stabilization window, so that the number of replicas is not set instantly, instead, the safest value from the stabilization window is chosen.
 */
export interface IHPAScalingRules {
    /**
     * policies is a list of potential scaling polices which can be used during scaling. At least one policy must be specified, otherwise the HPAScalingRules will be discarded as invalid
     */
    "policies"?: Array<IIoK8sApiAutoscalingV2beta2HPAScalingPolicy>;
    /**
     * selectPolicy is used to specify which policy should be used. If not set, the default value MaxPolicySelect is used.
     */
    "selectPolicy"?: string;
    /**
     * StabilizationWindowSeconds is the number of seconds for which past recommendations should be considered while scaling up or scaling down. StabilizationWindowSeconds must be greater than or equal to zero and less than or equal to 3600 (one hour). If not set, use the default values: - For scale up: 0 (i.e. no stabilization is done). - For scale down: 300 (i.e. the stabilization window is 300 seconds long).
     */
    "stabilizationWindowSeconds"?: number;
}
/**
 * HPAScalingRules configures the scaling behavior for one direction. These Rules are applied after calculating DesiredReplicas from metrics for the HPA. They can limit the scaling velocity by specifying scaling policies. They can prevent flapping by specifying the stabilization window, so that the number of replicas is not set instantly, instead, the safest value from the stabilization window is chosen.
 */
export declare class HPAScalingRules extends Model<IHPAScalingRules> implements IHPAScalingRules {
    "policies"?: Array<IIoK8sApiAutoscalingV2beta2HPAScalingPolicy>;
    "selectPolicy"?: string;
    "stabilizationWindowSeconds"?: number;
    constructor(data?: ModelData<IHPAScalingRules>);
}
export { IHPAScalingRules as IIoK8sApiAutoscalingV2beta2HPAScalingRules, HPAScalingRules as IoK8sApiAutoscalingV2beta2HPAScalingRules };
