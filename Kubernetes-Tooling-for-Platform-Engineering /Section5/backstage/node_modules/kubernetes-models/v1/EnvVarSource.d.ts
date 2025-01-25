import { IIoK8sApiCoreV1ConfigMapKeySelector } from "./ConfigMapKeySelector";
import { IIoK8sApiCoreV1ObjectFieldSelector } from "./ObjectFieldSelector";
import { IIoK8sApiCoreV1ResourceFieldSelector } from "./ResourceFieldSelector";
import { IIoK8sApiCoreV1SecretKeySelector } from "./SecretKeySelector";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * EnvVarSource represents a source for the value of an EnvVar.
 */
export interface IEnvVarSource {
    /**
     * Selects a key of a ConfigMap.
     */
    "configMapKeyRef"?: IIoK8sApiCoreV1ConfigMapKeySelector;
    /**
     * Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels['<KEY>']`, `metadata.annotations['<KEY>']`, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.
     */
    "fieldRef"?: IIoK8sApiCoreV1ObjectFieldSelector;
    /**
     * Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, limits.ephemeral-storage, requests.cpu, requests.memory and requests.ephemeral-storage) are currently supported.
     */
    "resourceFieldRef"?: IIoK8sApiCoreV1ResourceFieldSelector;
    /**
     * Selects a key of a secret in the pod's namespace
     */
    "secretKeyRef"?: IIoK8sApiCoreV1SecretKeySelector;
}
/**
 * EnvVarSource represents a source for the value of an EnvVar.
 */
export declare class EnvVarSource extends Model<IEnvVarSource> implements IEnvVarSource {
    "configMapKeyRef"?: IIoK8sApiCoreV1ConfigMapKeySelector;
    "fieldRef"?: IIoK8sApiCoreV1ObjectFieldSelector;
    "resourceFieldRef"?: IIoK8sApiCoreV1ResourceFieldSelector;
    "secretKeyRef"?: IIoK8sApiCoreV1SecretKeySelector;
    constructor(data?: ModelData<IEnvVarSource>);
}
export { IEnvVarSource as IIoK8sApiCoreV1EnvVarSource, EnvVarSource as IoK8sApiCoreV1EnvVarSource };
