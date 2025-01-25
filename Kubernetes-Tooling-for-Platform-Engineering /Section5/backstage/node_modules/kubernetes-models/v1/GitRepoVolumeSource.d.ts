import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Represents a volume that is populated with the contents of a git repository. Git repo volumes do not support ownership management. Git repo volumes support SELinux relabeling.
 *
 * DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod's container.
 * @deprecated
 */
export interface IGitRepoVolumeSource {
    /**
     * directory is the target directory name. Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the git repository.  Otherwise, if specified, the volume will contain the git repository in the subdirectory with the given name.
     */
    "directory"?: string;
    /**
     * repository is the URL
     */
    "repository": string;
    /**
     * revision is the commit hash for the specified revision.
     */
    "revision"?: string;
}
/**
 * Represents a volume that is populated with the contents of a git repository. Git repo volumes do not support ownership management. Git repo volumes support SELinux relabeling.
 *
 * DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod's container.
 * @deprecated
 */
export declare class GitRepoVolumeSource extends Model<IGitRepoVolumeSource> implements IGitRepoVolumeSource {
    "directory"?: string;
    "repository": string;
    "revision"?: string;
    constructor(data?: ModelData<IGitRepoVolumeSource>);
}
export { IGitRepoVolumeSource as IIoK8sApiCoreV1GitRepoVolumeSource, GitRepoVolumeSource as IoK8sApiCoreV1GitRepoVolumeSource };
