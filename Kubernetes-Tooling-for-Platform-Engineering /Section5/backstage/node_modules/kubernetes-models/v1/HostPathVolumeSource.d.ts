import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a host path mapped into a pod. Host path volumes do not support ownership management or SELinux relabeling.
 */
export interface IHostPathVolumeSource {
    /**
     * path of the directory on the host. If the path is a symlink, it will follow the link to the real path. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
     */
    "path": string;
    /**
     * type for HostPath Volume Defaults to "" More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
     *
     * Possible enum values:
     *  - `""` For backwards compatible, leave it empty if unset
     *  - `"BlockDevice"` A block device must exist at the given path
     *  - `"CharDevice"` A character device must exist at the given path
     *  - `"Directory"` A directory must exist at the given path
     *  - `"DirectoryOrCreate"` If nothing exists at the given path, an empty directory will be created there as needed with file mode 0755, having the same group and ownership with Kubelet.
     *  - `"File"` A file must exist at the given path
     *  - `"FileOrCreate"` If nothing exists at the given path, an empty file will be created there as needed with file mode 0644, having the same group and ownership with Kubelet.
     *  - `"Socket"` A UNIX socket must exist at the given path
     */
    "type"?: "" | "BlockDevice" | "CharDevice" | "Directory" | "DirectoryOrCreate" | "File" | "FileOrCreate" | "Socket";
}
/**
 * Represents a host path mapped into a pod. Host path volumes do not support ownership management or SELinux relabeling.
 */
export declare class HostPathVolumeSource extends Model<IHostPathVolumeSource> implements IHostPathVolumeSource {
    "path": string;
    "type"?: "" | "BlockDevice" | "CharDevice" | "Directory" | "DirectoryOrCreate" | "File" | "FileOrCreate" | "Socket";
    constructor(data?: ModelData<IHostPathVolumeSource>);
}
export { IHostPathVolumeSource as IIoK8sApiCoreV1HostPathVolumeSource, HostPathVolumeSource as IoK8sApiCoreV1HostPathVolumeSource };
