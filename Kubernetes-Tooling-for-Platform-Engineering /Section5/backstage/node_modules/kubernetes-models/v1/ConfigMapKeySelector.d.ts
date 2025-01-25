import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Selects a key from a ConfigMap.
 */
export interface IConfigMapKeySelector {
    /**
     * The key to select.
     */
    "key": string;
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    "name"?: string;
    /**
     * Specify whether the ConfigMap or its key must be defined
     */
    "optional"?: boolean;
}
/**
 * Selects a key from a ConfigMap.
 */
export declare class ConfigMapKeySelector extends Model<IConfigMapKeySelector> implements IConfigMapKeySelector {
    "key": string;
    "name"?: string;
    "optional"?: boolean;
    constructor(data?: ModelData<IConfigMapKeySelector>);
}
export { IConfigMapKeySelector as IIoK8sApiCoreV1ConfigMapKeySelector, ConfigMapKeySelector as IoK8sApiCoreV1ConfigMapKeySelector };
