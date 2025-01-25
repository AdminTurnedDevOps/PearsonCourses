import { ModelData, Model } from "@kubernetes-models/base";
/**
 * DEPRECATED.
 * @deprecated
 */
export interface IRollbackConfig {
    /**
     * The revision to rollback to. If set to 0, rollback to the last revision.
     */
    "revision"?: number;
}
/**
 * DEPRECATED.
 * @deprecated
 */
export declare class RollbackConfig extends Model<IRollbackConfig> implements IRollbackConfig {
    "revision"?: number;
    constructor(data?: ModelData<IRollbackConfig>);
}
export { IRollbackConfig as IIoK8sApiAppsV1beta1RollbackConfig, RollbackConfig as IoK8sApiAppsV1beta1RollbackConfig };
