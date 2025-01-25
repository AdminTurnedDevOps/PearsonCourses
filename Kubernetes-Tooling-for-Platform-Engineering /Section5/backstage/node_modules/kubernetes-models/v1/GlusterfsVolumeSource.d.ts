import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a Glusterfs mount that lasts the lifetime of a pod. Glusterfs volumes do not support ownership management or SELinux relabeling.
 */
export interface IGlusterfsVolumeSource {
    /**
     * endpoints is the endpoint name that details Glusterfs topology. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
     */
    "endpoints": string;
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
export declare class GlusterfsVolumeSource extends Model<IGlusterfsVolumeSource> implements IGlusterfsVolumeSource {
    "endpoints": string;
    "path": string;
    "readOnly"?: boolean;
    constructor(data?: ModelData<IGlusterfsVolumeSource>);
}
export { IGlusterfsVolumeSource as IIoK8sApiCoreV1GlusterfsVolumeSource, GlusterfsVolumeSource as IoK8sApiCoreV1GlusterfsVolumeSource };
