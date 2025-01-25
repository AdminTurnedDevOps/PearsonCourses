import { ModelData, Model } from "@kubernetes-models/base";
/**
 * PodSchedulingGate is associated to a Pod to guard its scheduling.
 */
export interface IPodSchedulingGate {
    /**
     * Name of the scheduling gate. Each scheduling gate must have a unique name field.
     */
    "name": string;
}
/**
 * PodSchedulingGate is associated to a Pod to guard its scheduling.
 */
export declare class PodSchedulingGate extends Model<IPodSchedulingGate> implements IPodSchedulingGate {
    "name": string;
    constructor(data?: ModelData<IPodSchedulingGate>);
}
export { IPodSchedulingGate as IIoK8sApiCoreV1PodSchedulingGate, PodSchedulingGate as IoK8sApiCoreV1PodSchedulingGate };
