import { IIoK8sApiDiscoveryV1beta1ForZone } from "./ForZone";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * EndpointHints provides hints describing how an endpoint should be consumed.
 */
export interface IEndpointHints {
    /**
     * forZones indicates the zone(s) this endpoint should be consumed by to enable topology aware routing. May contain a maximum of 8 entries.
     */
    "forZones"?: Array<IIoK8sApiDiscoveryV1beta1ForZone>;
}
/**
 * EndpointHints provides hints describing how an endpoint should be consumed.
 */
export declare class EndpointHints extends Model<IEndpointHints> implements IEndpointHints {
    "forZones"?: Array<IIoK8sApiDiscoveryV1beta1ForZone>;
    constructor(data?: ModelData<IEndpointHints>);
}
export { IEndpointHints as IIoK8sApiDiscoveryV1beta1EndpointHints, EndpointHints as IoK8sApiDiscoveryV1beta1EndpointHints };
