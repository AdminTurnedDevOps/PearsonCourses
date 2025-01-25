import { IIoK8sApiCoreV1LocalObjectReference } from "./LocalObjectReference";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling.
 */
export interface ICephFSVolumeSource {
    /**
     * monitors is Required: Monitors is a collection of Ceph monitors More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
     */
    "monitors": Array<string>;
    /**
     * path is Optional: Used as the mounted root, rather than the full Ceph tree, default is /
     */
    "path"?: string;
    /**
     * readOnly is Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
     */
    "readOnly"?: boolean;
    /**
     * secretFile is Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
     */
    "secretFile"?: string;
    /**
     * secretRef is Optional: SecretRef is reference to the authentication secret for User, default is empty. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
     */
    "secretRef"?: IIoK8sApiCoreV1LocalObjectReference;
    /**
     * user is optional: User is the rados user name, default is admin More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
     */
    "user"?: string;
}
/**
 * Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling.
 */
export declare class CephFSVolumeSource extends Model<ICephFSVolumeSource> implements ICephFSVolumeSource {
    "monitors": Array<string>;
    "path"?: string;
    "readOnly"?: boolean;
    "secretFile"?: string;
    "secretRef"?: IIoK8sApiCoreV1LocalObjectReference;
    "user"?: string;
    constructor(data?: ModelData<ICephFSVolumeSource>);
}
export { ICephFSVolumeSource as IIoK8sApiCoreV1CephFSVolumeSource, CephFSVolumeSource as IoK8sApiCoreV1CephFSVolumeSource };
