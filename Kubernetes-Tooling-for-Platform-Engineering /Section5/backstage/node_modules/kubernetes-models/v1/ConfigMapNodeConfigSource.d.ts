import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ConfigMapNodeConfigSource contains the information to reference a ConfigMap as a config source for the Node. This API is deprecated since 1.22: https://git.k8s.io/enhancements/keps/sig-node/281-dynamic-kubelet-configuration
 * @deprecated
 */
export interface IConfigMapNodeConfigSource {
    /**
     * KubeletConfigKey declares which key of the referenced ConfigMap corresponds to the KubeletConfiguration structure This field is required in all cases.
     */
    "kubeletConfigKey": string;
    /**
     * Name is the metadata.name of the referenced ConfigMap. This field is required in all cases.
     */
    "name": string;
    /**
     * Namespace is the metadata.namespace of the referenced ConfigMap. This field is required in all cases.
     */
    "namespace": string;
    /**
     * ResourceVersion is the metadata.ResourceVersion of the referenced ConfigMap. This field is forbidden in Node.Spec, and required in Node.Status.
     */
    "resourceVersion"?: string;
    /**
     * UID is the metadata.UID of the referenced ConfigMap. This field is forbidden in Node.Spec, and required in Node.Status.
     */
    "uid"?: string;
}
/**
 * ConfigMapNodeConfigSource contains the information to reference a ConfigMap as a config source for the Node. This API is deprecated since 1.22: https://git.k8s.io/enhancements/keps/sig-node/281-dynamic-kubelet-configuration
 * @deprecated
 */
export declare class ConfigMapNodeConfigSource extends Model<IConfigMapNodeConfigSource> implements IConfigMapNodeConfigSource {
    "kubeletConfigKey": string;
    "name": string;
    "namespace": string;
    "resourceVersion"?: string;
    "uid"?: string;
    constructor(data?: ModelData<IConfigMapNodeConfigSource>);
}
export { IConfigMapNodeConfigSource as IIoK8sApiCoreV1ConfigMapNodeConfigSource, ConfigMapNodeConfigSource as IoK8sApiCoreV1ConfigMapNodeConfigSource };
