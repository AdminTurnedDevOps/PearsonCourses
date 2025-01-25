import { IIoK8sApimachineryPkgUtilIntstrIntOrString } from "@kubernetes-models/apimachinery/util/intstr/IntOrString";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * RollingUpdateStatefulSetStrategy is used to communicate parameter for RollingUpdateStatefulSetStrategyType.
 */
export interface IRollingUpdateStatefulSetStrategy {
    /**
     * The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding up. This can not be 0. Defaults to 1. This field is alpha-level and is only honored by servers that enable the MaxUnavailableStatefulSet feature. The field applies to all pods in the range 0 to Replicas-1. That means if there is any unavailable pod in the range 0 to Replicas-1, it will be counted towards MaxUnavailable.
     */
    "maxUnavailable"?: IIoK8sApimachineryPkgUtilIntstrIntOrString;
    /**
     * Partition indicates the ordinal at which the StatefulSet should be partitioned for updates. During a rolling update, all pods from ordinal Replicas-1 to Partition are updated. All pods from ordinal Partition-1 to 0 remain untouched. This is helpful in being able to do a canary based deployment. The default value is 0.
     */
    "partition"?: number;
}
/**
 * RollingUpdateStatefulSetStrategy is used to communicate parameter for RollingUpdateStatefulSetStrategyType.
 */
export declare class RollingUpdateStatefulSetStrategy extends Model<IRollingUpdateStatefulSetStrategy> implements IRollingUpdateStatefulSetStrategy {
    "maxUnavailable"?: IIoK8sApimachineryPkgUtilIntstrIntOrString;
    "partition"?: number;
    constructor(data?: ModelData<IRollingUpdateStatefulSetStrategy>);
}
export { IRollingUpdateStatefulSetStrategy as IIoK8sApiAppsV1RollingUpdateStatefulSetStrategy, RollingUpdateStatefulSetStrategy as IoK8sApiAppsV1RollingUpdateStatefulSetStrategy };
