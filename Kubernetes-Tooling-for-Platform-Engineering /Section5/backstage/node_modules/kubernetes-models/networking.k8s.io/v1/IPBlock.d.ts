import { ModelData, Model } from "@kubernetes-models/base";
/**
 * IPBlock describes a particular CIDR (Ex. "192.168.1.0/24","2001:db8::/64") that is allowed to the pods matched by a NetworkPolicySpec's podSelector. The except entry describes CIDRs that should not be included within this rule.
 */
export interface IIPBlock {
    /**
     * cidr is a string representing the IPBlock Valid examples are "192.168.1.0/24" or "2001:db8::/64"
     */
    "cidr": string;
    /**
     * except is a slice of CIDRs that should not be included within an IPBlock Valid examples are "192.168.1.0/24" or "2001:db8::/64" Except values will be rejected if they are outside the cidr range
     */
    "except"?: Array<string>;
}
/**
 * IPBlock describes a particular CIDR (Ex. "192.168.1.0/24","2001:db8::/64") that is allowed to the pods matched by a NetworkPolicySpec's podSelector. The except entry describes CIDRs that should not be included within this rule.
 */
export declare class IPBlock extends Model<IIPBlock> implements IIPBlock {
    "cidr": string;
    "except"?: Array<string>;
    constructor(data?: ModelData<IIPBlock>);
}
export { IIPBlock as IIoK8sApiNetworkingV1IPBlock, IPBlock as IoK8sApiNetworkingV1IPBlock };
