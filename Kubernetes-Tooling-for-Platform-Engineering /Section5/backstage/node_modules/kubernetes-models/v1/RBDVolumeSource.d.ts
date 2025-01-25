import { IIoK8sApiCoreV1LocalObjectReference } from "./LocalObjectReference";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a Rados Block Device mount that lasts the lifetime of a pod. RBD volumes support ownership management and SELinux relabeling.
 */
export interface IRBDVolumeSource {
    /**
     * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd
     */
    "fsType"?: string;
    /**
     * image is the rados image name. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
     */
    "image": string;
    /**
     * keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
     */
    "keyring"?: string;
    /**
     * monitors is a collection of Ceph monitors. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
     */
    "monitors": Array<string>;
    /**
     * pool is the rados pool name. Default is rbd. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
     */
    "pool"?: string;
    /**
     * readOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
     */
    "readOnly"?: boolean;
    /**
     * secretRef is name of the authentication secret for RBDUser. If provided overrides keyring. Default is nil. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
     */
    "secretRef"?: IIoK8sApiCoreV1LocalObjectReference;
    /**
     * user is the rados user name. Default is admin. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
     */
    "user"?: string;
}
/**
 * Represents a Rados Block Device mount that lasts the lifetime of a pod. RBD volumes support ownership management and SELinux relabeling.
 */
export declare class RBDVolumeSource extends Model<IRBDVolumeSource> implements IRBDVolumeSource {
    "fsType"?: string;
    "image": string;
    "keyring"?: string;
    "monitors": Array<string>;
    "pool"?: string;
    "readOnly"?: boolean;
    "secretRef"?: IIoK8sApiCoreV1LocalObjectReference;
    "user"?: string;
    constructor(data?: ModelData<IRBDVolumeSource>);
}
export { IRBDVolumeSource as IIoK8sApiCoreV1RBDVolumeSource, RBDVolumeSource as IoK8sApiCoreV1RBDVolumeSource };
