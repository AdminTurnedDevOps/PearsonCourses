import { IIoK8sApiAppsV1RollingUpdateStatefulSetStrategy } from "./RollingUpdateStatefulSetStrategy";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * StatefulSetUpdateStrategy indicates the strategy that the StatefulSet controller will use to perform updates. It includes any additional parameters necessary to perform the update for the indicated strategy.
 */
export interface IStatefulSetUpdateStrategy {
    /**
     * RollingUpdate is used to communicate parameters when Type is RollingUpdateStatefulSetStrategyType.
     */
    "rollingUpdate"?: IIoK8sApiAppsV1RollingUpdateStatefulSetStrategy;
    /**
     * Type indicates the type of the StatefulSetUpdateStrategy. Default is RollingUpdate.
     *
     * Possible enum values:
     *  - `"OnDelete"` triggers the legacy behavior. Version tracking and ordered rolling restarts are disabled. Pods are recreated from the StatefulSetSpec when they are manually deleted. When a scale operation is performed with this strategy,specification version indicated by the StatefulSet's currentRevision.
     *  - `"RollingUpdate"` indicates that update will be applied to all Pods in the StatefulSet with respect to the StatefulSet ordering constraints. When a scale operation is performed with this strategy, new Pods will be created from the specification version indicated by the StatefulSet's updateRevision.
     */
    "type"?: "OnDelete" | "RollingUpdate";
}
/**
 * StatefulSetUpdateStrategy indicates the strategy that the StatefulSet controller will use to perform updates. It includes any additional parameters necessary to perform the update for the indicated strategy.
 */
export declare class StatefulSetUpdateStrategy extends Model<IStatefulSetUpdateStrategy> implements IStatefulSetUpdateStrategy {
    "rollingUpdate"?: IIoK8sApiAppsV1RollingUpdateStatefulSetStrategy;
    "type"?: "OnDelete" | "RollingUpdate";
    constructor(data?: ModelData<IStatefulSetUpdateStrategy>);
}
export { IStatefulSetUpdateStrategy as IIoK8sApiAppsV1StatefulSetUpdateStrategy, StatefulSetUpdateStrategy as IoK8sApiAppsV1StatefulSetUpdateStrategy };
