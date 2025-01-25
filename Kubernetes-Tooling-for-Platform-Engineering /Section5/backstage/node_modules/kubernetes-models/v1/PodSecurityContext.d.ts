import { IIoK8sApiCoreV1SELinuxOptions } from "./SELinuxOptions";
import { IIoK8sApiCoreV1SeccompProfile } from "./SeccompProfile";
import { IIoK8sApiCoreV1Sysctl } from "./Sysctl";
import { IIoK8sApiCoreV1WindowsSecurityContextOptions } from "./WindowsSecurityContextOptions";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext.  Field values of container.securityContext take precedence over field values of PodSecurityContext.
 */
export interface IPodSecurityContext {
    /**
     * A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod:
     *
     * 1. The owning GID will be the FSGroup 2. The setgid bit is set (new files created in the volume will be owned by FSGroup) 3. The permission bits are OR'd with rw-rw----
     *
     * If unset, the Kubelet will not modify the ownership and permissions of any volume. Note that this field cannot be set when spec.os.name is windows.
     */
    "fsGroup"?: number;
    /**
     * fsGroupChangePolicy defines behavior of changing ownership and permission of the volume before being exposed inside Pod. This field will only apply to volume types which support fsGroup based ownership(and permissions). It will have no effect on ephemeral volume types such as: secret, configmaps and emptydir. Valid values are "OnRootMismatch" and "Always". If not specified, "Always" is used. Note that this field cannot be set when spec.os.name is windows.
     *
     * Possible enum values:
     *  - `"Always"` indicates that volume's ownership and permissions should always be changed whenever volume is mounted inside a Pod. This the default behavior.
     *  - `"OnRootMismatch"` indicates that volume's ownership and permissions will be changed only when permission and ownership of root directory does not match with expected permissions on the volume. This can help shorten the time it takes to change ownership and permissions of a volume.
     */
    "fsGroupChangePolicy"?: "Always" | "OnRootMismatch";
    /**
     * The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.
     */
    "runAsGroup"?: number;
    /**
     * Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
     */
    "runAsNonRoot"?: boolean;
    /**
     * The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.
     */
    "runAsUser"?: number;
    /**
     * The SELinux context to be applied to all containers. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.
     */
    "seLinuxOptions"?: IIoK8sApiCoreV1SELinuxOptions;
    /**
     * The seccomp options to use by the containers in this pod. Note that this field cannot be set when spec.os.name is windows.
     */
    "seccompProfile"?: IIoK8sApiCoreV1SeccompProfile;
    /**
     * A list of groups applied to the first process run in each container, in addition to the container's primary GID, the fsGroup (if specified), and group memberships defined in the container image for the uid of the container process. If unspecified, no additional groups are added to any container. Note that group memberships defined in the container image for the uid of the container process are still effective, even if they are not included in this list. Note that this field cannot be set when spec.os.name is windows.
     */
    "supplementalGroups"?: Array<number>;
    /**
     * Sysctls hold a list of namespaced sysctls used for the pod. Pods with unsupported sysctls (by the container runtime) might fail to launch. Note that this field cannot be set when spec.os.name is windows.
     */
    "sysctls"?: Array<IIoK8sApiCoreV1Sysctl>;
    /**
     * The Windows specific settings applied to all containers. If unspecified, the options within a container's SecurityContext will be used. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is linux.
     */
    "windowsOptions"?: IIoK8sApiCoreV1WindowsSecurityContextOptions;
}
/**
 * PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext.  Field values of container.securityContext take precedence over field values of PodSecurityContext.
 */
export declare class PodSecurityContext extends Model<IPodSecurityContext> implements IPodSecurityContext {
    "fsGroup"?: number;
    "fsGroupChangePolicy"?: "Always" | "OnRootMismatch";
    "runAsGroup"?: number;
    "runAsNonRoot"?: boolean;
    "runAsUser"?: number;
    "seLinuxOptions"?: IIoK8sApiCoreV1SELinuxOptions;
    "seccompProfile"?: IIoK8sApiCoreV1SeccompProfile;
    "supplementalGroups"?: Array<number>;
    "sysctls"?: Array<IIoK8sApiCoreV1Sysctl>;
    "windowsOptions"?: IIoK8sApiCoreV1WindowsSecurityContextOptions;
    constructor(data?: ModelData<IPodSecurityContext>);
}
export { IPodSecurityContext as IIoK8sApiCoreV1PodSecurityContext, PodSecurityContext as IoK8sApiCoreV1PodSecurityContext };
