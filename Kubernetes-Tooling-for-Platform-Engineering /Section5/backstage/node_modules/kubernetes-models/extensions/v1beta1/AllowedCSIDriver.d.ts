import { ModelData, Model } from "@kubernetes-models/base";
/**
 * AllowedCSIDriver represents a single inline CSI Driver that is allowed to be used.
 */
export interface IAllowedCSIDriver {
    /**
     * Name is the registered name of the CSI driver
     */
    "name": string;
}
/**
 * AllowedCSIDriver represents a single inline CSI Driver that is allowed to be used.
 */
export declare class AllowedCSIDriver extends Model<IAllowedCSIDriver> implements IAllowedCSIDriver {
    "name": string;
    constructor(data?: ModelData<IAllowedCSIDriver>);
}
export { IAllowedCSIDriver as IIoK8sApiExtensionsV1beta1AllowedCSIDriver, AllowedCSIDriver as IoK8sApiExtensionsV1beta1AllowedCSIDriver };
