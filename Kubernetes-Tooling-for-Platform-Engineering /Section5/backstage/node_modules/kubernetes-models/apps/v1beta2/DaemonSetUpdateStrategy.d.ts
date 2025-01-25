import { IIoK8sApiAppsV1beta2RollingUpdateDaemonSet } from "./RollingUpdateDaemonSet";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
 */
export interface IDaemonSetUpdateStrategy {
    /**
     * Rolling update config params. Present only if type = "RollingUpdate".
     */
    "rollingUpdate"?: IIoK8sApiAppsV1beta2RollingUpdateDaemonSet;
    /**
     * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is RollingUpdate.
     */
    "type"?: string;
}
/**
 * DaemonSetUpdateStrategy is a struct used to control the update strategy for a DaemonSet.
 */
export declare class DaemonSetUpdateStrategy extends Model<IDaemonSetUpdateStrategy> implements IDaemonSetUpdateStrategy {
    "rollingUpdate"?: IIoK8sApiAppsV1beta2RollingUpdateDaemonSet;
    "type"?: string;
    constructor(data?: ModelData<IDaemonSetUpdateStrategy>);
}
export { IDaemonSetUpdateStrategy as IIoK8sApiAppsV1beta2DaemonSetUpdateStrategy, DaemonSetUpdateStrategy as IoK8sApiAppsV1beta2DaemonSetUpdateStrategy };
