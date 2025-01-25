import { IIoK8sApiFlowcontrolV1beta2FlowSchema } from "./FlowSchema";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * FlowSchemaList is a list of FlowSchema objects.
 */
export interface IFlowSchemaList extends TypeMeta {
    "apiVersion": "flowcontrol.apiserver.k8s.io/v1beta2";
    /**
     * `items` is a list of FlowSchemas.
     */
    "items": Array<IIoK8sApiFlowcontrolV1beta2FlowSchema>;
    "kind": "FlowSchemaList";
    /**
     * `metadata` is the standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * FlowSchemaList is a list of FlowSchema objects.
 */
export declare class FlowSchemaList extends Model<IFlowSchemaList> implements IFlowSchemaList {
    "apiVersion": IFlowSchemaList["apiVersion"];
    "items": Array<IIoK8sApiFlowcontrolV1beta2FlowSchema>;
    "kind": IFlowSchemaList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IFlowSchemaList["apiVersion"];
    static kind: IFlowSchemaList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IFlowSchemaList>;
    constructor(data?: ModelData<IFlowSchemaList>);
}
export { IFlowSchemaList as IIoK8sApiFlowcontrolV1beta2FlowSchemaList, FlowSchemaList as IoK8sApiFlowcontrolV1beta2FlowSchemaList };
