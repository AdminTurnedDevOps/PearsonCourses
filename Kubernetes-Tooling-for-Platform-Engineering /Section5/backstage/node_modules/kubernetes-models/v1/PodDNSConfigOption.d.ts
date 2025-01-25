import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodDNSConfigOption defines DNS resolver options of a pod.
 */
export interface IPodDNSConfigOption {
    /**
     * Required.
     */
    "name"?: string;
    "value"?: string;
}
/**
 * PodDNSConfigOption defines DNS resolver options of a pod.
 */
export declare class PodDNSConfigOption extends Model<IPodDNSConfigOption> implements IPodDNSConfigOption {
    "name"?: string;
    "value"?: string;
    constructor(data?: ModelData<IPodDNSConfigOption>);
}
export { IPodDNSConfigOption as IIoK8sApiCoreV1PodDNSConfigOption, PodDNSConfigOption as IoK8sApiCoreV1PodDNSConfigOption };
