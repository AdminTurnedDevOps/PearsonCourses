import { ModelData, Model } from "@kubernetes-models/base";
/**
 * DaemonEndpoint contains information about a single Daemon endpoint.
 */
export interface IDaemonEndpoint {
    /**
     * Port number of the given endpoint.
     */
    "Port": number;
}
/**
 * DaemonEndpoint contains information about a single Daemon endpoint.
 */
export declare class DaemonEndpoint extends Model<IDaemonEndpoint> implements IDaemonEndpoint {
    "Port": number;
    constructor(data?: ModelData<IDaemonEndpoint>);
}
export { IDaemonEndpoint as IIoK8sApiCoreV1DaemonEndpoint, DaemonEndpoint as IoK8sApiCoreV1DaemonEndpoint };
