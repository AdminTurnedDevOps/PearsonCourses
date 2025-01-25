import { IIoK8sApiCoreV1ConfigMapNodeConfigSource } from "./ConfigMapNodeConfigSource";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NodeConfigSource specifies a source of node configuration. Exactly one subfield (excluding metadata) must be non-nil. This API is deprecated since 1.22
 * @deprecated
 */
export interface INodeConfigSource {
    /**
     * ConfigMap is a reference to a Node's ConfigMap
     */
    "configMap"?: IIoK8sApiCoreV1ConfigMapNodeConfigSource;
}
/**
 * NodeConfigSource specifies a source of node configuration. Exactly one subfield (excluding metadata) must be non-nil. This API is deprecated since 1.22
 * @deprecated
 */
export declare class NodeConfigSource extends Model<INodeConfigSource> implements INodeConfigSource {
    "configMap"?: IIoK8sApiCoreV1ConfigMapNodeConfigSource;
    constructor(data?: ModelData<INodeConfigSource>);
}
export { INodeConfigSource as IIoK8sApiCoreV1NodeConfigSource, NodeConfigSource as IoK8sApiCoreV1NodeConfigSource };
