import { IIoK8sApiCoreV1KeyToPath } from "./KeyToPath";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Adapts a ConfigMap into a projected volume.
 *
 * The contents of the target ConfigMap's Data field will be presented in a projected volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. Note that this is identical to a configmap volume source without the default mode.
 */
export interface IConfigMapProjection {
    /**
     * items if unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
     */
    "items"?: Array<IIoK8sApiCoreV1KeyToPath>;
    /**
     * Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    "name"?: string;
    /**
     * optional specify whether the ConfigMap or its keys must be defined
     */
    "optional"?: boolean;
}
/**
 * Adapts a ConfigMap into a projected volume.
 *
 * The contents of the target ConfigMap's Data field will be presented in a projected volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. Note that this is identical to a configmap volume source without the default mode.
 */
export declare class ConfigMapProjection extends Model<IConfigMapProjection> implements IConfigMapProjection {
    "items"?: Array<IIoK8sApiCoreV1KeyToPath>;
    "name"?: string;
    "optional"?: boolean;
    constructor(data?: ModelData<IConfigMapProjection>);
}
export { IConfigMapProjection as IIoK8sApiCoreV1ConfigMapProjection, ConfigMapProjection as IoK8sApiCoreV1ConfigMapProjection };
