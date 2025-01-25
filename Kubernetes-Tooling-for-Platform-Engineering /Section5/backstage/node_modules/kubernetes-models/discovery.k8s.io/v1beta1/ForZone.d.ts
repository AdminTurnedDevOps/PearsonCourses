import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ForZone provides information about which zones should consume this endpoint.
 */
export interface IForZone {
    /**
     * name represents the name of the zone.
     */
    "name": string;
}
/**
 * ForZone provides information about which zones should consume this endpoint.
 */
export declare class ForZone extends Model<IForZone> implements IForZone {
    "name": string;
    constructor(data?: ModelData<IForZone>);
}
export { IForZone as IIoK8sApiDiscoveryV1beta1ForZone, ForZone as IoK8sApiDiscoveryV1beta1ForZone };
