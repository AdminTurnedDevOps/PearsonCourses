import { ModelData, Model } from "@kubernetes-models/base";
/**
 * HostPortRange defines a range of host ports that will be enabled by a policy for pods to use.  It requires both the start and end to be defined. Deprecated: use HostPortRange from policy API Group instead.
 * @deprecated
 */
export interface IHostPortRange {
    /**
     * max is the end of the range, inclusive.
     */
    "max": number;
    /**
     * min is the start of the range, inclusive.
     */
    "min": number;
}
/**
 * HostPortRange defines a range of host ports that will be enabled by a policy for pods to use.  It requires both the start and end to be defined. Deprecated: use HostPortRange from policy API Group instead.
 * @deprecated
 */
export declare class HostPortRange extends Model<IHostPortRange> implements IHostPortRange {
    "max": number;
    "min": number;
    constructor(data?: ModelData<IHostPortRange>);
}
export { IHostPortRange as IIoK8sApiExtensionsV1beta1HostPortRange, HostPortRange as IoK8sApiExtensionsV1beta1HostPortRange };
