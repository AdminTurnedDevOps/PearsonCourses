import { IIoK8sApiCoreV1AWSElasticBlockStoreVolumeSource } from "./AWSElasticBlockStoreVolumeSource";
import { IIoK8sApiCoreV1AzureDiskVolumeSource } from "./AzureDiskVolumeSource";
import { IIoK8sApiCoreV1AzureFileVolumeSource } from "./AzureFileVolumeSource";
import { IIoK8sApiCoreV1CephFSVolumeSource } from "./CephFSVolumeSource";
import { IIoK8sApiCoreV1CinderVolumeSource } from "./CinderVolumeSource";
import { IIoK8sApiCoreV1ConfigMapVolumeSource } from "./ConfigMapVolumeSource";
import { IIoK8sApiCoreV1CSIVolumeSource } from "./CSIVolumeSource";
import { IIoK8sApiCoreV1DownwardAPIVolumeSource } from "./DownwardAPIVolumeSource";
import { IIoK8sApiCoreV1EmptyDirVolumeSource } from "./EmptyDirVolumeSource";
import { IIoK8sApiCoreV1EphemeralVolumeSource } from "./EphemeralVolumeSource";
import { IIoK8sApiCoreV1FCVolumeSource } from "./FCVolumeSource";
import { IIoK8sApiCoreV1FlexVolumeSource } from "./FlexVolumeSource";
import { IIoK8sApiCoreV1FlockerVolumeSource } from "./FlockerVolumeSource";
import { IIoK8sApiCoreV1GCEPersistentDiskVolumeSource } from "./GCEPersistentDiskVolumeSource";
import { IIoK8sApiCoreV1GitRepoVolumeSource } from "./GitRepoVolumeSource";
import { IIoK8sApiCoreV1GlusterfsVolumeSource } from "./GlusterfsVolumeSource";
import { IIoK8sApiCoreV1HostPathVolumeSource } from "./HostPathVolumeSource";
import { IIoK8sApiCoreV1ISCSIVolumeSource } from "./ISCSIVolumeSource";
import { IIoK8sApiCoreV1NFSVolumeSource } from "./NFSVolumeSource";
import { IIoK8sApiCoreV1PersistentVolumeClaimVolumeSource } from "./PersistentVolumeClaimVolumeSource";
import { IIoK8sApiCoreV1PhotonPersistentDiskVolumeSource } from "./PhotonPersistentDiskVolumeSource";
import { IIoK8sApiCoreV1PortworxVolumeSource } from "./PortworxVolumeSource";
import { IIoK8sApiCoreV1ProjectedVolumeSource } from "./ProjectedVolumeSource";
import { IIoK8sApiCoreV1QuobyteVolumeSource } from "./QuobyteVolumeSource";
import { IIoK8sApiCoreV1RBDVolumeSource } from "./RBDVolumeSource";
import { IIoK8sApiCoreV1ScaleIOVolumeSource } from "./ScaleIOVolumeSource";
import { IIoK8sApiCoreV1SecretVolumeSource } from "./SecretVolumeSource";
import { IIoK8sApiCoreV1StorageOSVolumeSource } from "./StorageOSVolumeSource";
import { IIoK8sApiCoreV1VsphereVirtualDiskVolumeSource } from "./VsphereVirtualDiskVolumeSource";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Volume represents a named volume in a pod that may be accessed by any container in the pod.
 */
export interface IVolume {
    /**
     * awsElasticBlockStore represents an AWS Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     */
    "awsElasticBlockStore"?: IIoK8sApiCoreV1AWSElasticBlockStoreVolumeSource;
    /**
     * azureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
     */
    "azureDisk"?: IIoK8sApiCoreV1AzureDiskVolumeSource;
    /**
     * azureFile represents an Azure File Service mount on the host and bind mount to the pod.
     */
    "azureFile"?: IIoK8sApiCoreV1AzureFileVolumeSource;
    /**
     * cephFS represents a Ceph FS mount on the host that shares a pod's lifetime
     */
    "cephfs"?: IIoK8sApiCoreV1CephFSVolumeSource;
    /**
     * cinder represents a cinder volume attached and mounted on kubelets host machine. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
     */
    "cinder"?: IIoK8sApiCoreV1CinderVolumeSource;
    /**
     * configMap represents a configMap that should populate this volume
     */
    "configMap"?: IIoK8sApiCoreV1ConfigMapVolumeSource;
    /**
     * csi (Container Storage Interface) represents ephemeral storage that is handled by certain external CSI drivers (Beta feature).
     */
    "csi"?: IIoK8sApiCoreV1CSIVolumeSource;
    /**
     * downwardAPI represents downward API about the pod that should populate this volume
     */
    "downwardAPI"?: IIoK8sApiCoreV1DownwardAPIVolumeSource;
    /**
     * emptyDir represents a temporary directory that shares a pod's lifetime. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
     */
    "emptyDir"?: IIoK8sApiCoreV1EmptyDirVolumeSource;
    /**
     * ephemeral represents a volume that is handled by a cluster storage driver. The volume's lifecycle is tied to the pod that defines it - it will be created before the pod starts, and deleted when the pod is removed.
     *
     * Use this if: a) the volume is only needed while the pod runs, b) features of normal volumes like restoring from snapshot or capacity
     *    tracking are needed,
     * c) the storage driver is specified through a storage class, and d) the storage driver supports dynamic volume provisioning through
     *    a PersistentVolumeClaim (see EphemeralVolumeSource for more
     *    information on the connection between this volume type
     *    and PersistentVolumeClaim).
     *
     * Use PersistentVolumeClaim or one of the vendor-specific APIs for volumes that persist for longer than the lifecycle of an individual pod.
     *
     * Use CSI for light-weight local ephemeral volumes if the CSI driver is meant to be used that way - see the documentation of the driver for more information.
     *
     * A pod can use both types of ephemeral volumes and persistent volumes at the same time.
     */
    "ephemeral"?: IIoK8sApiCoreV1EphemeralVolumeSource;
    /**
     * fc represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
     */
    "fc"?: IIoK8sApiCoreV1FCVolumeSource;
    /**
     * flexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.
     */
    "flexVolume"?: IIoK8sApiCoreV1FlexVolumeSource;
    /**
     * flocker represents a Flocker volume attached to a kubelet's host machine. This depends on the Flocker control service being running
     */
    "flocker"?: IIoK8sApiCoreV1FlockerVolumeSource;
    /**
     * gcePersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
     */
    "gcePersistentDisk"?: IIoK8sApiCoreV1GCEPersistentDiskVolumeSource;
    /**
     * gitRepo represents a git repository at a particular revision. DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod's container.
     */
    "gitRepo"?: IIoK8sApiCoreV1GitRepoVolumeSource;
    /**
     * glusterfs represents a Glusterfs mount on the host that shares a pod's lifetime. More info: https://examples.k8s.io/volumes/glusterfs/README.md
     */
    "glusterfs"?: IIoK8sApiCoreV1GlusterfsVolumeSource;
    /**
     * hostPath represents a pre-existing file or directory on the host machine that is directly exposed to the container. This is generally used for system agents or other privileged things that are allowed to see the host machine. Most containers will NOT need this. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
     */
    "hostPath"?: IIoK8sApiCoreV1HostPathVolumeSource;
    /**
     * iscsi represents an ISCSI Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://examples.k8s.io/volumes/iscsi/README.md
     */
    "iscsi"?: IIoK8sApiCoreV1ISCSIVolumeSource;
    /**
     * name of the volume. Must be a DNS_LABEL and unique within the pod. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     */
    "name": string;
    /**
     * nfs represents an NFS mount on the host that shares a pod's lifetime More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
     */
    "nfs"?: IIoK8sApiCoreV1NFSVolumeSource;
    /**
     * persistentVolumeClaimVolumeSource represents a reference to a PersistentVolumeClaim in the same namespace. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
     */
    "persistentVolumeClaim"?: IIoK8sApiCoreV1PersistentVolumeClaimVolumeSource;
    /**
     * photonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine
     */
    "photonPersistentDisk"?: IIoK8sApiCoreV1PhotonPersistentDiskVolumeSource;
    /**
     * portworxVolume represents a portworx volume attached and mounted on kubelets host machine
     */
    "portworxVolume"?: IIoK8sApiCoreV1PortworxVolumeSource;
    /**
     * projected items for all in one resources secrets, configmaps, and downward API
     */
    "projected"?: IIoK8sApiCoreV1ProjectedVolumeSource;
    /**
     * quobyte represents a Quobyte mount on the host that shares a pod's lifetime
     */
    "quobyte"?: IIoK8sApiCoreV1QuobyteVolumeSource;
    /**
     * rbd represents a Rados Block Device mount on the host that shares a pod's lifetime. More info: https://examples.k8s.io/volumes/rbd/README.md
     */
    "rbd"?: IIoK8sApiCoreV1RBDVolumeSource;
    /**
     * scaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
     */
    "scaleIO"?: IIoK8sApiCoreV1ScaleIOVolumeSource;
    /**
     * secret represents a secret that should populate this volume. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
     */
    "secret"?: IIoK8sApiCoreV1SecretVolumeSource;
    /**
     * storageOS represents a StorageOS volume attached and mounted on Kubernetes nodes.
     */
    "storageos"?: IIoK8sApiCoreV1StorageOSVolumeSource;
    /**
     * vsphereVolume represents a vSphere volume attached and mounted on kubelets host machine
     */
    "vsphereVolume"?: IIoK8sApiCoreV1VsphereVirtualDiskVolumeSource;
}
/**
 * Volume represents a named volume in a pod that may be accessed by any container in the pod.
 */
export declare class Volume extends Model<IVolume> implements IVolume {
    "awsElasticBlockStore"?: IIoK8sApiCoreV1AWSElasticBlockStoreVolumeSource;
    "azureDisk"?: IIoK8sApiCoreV1AzureDiskVolumeSource;
    "azureFile"?: IIoK8sApiCoreV1AzureFileVolumeSource;
    "cephfs"?: IIoK8sApiCoreV1CephFSVolumeSource;
    "cinder"?: IIoK8sApiCoreV1CinderVolumeSource;
    "configMap"?: IIoK8sApiCoreV1ConfigMapVolumeSource;
    "csi"?: IIoK8sApiCoreV1CSIVolumeSource;
    "downwardAPI"?: IIoK8sApiCoreV1DownwardAPIVolumeSource;
    "emptyDir"?: IIoK8sApiCoreV1EmptyDirVolumeSource;
    "ephemeral"?: IIoK8sApiCoreV1EphemeralVolumeSource;
    "fc"?: IIoK8sApiCoreV1FCVolumeSource;
    "flexVolume"?: IIoK8sApiCoreV1FlexVolumeSource;
    "flocker"?: IIoK8sApiCoreV1FlockerVolumeSource;
    "gcePersistentDisk"?: IIoK8sApiCoreV1GCEPersistentDiskVolumeSource;
    "gitRepo"?: IIoK8sApiCoreV1GitRepoVolumeSource;
    "glusterfs"?: IIoK8sApiCoreV1GlusterfsVolumeSource;
    "hostPath"?: IIoK8sApiCoreV1HostPathVolumeSource;
    "iscsi"?: IIoK8sApiCoreV1ISCSIVolumeSource;
    "name": string;
    "nfs"?: IIoK8sApiCoreV1NFSVolumeSource;
    "persistentVolumeClaim"?: IIoK8sApiCoreV1PersistentVolumeClaimVolumeSource;
    "photonPersistentDisk"?: IIoK8sApiCoreV1PhotonPersistentDiskVolumeSource;
    "portworxVolume"?: IIoK8sApiCoreV1PortworxVolumeSource;
    "projected"?: IIoK8sApiCoreV1ProjectedVolumeSource;
    "quobyte"?: IIoK8sApiCoreV1QuobyteVolumeSource;
    "rbd"?: IIoK8sApiCoreV1RBDVolumeSource;
    "scaleIO"?: IIoK8sApiCoreV1ScaleIOVolumeSource;
    "secret"?: IIoK8sApiCoreV1SecretVolumeSource;
    "storageos"?: IIoK8sApiCoreV1StorageOSVolumeSource;
    "vsphereVolume"?: IIoK8sApiCoreV1VsphereVirtualDiskVolumeSource;
    constructor(data?: ModelData<IVolume>);
}
export { IVolume as IIoK8sApiCoreV1Volume, Volume as IoK8sApiCoreV1Volume };
