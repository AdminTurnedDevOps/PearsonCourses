import { ModelData, Model } from "@kubernetes-models/base";
export interface IGRPCAction {
    /**
     * Port number of the gRPC service. Number must be in the range 1 to 65535.
     */
    "port": number;
    /**
     * Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
     *
     * If this is not specified, the default behavior is defined by gRPC.
     */
    "service"?: string;
}
export declare class GRPCAction extends Model<IGRPCAction> implements IGRPCAction {
    "port": number;
    "service"?: string;
    constructor(data?: ModelData<IGRPCAction>);
}
export { IGRPCAction as IIoK8sApiCoreV1GRPCAction, GRPCAction as IoK8sApiCoreV1GRPCAction };
