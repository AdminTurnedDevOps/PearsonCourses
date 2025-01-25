import { IIoK8sApiCoreV1ClientIPConfig } from "./ClientIPConfig";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * SessionAffinityConfig represents the configurations of session affinity.
 */
export interface ISessionAffinityConfig {
    /**
     * clientIP contains the configurations of Client IP based session affinity.
     */
    "clientIP"?: IIoK8sApiCoreV1ClientIPConfig;
}
/**
 * SessionAffinityConfig represents the configurations of session affinity.
 */
export declare class SessionAffinityConfig extends Model<ISessionAffinityConfig> implements ISessionAffinityConfig {
    "clientIP"?: IIoK8sApiCoreV1ClientIPConfig;
    constructor(data?: ModelData<ISessionAffinityConfig>);
}
export { ISessionAffinityConfig as IIoK8sApiCoreV1SessionAffinityConfig, SessionAffinityConfig as IoK8sApiCoreV1SessionAffinityConfig };
