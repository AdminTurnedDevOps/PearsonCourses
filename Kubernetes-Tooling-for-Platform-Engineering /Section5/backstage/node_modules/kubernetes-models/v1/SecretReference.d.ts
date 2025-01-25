import { ModelData, Model } from "@kubernetes-models/base";
/**
 * SecretReference represents a Secret Reference. It has enough information to retrieve secret in any namespace
 */
export interface ISecretReference {
    /**
     * name is unique within a namespace to reference a secret resource.
     */
    "name"?: string;
    /**
     * namespace defines the space within which the secret name must be unique.
     */
    "namespace"?: string;
}
/**
 * SecretReference represents a Secret Reference. It has enough information to retrieve secret in any namespace
 */
export declare class SecretReference extends Model<ISecretReference> implements ISecretReference {
    "name"?: string;
    "namespace"?: string;
    constructor(data?: ModelData<ISecretReference>);
}
export { ISecretReference as IIoK8sApiCoreV1SecretReference, SecretReference as IoK8sApiCoreV1SecretReference };
