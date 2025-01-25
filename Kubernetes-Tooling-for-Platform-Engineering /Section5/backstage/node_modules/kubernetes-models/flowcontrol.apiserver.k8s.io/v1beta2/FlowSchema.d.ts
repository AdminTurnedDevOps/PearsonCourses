import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiFlowcontrolV1beta2FlowSchemaSpec } from "./FlowSchemaSpec";
import { IIoK8sApiFlowcontrolV1beta2FlowSchemaStatus } from "./FlowSchemaStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * FlowSchema defines the schema of a group of flows. Note that a flow is made up of a set of inbound API requests with similar attributes and is identified by a pair of strings: the name of the FlowSchema and a "flow distinguisher".
 */
export interface IFlowSchema extends TypeMeta {
    "apiVersion": "flowcontrol.apiserver.k8s.io/v1beta2";
    "kind": "FlowSchema";
    /**
     * `metadata` is the standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * `spec` is the specification of the desired behavior of a FlowSchema. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiFlowcontrolV1beta2FlowSchemaSpec;
    /**
     * `status` is the current status of a FlowSchema. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "status"?: IIoK8sApiFlowcontrolV1beta2FlowSchemaStatus;
}
/**
 * FlowSchema defines the schema of a group of flows. Note that a flow is made up of a set of inbound API requests with similar attributes and is identified by a pair of strings: the name of the FlowSchema and a "flow distinguisher".
 */
export declare class FlowSchema extends Model<IFlowSchema> implements IFlowSchema {
    "apiVersion": IFlowSchema["apiVersion"];
    "kind": IFlowSchema["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiFlowcontrolV1beta2FlowSchemaSpec;
    "status"?: IIoK8sApiFlowcontrolV1beta2FlowSchemaStatus;
    static apiVersion: IFlowSchema["apiVersion"];
    static kind: IFlowSchema["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IFlowSchema>;
    constructor(data?: ModelData<IFlowSchema>);
}
export { IFlowSchema as IIoK8sApiFlowcontrolV1beta2FlowSchema, FlowSchema as IoK8sApiFlowcontrolV1beta2FlowSchema };
