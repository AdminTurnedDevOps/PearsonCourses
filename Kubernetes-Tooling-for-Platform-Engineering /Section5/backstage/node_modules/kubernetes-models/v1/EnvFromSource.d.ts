import { IIoK8sApiCoreV1ConfigMapEnvSource } from "./ConfigMapEnvSource";
import { IIoK8sApiCoreV1SecretEnvSource } from "./SecretEnvSource";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * EnvFromSource represents the source of a set of ConfigMaps
 */
export interface IEnvFromSource {
    /**
     * The ConfigMap to select from
     */
    "configMapRef"?: IIoK8sApiCoreV1ConfigMapEnvSource;
    /**
     * An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.
     */
    "prefix"?: string;
    /**
     * The Secret to select from
     */
    "secretRef"?: IIoK8sApiCoreV1SecretEnvSource;
}
/**
 * EnvFromSource represents the source of a set of ConfigMaps
 */
export declare class EnvFromSource extends Model<IEnvFromSource> implements IEnvFromSource {
    "configMapRef"?: IIoK8sApiCoreV1ConfigMapEnvSource;
    "prefix"?: string;
    "secretRef"?: IIoK8sApiCoreV1SecretEnvSource;
    constructor(data?: ModelData<IEnvFromSource>);
}
export { IEnvFromSource as IIoK8sApiCoreV1EnvFromSource, EnvFromSource as IoK8sApiCoreV1EnvFromSource };
