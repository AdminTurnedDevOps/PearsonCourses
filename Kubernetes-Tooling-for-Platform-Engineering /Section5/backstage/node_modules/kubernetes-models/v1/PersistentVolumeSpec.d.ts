import { IIoK8sApiCoreV1AWSElasticBlockStoreVolumeSource } from "./AWSElasticBlockStoreVolumeSource";
import { IIoK8sApiCoreV1AzureDiskVolumeSource } from "./AzureDiskVolumeSource";
import { IIoK8sApiCoreV1AzureFilePersistentVolumeSource } from "./AzureFilePersistentVolumeSource";
import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { IIoK8sApiCoreV1CephFSPersistentVolumeSource } from "./CephFSPersistentVolumeSource";
import { IIoK8sApiCoreV1CinderPersistentVolumeSource } from "./CinderPersistentVolumeSource";
import { IIoK8sApiCoreV1ObjectReference } from "./ObjectReference";
import { IIoK8sApiCoreV1CSIPersistentVolumeSource } from "./CSIPersistentVolumeSource";
import { IIoK8sApiCoreV1FCVolumeSource } from "./FCVolumeSource";
import { IIoK8sApiCoreV1FlexPersistentVolumeSource } from "./FlexPersistentVolumeSource";
import { IIoK8sApiCoreV1FlockerVolumeSource } from "./FlockerVolumeSource";
import { IIoK8sApiCoreV1GCEPersistentDiskVolumeSource } from "./GCEPersistentDiskVolumeSource";
import { IIoK8sApiCoreV1GlusterfsPersistentVolumeSource } from "./GlusterfsPersistentVolumeSource";
import { IIoK8sApiCoreV1HostPathVolumeSource } from "./HostPathVolumeSource";
import { IIoK8sApiCoreV1ISCSIPersistentVolumeSource } from "./ISCSIPersistentVolumeSource";
import { IIoK8sApiCoreV1LocalVolumeSource } from "./LocalVolumeSource";
import { IIoK8sApiCoreV1NFSVolumeSource } from "./NFSVolumeSource";
import { IIoK8sApiCoreV1VolumeNodeAffinity } from "./VolumeNodeAffinity";
import { IIoK8sApiCoreV1PhotonPersistentDiskVolumeSource } from "./PhotonPersistentDiskVolumeSource";
import { IIoK8sApiCoreV1PortworxVolumeSource } from "./PortworxVolumeSource";
import { IIoK8sApiCoreV1QuobyteVolumeSource } from "./QuobyteVolumeSource";
import { IIoK8sApiCoreV1RBDPersistentVolumeSource } from "./RBDPersistentVolumeSource";
import { IIoK8sApiCoreV1ScaleIOPersistentVolumeSource } from "./ScaleIOPersistentVolumeSource";
import { IIoK8sApiCoreV1StorageOSPersistentVolumeSource } from "./StorageOSPersistentVolumeSource";
import { IIoK8sApiCoreV1VsphereVirtualDiskVolumeSource } from "./VsphereVirtualDiskVolumeSource";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PersistentVolumeSpec is the specification of a persistent volume.
 */
export interface IPersistentVolumeSpec {
    /**
     * accessModes contains all ways the volume can be mounted. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes
     */
    "accessModes"?: Array<string>;
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
    "azureFile"?: IIoK8sApiCoreV1AzureFilePersistentVolumeSource;
    /**
     * capacity is the description of the persistent volume's resources and capacity. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#capacity
     */
    "capacity"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    /**
     * cephFS represents a Ceph FS mount on the host that shares a pod's lifetime
     */
    "cephfs"?: IIoK8sApiCoreV1CephFSPersistentVolumeSource;
    /**
     * cinder represents a cinder volume attached and mounted on kubelets host machine. More info: https://examples.k8s.io/mysql-cinder-pd/README.md
     */
    "cinder"?: IIoK8sApiCoreV1CinderPersistentVolumeSource;
    /**
     * claimRef is part of a bi-directional binding between PersistentVolume and PersistentVolumeClaim. Expected to be non-nil when bound. claim.VolumeName is the authoritative bind between PV and PVC. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#binding
     */
    "claimRef"?: IIoK8sApiCoreV1ObjectReference;
    /**
     * csi represents storage that is handled by an external CSI driver (Beta feature).
     */
    "csi"?: IIoK8sApiCoreV1CSIPersistentVolumeSource;
    /**
     * fc represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
     */
    "fc"?: IIoK8sApiCoreV1FCVolumeSource;
    /**
     * flexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.
     */
    "flexVolume"?: IIoK8sApiCoreV1FlexPersistentVolumeSource;
    /**
     * flocker represents a Flocker volume attached to a kubelet's host machine and exposed to the pod for its usage. This depends on the Flocker control service being running
     */
    "flocker"?: IIoK8sApiCoreV1FlockerVolumeSource;
    /**
     * gcePersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine and then exposed to the pod. Provisioned by an admin. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
     */
    "gcePersistentDisk"?: IIoK8sApiCoreV1GCEPersistentDiskVolumeSource;
    /**
     * glusterfs represents a Glusterfs volume that is attached to a host and exposed to the pod. Provisioned by an admin. More info: https://examples.k8s.io/volumes/glusterfs/README.md
     */
    "glusterfs"?: IIoK8sApiCoreV1GlusterfsPersistentVolumeSource;
    /**
     * hostPath represents a directory on the host. Provisioned by a developer or tester. This is useful for single-node development and testing only! On-host storage is not supported in any way and WILL NOT WORK in a multi-node cluster. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
     */
    "hostPath"?: IIoK8sApiCoreV1HostPathVolumeSource;
    /**
     * iscsi represents an ISCSI Disk resource that is attached to a kubelet's host machine and then exposed to the pod. Provisioned by an admin.
     */
    "iscsi"?: IIoK8sApiCoreV1ISCSIPersistentVolumeSource;
    /**
     * local represents directly-attached storage with node affinity
     */
    "local"?: IIoK8sApiCoreV1LocalVolumeSource;
    /**
     * mountOptions is the list of mount options, e.g. ["ro", "soft"]. Not validated - mount will simply fail if one is invalid. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options
     */
    "mountOptions"?: Array<string>;
    /**
     * nfs represents an NFS mount on the host. Provisioned by an admin. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
     */
    "nfs"?: IIoK8sApiCoreV1NFSVolumeSource;
    /**
     * nodeAffinity defines constraints that limit what nodes this volume can be accessed from. This field influences the scheduling of pods that use this volume.
     */
    "nodeAffinity"?: IIoK8sApiCoreV1VolumeNodeAffinity;
    /**
     * persistentVolumeReclaimPolicy defines what happens to a persistent volume when released from its claim. Valid options are Retain (default for manually created PersistentVolumes), Delete (default for dynamically provisioned PersistentVolumes), and Recycle (deprecated). Recycle must be supported by the volume plugin underlying this PersistentVolume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#reclaiming
     *
     * Possible enum values:
     *  - `"Delete"` means the volume will be deleted from Kubernetes on release from its claim. The volume plugin must support Deletion.
     *  - `"Recycle"` means the volume will be recycled back into the pool of unbound persistent volumes on release from its claim. The volume plugin must support Recycling.
     *  - `"Retain"` means the volume will be left in its current phase (Released) for manual reclamation by the administrator. The default policy is Retain.
     */
    "persistentVolumeReclaimPolicy"?: "Delete" | "Recycle" | "Retain";
    /**
     * photonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine
     */
    "photonPersistentDisk"?: IIoK8sApiCoreV1PhotonPersistentDiskVolumeSource;
    /**
     * portworxVolume represents a portworx volume attached and mounted on kubelets host machine
     */
    "portworxVolume"?: IIoK8sApiCoreV1PortworxVolumeSource;
    /**
     * quobyte represents a Quobyte mount on the host that shares a pod's lifetime
     */
    "quobyte"?: IIoK8sApiCoreV1QuobyteVolumeSource;
    /**
     * rbd represents a Rados Block Device mount on the host that shares a pod's lifetime. More info: https://examples.k8s.io/volumes/rbd/README.md
     */
    "rbd"?: IIoK8sApiCoreV1RBDPersistentVolumeSource;
    /**
     * scaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
     */
    "scaleIO"?: IIoK8sApiCoreV1ScaleIOPersistentVolumeSource;
    /**
     * storageClassName is the name of StorageClass to which this persistent volume belongs. Empty value means that this volume does not belong to any StorageClass.
     */
    "storageClassName"?: string;
    /**
     * storageOS represents a StorageOS volume that is attached to the kubelet's host machine and mounted into the pod More info: https://examples.k8s.io/volumes/storageos/README.md
     */
    "storageos"?: IIoK8sApiCoreV1StorageOSPersistentVolumeSource;
    /**
     * volumeMode defines if a volume is intended to be used with a formatted filesystem or to remain in raw block state. Value of Filesystem is implied when not included in spec.
     *
     * Possible enum values:
     *  - `"Block"` means the volume will not be formatted with a filesystem and will remain a raw block device.
     *  - `"Filesystem"` means the volume will be or is formatted with a filesystem.
     */
    "volumeMode"?: "Block" | "Filesystem";
    /**
     * vsphereVolume represents a vSphere volume attached and mounted on kubelets host machine
     */
    "vsphereVolume"?: IIoK8sApiCoreV1VsphereVirtualDiskVolumeSource;
}
/**
 * PersistentVolumeSpec is the specification of a persistent volume.
 */
export declare class PersistentVolumeSpec extends Model<IPersistentVolumeSpec> implements IPersistentVolumeSpec {
    "accessModes"?: Array<string>;
    "awsElasticBlockStore"?: IIoK8sApiCoreV1AWSElasticBlockStoreVolumeSource;
    "azureDisk"?: IIoK8sApiCoreV1AzureDiskVolumeSource;
    "azureFile"?: IIoK8sApiCoreV1AzureFilePersistentVolumeSource;
    "capacity"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    "cephfs"?: IIoK8sApiCoreV1CephFSPersistentVolumeSource;
    "cinder"?: IIoK8sApiCoreV1CinderPersistentVolumeSource;
    "claimRef"?: IIoK8sApiCoreV1ObjectReference;
    "csi"?: IIoK8sApiCoreV1CSIPersistentVolumeSource;
    "fc"?: IIoK8sApiCoreV1FCVolumeSource;
    "flexVolume"?: IIoK8sApiCoreV1FlexPersistentVolumeSource;
    "flocker"?: IIoK8sApiCoreV1FlockerVolumeSource;
    "gcePersistentDisk"?: IIoK8sApiCoreV1GCEPersistentDiskVolumeSource;
    "glusterfs"?: IIoK8sApiCoreV1GlusterfsPersistentVolumeSource;
    "hostPath"?: IIoK8sApiCoreV1HostPathVolumeSource;
    "iscsi"?: IIoK8sApiCoreV1ISCSIPersistentVolumeSource;
    "local"?: IIoK8sApiCoreV1LocalVolumeSource;
    "mountOptions"?: Array<string>;
    "nfs"?: IIoK8sApiCoreV1NFSVolumeSource;
    "nodeAffinity"?: IIoK8sApiCoreV1VolumeNodeAffinity;
    "persistentVolumeReclaimPolicy"?: "Delete" | "Recycle" | "Retain";
    "photonPersistentDisk"?: IIoK8sApiCoreV1PhotonPersistentDiskVolumeSource;
    "portworxVolume"?: IIoK8sApiCoreV1PortworxVolumeSource;
    "quobyte"?: IIoK8sApiCoreV1QuobyteVolumeSource;
    "rbd"?: IIoK8sApiCoreV1RBDPersistentVolumeSource;
    "scaleIO"?: IIoK8sApiCoreV1ScaleIOPersistentVolumeSource;
    "storageClassName"?: string;
    "storageos"?: IIoK8sApiCoreV1StorageOSPersistentVolumeSource;
    "volumeMode"?: "Block" | "Filesystem";
    "vsphereVolume"?: IIoK8sApiCoreV1VsphereVirtualDiskVolumeSource;
    constructor(data?: ModelData<IPersistentVolumeSpec>);
}
export { IPersistentVolumeSpec as IIoK8sApiCoreV1PersistentVolumeSpec, PersistentVolumeSpec as IoK8sApiCoreV1PersistentVolumeSpec };
