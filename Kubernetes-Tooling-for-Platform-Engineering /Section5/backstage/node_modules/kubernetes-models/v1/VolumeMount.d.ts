import { ModelData, Model } from "@kubernetes-models/base";
/**
 * VolumeMount describes a mounting of a Volume within a container.
 */
export interface IVolumeMount {
    /**
     * Path within the container at which the volume should be mounted.  Must not contain ':'.
     */
    "mountPath": string;
    /**
     * mountPropagation determines how mounts are propagated from the host to container and the other way around. When not set, MountPropagationNone is used. This field is beta in 1.10.
     *
     * Possible enum values:
     *  - `"Bidirectional"` means that the volume in a container will receive new mounts from the host or other containers, and its own mounts will be propagated from the container to the host or other containers. Note that this mode is recursively applied to all mounts in the volume ("rshared" in Linux terminology).
     *  - `"HostToContainer"` means that the volume in a container will receive new mounts from the host or other containers, but filesystems mounted inside the container won't be propagated to the host or other containers. Note that this mode is recursively applied to all mounts in the volume ("rslave" in Linux terminology).
     *  - `"None"` means that the volume in a container will not receive new mounts from the host or other containers, and filesystems mounted inside the container won't be propagated to the host or other containers. Note that this mode corresponds to "private" in Linux terminology.
     */
    "mountPropagation"?: "Bidirectional" | "HostToContainer" | "None";
    /**
     * This must match the Name of a Volume.
     */
    "name": string;
    /**
     * Mounted read-only if true, read-write otherwise (false or unspecified). Defaults to false.
     */
    "readOnly"?: boolean;
    /**
     * Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root).
     */
    "subPath"?: string;
    /**
     * Expanded path within the volume from which the container's volume should be mounted. Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment. Defaults to "" (volume's root). SubPathExpr and SubPath are mutually exclusive.
     */
    "subPathExpr"?: string;
}
/**
 * VolumeMount describes a mounting of a Volume within a container.
 */
export declare class VolumeMount extends Model<IVolumeMount> implements IVolumeMount {
    "mountPath": string;
    "mountPropagation"?: "Bidirectional" | "HostToContainer" | "None";
    "name": string;
    "readOnly"?: boolean;
    "subPath"?: string;
    "subPathExpr"?: string;
    constructor(data?: ModelData<IVolumeMount>);
}
export { IVolumeMount as IIoK8sApiCoreV1VolumeMount, VolumeMount as IoK8sApiCoreV1VolumeMount };
