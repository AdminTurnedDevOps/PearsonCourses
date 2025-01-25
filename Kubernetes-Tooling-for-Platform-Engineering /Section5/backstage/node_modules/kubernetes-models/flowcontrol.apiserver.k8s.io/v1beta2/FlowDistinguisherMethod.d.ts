import { ModelData, Model } from "@kubernetes-models/base";
/**
 * FlowDistinguisherMethod specifies the method of a flow distinguisher.
 */
export interface IFlowDistinguisherMethod {
    /**
     * `type` is the type of flow distinguisher method The supported types are "ByUser" and "ByNamespace". Required.
     */
    "type": string;
}
/**
 * FlowDistinguisherMethod specifies the method of a flow distinguisher.
 */
export declare class FlowDistinguisherMethod extends Model<IFlowDistinguisherMethod> implements IFlowDistinguisherMethod {
    "type": string;
    constructor(data?: ModelData<IFlowDistinguisherMethod>);
}
export { IFlowDistinguisherMethod as IIoK8sApiFlowcontrolV1beta2FlowDistinguisherMethod, FlowDistinguisherMethod as IoK8sApiFlowcontrolV1beta2FlowDistinguisherMethod };
