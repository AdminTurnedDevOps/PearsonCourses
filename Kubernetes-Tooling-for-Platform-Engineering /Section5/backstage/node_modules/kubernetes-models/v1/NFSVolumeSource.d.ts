import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents an NFS mount that lasts the lifetime of a pod. NFS volumes do not support ownership management or SELinux relabeling.
 */
export interface INFSVolumeSource {
    /**
     * path that is exported by the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
     */
    "path": string;
    /**
     * readOnly here will force the NFS export to be mounted with read-only permissions. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
     */
    "readOnly"?: boolean;
    /**
     * server is the hostname or IP address of the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
     */
    "server": string;
}
/**
 * Represents an NFS mount that lasts the lifetime of a pod. NFS volumes do not support ownership management or SELinux relabeling.
 */
export declare class NFSVolumeSource extends Model<INFSVolumeSource> implements INFSVolumeSource {
    "path": string;
    "readOnly"?: boolean;
    "server": string;
    constructor(data?: ModelData<INFSVolumeSource>);
}
export { INFSVolumeSource as IIoK8sApiCoreV1NFSVolumeSource, NFSVolumeSource as IoK8sApiCoreV1NFSVolumeSource };
