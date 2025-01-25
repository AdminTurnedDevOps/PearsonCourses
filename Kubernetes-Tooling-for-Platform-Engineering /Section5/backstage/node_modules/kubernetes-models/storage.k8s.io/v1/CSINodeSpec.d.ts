import { IIoK8sApiStorageV1CSINodeDriver } from "./CSINodeDriver";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CSINodeSpec holds information about the specification of all CSI drivers installed on a node
 */
export interface ICSINodeSpec {
    /**
     * drivers is a list of information of all CSI Drivers existing on a node. If all drivers in the list are uninstalled, this can become empty.
     */
    "drivers": Array<IIoK8sApiStorageV1CSINodeDriver>;
}
/**
 * CSINodeSpec holds information about the specification of all CSI drivers installed on a node
 */
export declare class CSINodeSpec extends Model<ICSINodeSpec> implements ICSINodeSpec {
    "drivers": Array<IIoK8sApiStorageV1CSINodeDriver>;
    constructor(data?: ModelData<ICSINodeSpec>);
}
export { ICSINodeSpec as IIoK8sApiStorageV1CSINodeSpec, CSINodeSpec as IoK8sApiStorageV1CSINodeSpec };
