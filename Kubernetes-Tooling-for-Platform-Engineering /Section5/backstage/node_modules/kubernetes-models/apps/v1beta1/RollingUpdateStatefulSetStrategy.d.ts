import { ModelData, Model } from "@kubernetes-models/base";
/**
 * RollingUpdateStatefulSetStrategy is used to communicate parameter for RollingUpdateStatefulSetStrategyType.
 */
export interface IRollingUpdateStatefulSetStrategy {
    /**
     * Partition indicates the ordinal at which the StatefulSet should be partitioned.
     */
    "partition"?: number;
}
/**
 * RollingUpdateStatefulSetStrategy is used to communicate parameter for RollingUpdateStatefulSetStrategyType.
 */
export declare class RollingUpdateStatefulSetStrategy extends Model<IRollingUpdateStatefulSetStrategy> implements IRollingUpdateStatefulSetStrategy {
    "partition"?: number;
    constructor(data?: ModelData<IRollingUpdateStatefulSetStrategy>);
}
export { IRollingUpdateStatefulSetStrategy as IIoK8sApiAppsV1beta1RollingUpdateStatefulSetStrategy, RollingUpdateStatefulSetStrategy as IoK8sApiAppsV1beta1RollingUpdateStatefulSetStrategy };
