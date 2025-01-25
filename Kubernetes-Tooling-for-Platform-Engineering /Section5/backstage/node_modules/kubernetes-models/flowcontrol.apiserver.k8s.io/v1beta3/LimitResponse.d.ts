import { IIoK8sApiFlowcontrolV1beta3QueuingConfiguration } from "./QueuingConfiguration";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * LimitResponse defines how to handle requests that can not be executed right now.
 */
export interface ILimitResponse {
    /**
     * `queuing` holds the configuration parameters for queuing. This field may be non-empty only if `type` is `"Queue"`.
     */
    "queuing"?: IIoK8sApiFlowcontrolV1beta3QueuingConfiguration;
    /**
     * `type` is "Queue" or "Reject". "Queue" means that requests that can not be executed upon arrival are held in a queue until they can be executed or a queuing limit is reached. "Reject" means that requests that can not be executed upon arrival are rejected. Required.
     */
    "type": string;
}
/**
 * LimitResponse defines how to handle requests that can not be executed right now.
 */
export declare class LimitResponse extends Model<ILimitResponse> implements ILimitResponse {
    "queuing"?: IIoK8sApiFlowcontrolV1beta3QueuingConfiguration;
    "type": string;
    constructor(data?: ModelData<ILimitResponse>);
}
export { ILimitResponse as IIoK8sApiFlowcontrolV1beta3LimitResponse, LimitResponse as IoK8sApiFlowcontrolV1beta3LimitResponse };
