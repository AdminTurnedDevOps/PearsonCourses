import { IIoK8sApiFlowcontrolV1beta2FlowSchemaCondition } from "./FlowSchemaCondition";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * FlowSchemaStatus represents the current state of a FlowSchema.
 */
export interface IFlowSchemaStatus {
    /**
     * `conditions` is a list of the current states of FlowSchema.
     */
    "conditions"?: Array<IIoK8sApiFlowcontrolV1beta2FlowSchemaCondition>;
}
/**
 * FlowSchemaStatus represents the current state of a FlowSchema.
 */
export declare class FlowSchemaStatus extends Model<IFlowSchemaStatus> implements IFlowSchemaStatus {
    "conditions"?: Array<IIoK8sApiFlowcontrolV1beta2FlowSchemaCondition>;
    constructor(data?: ModelData<IFlowSchemaStatus>);
}
export { IFlowSchemaStatus as IIoK8sApiFlowcontrolV1beta2FlowSchemaStatus, FlowSchemaStatus as IoK8sApiFlowcontrolV1beta2FlowSchemaStatus };
