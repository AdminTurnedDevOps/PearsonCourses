import { ModelData, Model } from "@kubernetes-models/base";
/**
 * AllowedFlexVolume represents a single Flexvolume that is allowed to be used. Deprecated: use AllowedFlexVolume from policy API Group instead.
 * @deprecated
 */
export interface IAllowedFlexVolume {
    /**
     * driver is the name of the Flexvolume driver.
     */
    "driver": string;
}
/**
 * AllowedFlexVolume represents a single Flexvolume that is allowed to be used. Deprecated: use AllowedFlexVolume from policy API Group instead.
 * @deprecated
 */
export declare class AllowedFlexVolume extends Model<IAllowedFlexVolume> implements IAllowedFlexVolume {
    "driver": string;
    constructor(data?: ModelData<IAllowedFlexVolume>);
}
export { IAllowedFlexVolume as IIoK8sApiExtensionsV1beta1AllowedFlexVolume, AllowedFlexVolume as IoK8sApiExtensionsV1beta1AllowedFlexVolume };
