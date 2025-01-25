import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiFlowcontrolV1beta1PriorityLevelConfigurationSpec } from "./PriorityLevelConfigurationSpec";
import { IIoK8sApiFlowcontrolV1beta1PriorityLevelConfigurationStatus } from "./PriorityLevelConfigurationStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PriorityLevelConfiguration represents the configuration of a priority level.
 */
export interface IPriorityLevelConfiguration extends TypeMeta {
    "apiVersion": "flowcontrol.apiserver.k8s.io/v1beta1";
    "kind": "PriorityLevelConfiguration";
    /**
     * `metadata` is the standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * `spec` is the specification of the desired behavior of a "request-priority". More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiFlowcontrolV1beta1PriorityLevelConfigurationSpec;
    /**
     * `status` is the current status of a "request-priority". More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "status"?: IIoK8sApiFlowcontrolV1beta1PriorityLevelConfigurationStatus;
}
/**
 * PriorityLevelConfiguration represents the configuration of a priority level.
 */
export declare class PriorityLevelConfiguration extends Model<IPriorityLevelConfiguration> implements IPriorityLevelConfiguration {
    "apiVersion": IPriorityLevelConfiguration["apiVersion"];
    "kind": IPriorityLevelConfiguration["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiFlowcontrolV1beta1PriorityLevelConfigurationSpec;
    "status"?: IIoK8sApiFlowcontrolV1beta1PriorityLevelConfigurationStatus;
    static apiVersion: IPriorityLevelConfiguration["apiVersion"];
    static kind: IPriorityLevelConfiguration["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPriorityLevelConfiguration>;
    constructor(data?: ModelData<IPriorityLevelConfiguration>);
}
export { IPriorityLevelConfiguration as IIoK8sApiFlowcontrolV1beta1PriorityLevelConfiguration, PriorityLevelConfiguration as IoK8sApiFlowcontrolV1beta1PriorityLevelConfiguration };
