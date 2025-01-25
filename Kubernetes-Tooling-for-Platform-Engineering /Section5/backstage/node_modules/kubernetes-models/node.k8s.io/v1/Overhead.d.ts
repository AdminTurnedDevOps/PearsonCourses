import { IIoK8sApimachineryPkgApiResourceQuantity } from "@kubernetes-models/apimachinery/api/resource/Quantity";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Overhead structure represents the resource overhead associated with running a pod.
 */
export interface IOverhead {
    /**
     * podFixed represents the fixed resource overhead associated with running a pod.
     */
    "podFixed"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
}
/**
 * Overhead structure represents the resource overhead associated with running a pod.
 */
export declare class Overhead extends Model<IOverhead> implements IOverhead {
    "podFixed"?: {
        [key: string]: IIoK8sApimachineryPkgApiResourceQuantity;
    };
    constructor(data?: ModelData<IOverhead>);
}
export { IOverhead as IIoK8sApiNodeV1Overhead, Overhead as IoK8sApiNodeV1Overhead };
