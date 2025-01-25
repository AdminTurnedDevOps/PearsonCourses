import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodOS defines the OS parameters of a pod.
 */
export interface IPodOS {
    /**
     * Name is the name of the operating system. The currently supported values are linux and windows. Additional value may be defined in future and can be one of: https://github.com/opencontainers/runtime-spec/blob/master/config.md#platform-specific-configuration Clients should expect to handle additional values and treat unrecognized values in this field as os: null
     */
    "name": string;
}
/**
 * PodOS defines the OS parameters of a pod.
 */
export declare class PodOS extends Model<IPodOS> implements IPodOS {
    "name": string;
    constructor(data?: ModelData<IPodOS>);
}
export { IPodOS as IIoK8sApiCoreV1PodOS, PodOS as IoK8sApiCoreV1PodOS };
