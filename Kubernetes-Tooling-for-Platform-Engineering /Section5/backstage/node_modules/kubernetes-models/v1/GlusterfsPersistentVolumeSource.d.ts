import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a Glusterfs mount that lasts the lifetime of a pod. Glusterfs volumes do not support ownership management or SELinux relabeling.
 */
export interface IGlusterfsPersistentVolumeSource {
    /**
     * endpoints is the endpoint name that details Glusterfs topology. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
     */
    "endpoints": string;
    /**
     * endpointsNamespace is the namespace that contains Glusterfs endpoint. If this field is empty, the EndpointNamespace defaults to the same namespace as the bound PVC. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
     */
    "endpointsNamespace"?: string;
    /**
     * path is the Glusterfs volume path. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
     */
    "path": string;
    /**
     * readOnly here will force the Glusterfs volume to be mounted with read-only permissions. Defaults to false. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
     */
    "readOnly"?: boolean;
}
/**
 * Represents a Glusterfs mount that lasts the lifetime of a pod. Glusterfs volumes do not support ownership management or SELinux relabeling.
 */
export declare class GlusterfsPersistentVolumeSource extends Model<IGlusterfsPersistentVolumeSource> implements IGlusterfsPersistentVolumeSource {
    "endpoints": string;
    "endpointsNamespace"?: string;
    "path": string;
    "readOnly"?: boolean;
    constructor(data?: ModelData<IGlusterfsPersistentVolumeSource>);
}
export { IGlusterfsPersistentVolumeSource as IIoK8sApiCoreV1GlusterfsPersistentVolumeSource, GlusterfsPersistentVolumeSource as IoK8sApiCoreV1GlusterfsPersistentVolumeSource };
