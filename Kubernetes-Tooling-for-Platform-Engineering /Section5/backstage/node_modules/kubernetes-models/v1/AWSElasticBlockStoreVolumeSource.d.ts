import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a Persistent Disk resource in AWS.
 *
 * An AWS EBS disk must exist before mounting to a container. The disk must also be in the same AWS zone as the kubelet. An AWS EBS disk can only be mounted as read/write once. AWS EBS volumes support ownership management and SELinux relabeling.
 */
export interface IAWSElasticBlockStoreVolumeSource {
    /**
     * fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     */
    "fsType"?: string;
    /**
     * partition is the partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).
     */
    "partition"?: number;
    /**
     * readOnly value true will force the readOnly setting in VolumeMounts. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     */
    "readOnly"?: boolean;
    /**
     * volumeID is unique ID of the persistent disk resource in AWS (Amazon EBS volume). More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
     */
    "volumeID": string;
}
/**
 * Represents a Persistent Disk resource in AWS.
 *
 * An AWS EBS disk must exist before mounting to a container. The disk must also be in the same AWS zone as the kubelet. An AWS EBS disk can only be mounted as read/write once. AWS EBS volumes support ownership management and SELinux relabeling.
 */
export declare class AWSElasticBlockStoreVolumeSource extends Model<IAWSElasticBlockStoreVolumeSource> implements IAWSElasticBlockStoreVolumeSource {
    "fsType"?: string;
    "partition"?: number;
    "readOnly"?: boolean;
    "volumeID": string;
    constructor(data?: ModelData<IAWSElasticBlockStoreVolumeSource>);
}
export { IAWSElasticBlockStoreVolumeSource as IIoK8sApiCoreV1AWSElasticBlockStoreVolumeSource, AWSElasticBlockStoreVolumeSource as IoK8sApiCoreV1AWSElasticBlockStoreVolumeSource };
