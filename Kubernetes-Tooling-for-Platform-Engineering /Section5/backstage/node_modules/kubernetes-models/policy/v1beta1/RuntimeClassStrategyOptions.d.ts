import { ModelData, Model } from "@kubernetes-models/base";
/**
 * RuntimeClassStrategyOptions define the strategy that will dictate the allowable RuntimeClasses for a pod.
 */
export interface IRuntimeClassStrategyOptions {
    /**
     * allowedRuntimeClassNames is an allowlist of RuntimeClass names that may be specified on a pod. A value of "\*" means that any RuntimeClass name is allowed, and must be the only item in the list. An empty list requires the RuntimeClassName field to be unset.
     */
    "allowedRuntimeClassNames": Array<string>;
    /**
     * defaultRuntimeClassName is the default RuntimeClassName to set on the pod. The default MUST be allowed by the allowedRuntimeClassNames list. A value of nil does not mutate the Pod.
     */
    "defaultRuntimeClassName"?: string;
}
/**
 * RuntimeClassStrategyOptions define the strategy that will dictate the allowable RuntimeClasses for a pod.
 */
export declare class RuntimeClassStrategyOptions extends Model<IRuntimeClassStrategyOptions> implements IRuntimeClassStrategyOptions {
    "allowedRuntimeClassNames": Array<string>;
    "defaultRuntimeClassName"?: string;
    constructor(data?: ModelData<IRuntimeClassStrategyOptions>);
}
export { IRuntimeClassStrategyOptions as IIoK8sApiPolicyV1beta1RuntimeClassStrategyOptions, RuntimeClassStrategyOptions as IoK8sApiPolicyV1beta1RuntimeClassStrategyOptions };
