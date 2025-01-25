import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ScaleSpec describes the attributes of a scale subresource
 */
export interface IScaleSpec {
    /**
     * desired number of instances for the scaled object.
     */
    "replicas"?: number;
}
/**
 * ScaleSpec describes the attributes of a scale subresource
 */
export declare class ScaleSpec extends Model<IScaleSpec> implements IScaleSpec {
    "replicas"?: number;
    constructor(data?: ModelData<IScaleSpec>);
}
export { IScaleSpec as IIoK8sApiAppsV1beta1ScaleSpec, ScaleSpec as IoK8sApiAppsV1beta1ScaleSpec };
