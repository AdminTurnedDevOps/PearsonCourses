import { ModelData, Model } from "@kubernetes-models/base";
/**
 * SecretKeySelector selects a key of a Secret.
 */
export interface ISecretKeySelector {
    /**
     * The key of the secret to select from.  Must be a valid secret key.
     */
    "key": string;
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    "name"?: string;
    /**
     * Specify whether the Secret or its key must be defined
     */
    "optional"?: boolean;
}
/**
 * SecretKeySelector selects a key of a Secret.
 */
export declare class SecretKeySelector extends Model<ISecretKeySelector> implements ISecretKeySelector {
    "key": string;
    "name"?: string;
    "optional"?: boolean;
    constructor(data?: ModelData<ISecretKeySelector>);
}
export { ISecretKeySelector as IIoK8sApiCoreV1SecretKeySelector, SecretKeySelector as IoK8sApiCoreV1SecretKeySelector };
