import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ClientIPConfig represents the configurations of Client IP based session affinity.
 */
export interface IClientIPConfig {
    /**
     * timeoutSeconds specifies the seconds of ClientIP type session sticky time. The value must be >0 && <=86400(for 1 day) if ServiceAffinity == "ClientIP". Default value is 10800(for 3 hours).
     */
    "timeoutSeconds"?: number;
}
/**
 * ClientIPConfig represents the configurations of Client IP based session affinity.
 */
export declare class ClientIPConfig extends Model<IClientIPConfig> implements IClientIPConfig {
    "timeoutSeconds"?: number;
    constructor(data?: ModelData<IClientIPConfig>);
}
export { IClientIPConfig as IIoK8sApiCoreV1ClientIPConfig, ClientIPConfig as IoK8sApiCoreV1ClientIPConfig };
