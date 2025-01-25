import { ModelData, Model } from "@kubernetes-models/base";
/**
 * SecretEnvSource selects a Secret to populate the environment variables with.
 *
 * The contents of the target Secret's Data field will represent the key-value pairs as environment variables.
 */
export interface ISecretEnvSource {
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    "name"?: string;
    /**
     * Specify whether the Secret must be defined
     */
    "optional"?: boolean;
}
/**
 * SecretEnvSource selects a Secret to populate the environment variables with.
 *
 * The contents of the target Secret's Data field will represent the key-value pairs as environment variables.
 */
export declare class SecretEnvSource extends Model<ISecretEnvSource> implements ISecretEnvSource {
    "name"?: string;
    "optional"?: boolean;
    constructor(data?: ModelData<ISecretEnvSource>);
}
export { ISecretEnvSource as IIoK8sApiCoreV1SecretEnvSource, SecretEnvSource as IoK8sApiCoreV1SecretEnvSource };
