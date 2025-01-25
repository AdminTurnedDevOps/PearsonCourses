import { ModelData, Model } from "@kubernetes-models/base";
/**
 * RollingUpdateStatefulSetStrategy is used to communicate parameter for RollingUpdateStatefulSetStrategyType.
 */
export interface IRollingUpdateStatefulSetStrategy {
    /**
     * Partition indicates the ordinal at which the StatefulSet should be partitioned. Default value is 0.
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
export { IRollingUpdateStatefulSetStrategy as IIoK8sApiAppsV1beta2RollingUpdateStatefulSetStrategy, RollingUpdateStatefulSetStrategy as IoK8sApiAppsV1beta2RollingUpdateStatefulSetStrategy };
