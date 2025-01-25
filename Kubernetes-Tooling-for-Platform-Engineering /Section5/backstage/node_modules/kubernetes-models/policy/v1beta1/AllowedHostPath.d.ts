import { ModelData, Model } from "@kubernetes-models/base";
/**
 * AllowedHostPath defines the host volume conditions that will be enabled by a policy for pods to use. It requires the path prefix to be defined.
 */
export interface IAllowedHostPath {
    /**
     * pathPrefix is the path prefix that the host volume must match. It does not support `\*`. Trailing slashes are trimmed when validating the path prefix with a host path.
     *
     * Examples: `/foo` would allow `/foo`, `/foo/` and `/foo/bar` `/foo` would not allow `/food` or `/etc/foo`
     */
    "pathPrefix"?: string;
    /**
     * when set to true, will allow host volumes matching the pathPrefix only if all volume mounts are readOnly.
     */
    "readOnly"?: boolean;
}
/**
 * AllowedHostPath defines the host volume conditions that will be enabled by a policy for pods to use. It requires the path prefix to be defined.
 */
export declare class AllowedHostPath extends Model<IAllowedHostPath> implements IAllowedHostPath {
    "pathPrefix"?: string;
    "readOnly"?: boolean;
    constructor(data?: ModelData<IAllowedHostPath>);
}
export { IAllowedHostPath as IIoK8sApiPolicyV1beta1AllowedHostPath, AllowedHostPath as IoK8sApiPolicyV1beta1AllowedHostPath };
