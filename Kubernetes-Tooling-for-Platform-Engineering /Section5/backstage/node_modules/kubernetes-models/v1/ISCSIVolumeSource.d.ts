import { IIoK8sApiCoreV1LocalObjectReference } from "./LocalObjectReference";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents an ISCSI disk. ISCSI volumes can only be mounted as read/write once. ISCSI volumes support ownership management and SELinux relabeling.
 */
export interface IISCSIVolumeSource {
    /**
     * chapAuthDiscovery defines whether support iSCSI Discovery CHAP authentication
     */
    "chapAuthDiscovery"?: boolean;
    /**
     * chapAuthSession defines whether support iSCSI Session CHAP authentication
     */
    "chapAuthSession"?: boolean;
    /**
     * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi
     */
    "fsType"?: string;
    /**
     * initiatorName is the custom iSCSI Initiator Name. If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface <target portal>:<volume name> will be created for the connection.
     */
    "initiatorName"?: string;
    /**
     * iqn is the target iSCSI Qualified Name.
     */
    "iqn": string;
    /**
     * iscsiInterface is the interface Name that uses an iSCSI transport. Defaults to 'default' (tcp).
     */
    "iscsiInterface"?: string;
    /**
     * lun represents iSCSI Target Lun number.
     */
    "lun": number;
    /**
     * portals is the iSCSI Target Portal List. The portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
     */
    "portals"?: Array<string>;
    /**
     * readOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false.
     */
    "readOnly"?: boolean;
    /**
     * secretRef is the CHAP Secret for iSCSI target and initiator authentication
     */
    "secretRef"?: IIoK8sApiCoreV1LocalObjectReference;
    /**
     * targetPortal is iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
     */
    "targetPortal": string;
}
/**
 * Represents an ISCSI disk. ISCSI volumes can only be mounted as read/write once. ISCSI volumes support ownership management and SELinux relabeling.
 */
export declare class ISCSIVolumeSource extends Model<IISCSIVolumeSource> implements IISCSIVolumeSource {
    "chapAuthDiscovery"?: boolean;
    "chapAuthSession"?: boolean;
    "fsType"?: string;
    "initiatorName"?: string;
    "iqn": string;
    "iscsiInterface"?: string;
    "lun": number;
    "portals"?: Array<string>;
    "readOnly"?: boolean;
    "secretRef"?: IIoK8sApiCoreV1LocalObjectReference;
    "targetPortal": string;
    constructor(data?: ModelData<IISCSIVolumeSource>);
}
export { IISCSIVolumeSource as IIoK8sApiCoreV1ISCSIVolumeSource, ISCSIVolumeSource as IoK8sApiCoreV1ISCSIVolumeSource };
