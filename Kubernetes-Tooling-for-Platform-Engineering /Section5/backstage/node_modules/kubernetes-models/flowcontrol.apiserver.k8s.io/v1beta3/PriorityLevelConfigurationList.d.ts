import { IIoK8sApiFlowcontrolV1beta3PriorityLevelConfiguration } from "./PriorityLevelConfiguration";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PriorityLevelConfigurationList is a list of PriorityLevelConfiguration objects.
 */
export interface IPriorityLevelConfigurationList extends TypeMeta {
    "apiVersion": "flowcontrol.apiserver.k8s.io/v1beta3";
    /**
     * `items` is a list of request-priorities.
     */
    "items": Array<IIoK8sApiFlowcontrolV1beta3PriorityLevelConfiguration>;
    "kind": "PriorityLevelConfigurationList";
    /**
     * `metadata` is the standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * PriorityLevelConfigurationList is a list of PriorityLevelConfiguration objects.
 */
export declare class PriorityLevelConfigurationList extends Model<IPriorityLevelConfigurationList> implements IPriorityLevelConfigurationList {
    "apiVersion": IPriorityLevelConfigurationList["apiVersion"];
    "items": Array<IIoK8sApiFlowcontrolV1beta3PriorityLevelConfiguration>;
    "kind": IPriorityLevelConfigurationList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IPriorityLevelConfigurationList["apiVersion"];
    static kind: IPriorityLevelConfigurationList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPriorityLevelConfigurationList>;
    constructor(data?: ModelData<IPriorityLevelConfigurationList>);
}
export { IPriorityLevelConfigurationList as IIoK8sApiFlowcontrolV1beta3PriorityLevelConfigurationList, PriorityLevelConfigurationList as IoK8sApiFlowcontrolV1beta3PriorityLevelConfigurationList };
