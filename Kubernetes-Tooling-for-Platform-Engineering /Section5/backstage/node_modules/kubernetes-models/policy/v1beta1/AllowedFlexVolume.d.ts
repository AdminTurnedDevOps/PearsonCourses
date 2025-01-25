import { ModelData, Model } from "@kubernetes-models/base";
/**
 * AllowedFlexVolume represents a single Flexvolume that is allowed to be used.
 */
export interface IAllowedFlexVolume {
    /**
     * driver is the name of the Flexvolume driver.
     */
    "driver": string;
}
/**
 * AllowedFlexVolume represents a single Flexvolume that is allowed to be used.
 */
export declare class AllowedFlexVolume extends Model<IAllowedFlexVolume> implements IAllowedFlexVolume {
    "driver": string;
    constructor(data?: ModelData<IAllowedFlexVolume>);
}
export { IAllowedFlexVolume as IIoK8sApiPolicyV1beta1AllowedFlexVolume, AllowedFlexVolume as IoK8sApiPolicyV1beta1AllowedFlexVolume };
