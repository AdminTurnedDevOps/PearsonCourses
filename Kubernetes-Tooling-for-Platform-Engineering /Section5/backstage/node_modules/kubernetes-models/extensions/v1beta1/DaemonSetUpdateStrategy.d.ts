import { IIoK8sApiExtensionsV1beta1RollingUpdateDaemonSet } from "./RollingUpdateDaemonSet";
import { ModelData, Model } from "@kubernetes-models/base";
export interface IDaemonSetUpdateStrategy {
    /**
     * Rolling update config params. Present only if type = "RollingUpdate".
     */
    "rollingUpdate"?: IIoK8sApiExtensionsV1beta1RollingUpdateDaemonSet;
    /**
     * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is OnDelete.
     */
    "type"?: string;
}
export declare class DaemonSetUpdateStrategy extends Model<IDaemonSetUpdateStrategy> implements IDaemonSetUpdateStrategy {
    "rollingUpdate"?: IIoK8sApiExtensionsV1beta1RollingUpdateDaemonSet;
    "type"?: string;
    constructor(data?: ModelData<IDaemonSetUpdateStrategy>);
}
export { IDaemonSetUpdateStrategy as IIoK8sApiExtensionsV1beta1DaemonSetUpdateStrategy, DaemonSetUpdateStrategy as IoK8sApiExtensionsV1beta1DaemonSetUpdateStrategy };
