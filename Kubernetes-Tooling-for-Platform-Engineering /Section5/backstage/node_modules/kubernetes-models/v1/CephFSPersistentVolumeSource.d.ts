import { IIoK8sApiCoreV1SecretReference } from "./SecretReference";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling.
 */
export interface ICephFSPersistentVolumeSource {
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
    "secretRef"?: IIoK8sApiCoreV1SecretReference;
    /**
     * user is Optional: User is the rados user name, default is admin More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
     */
    "user"?: string;
}
/**
 * Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling.
 */
export declare class CephFSPersistentVolumeSource extends Model<ICephFSPersistentVolumeSource> implements ICephFSPersistentVolumeSource {
    "monitors": Array<string>;
    "path"?: string;
    "readOnly"?: boolean;
    "secretFile"?: string;
    "secretRef"?: IIoK8sApiCoreV1SecretReference;
    "user"?: string;
    constructor(data?: ModelData<ICephFSPersistentVolumeSource>);
}
export { ICephFSPersistentVolumeSource as IIoK8sApiCoreV1CephFSPersistentVolumeSource, CephFSPersistentVolumeSource as IoK8sApiCoreV1CephFSPersistentVolumeSource };
