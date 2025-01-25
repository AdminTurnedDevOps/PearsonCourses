import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Patch is provided to give a concrete name and type to the Kubernetes PATCH request body.
 */
export interface IPatch {
}
/**
 * Patch is provided to give a concrete name and type to the Kubernetes PATCH request body.
 */
export declare class Patch extends Model<IPatch> implements IPatch {
    constructor(data?: ModelData<IPatch>);
}
export { IPatch as IIoK8sApimachineryPkgApisMetaV1Patch, Patch as IoK8sApimachineryPkgApisMetaV1Patch };
