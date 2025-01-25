import { IIoK8sApiCoreV1SELinuxOptions } from "../../v1/SELinuxOptions";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * SELinuxStrategyOptions defines the strategy type and any options used to create the strategy.
 */
export interface ISELinuxStrategyOptions {
    /**
     * rule is the strategy that will dictate the allowable labels that may be set.
     */
    "rule": string;
    /**
     * seLinuxOptions required to run as; required for MustRunAs More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
     */
    "seLinuxOptions"?: IIoK8sApiCoreV1SELinuxOptions;
}
/**
 * SELinuxStrategyOptions defines the strategy type and any options used to create the strategy.
 */
export declare class SELinuxStrategyOptions extends Model<ISELinuxStrategyOptions> implements ISELinuxStrategyOptions {
    "rule": string;
    "seLinuxOptions"?: IIoK8sApiCoreV1SELinuxOptions;
    constructor(data?: ModelData<ISELinuxStrategyOptions>);
}
export { ISELinuxStrategyOptions as IIoK8sApiPolicyV1beta1SELinuxStrategyOptions, SELinuxStrategyOptions as IoK8sApiPolicyV1beta1SELinuxStrategyOptions };
