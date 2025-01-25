import { IIoK8sApiExtensionsV1beta1RollbackConfig } from "./RollbackConfig";
import { IIoK8sApimachineryPkgApisMetaV1LabelSelector } from "@kubernetes-models/apimachinery/apis/meta/v1/LabelSelector";
import { IIoK8sApiExtensionsV1beta1DeploymentStrategy } from "./DeploymentStrategy";
import { IIoK8sApiCoreV1PodTemplateSpec } from "../../v1/PodTemplateSpec";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * DeploymentSpec is the specification of the desired behavior of the Deployment.
 */
export interface IDeploymentSpec {
    /**
     * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
     */
    "minReadySeconds"?: number;
    /**
     * Indicates that the deployment is paused and will not be processed by the deployment controller.
     */
    "paused"?: boolean;
    /**
     * The maximum time in seconds for a deployment to make progress before it is considered to be failed. The deployment controller will continue to process failed deployments and a condition with a ProgressDeadlineExceeded reason will be surfaced in the deployment status. Note that progress will not be estimated during the time a deployment is paused. This is set to the max value of int32 (i.e. 2147483647) by default, which means "no deadline".
     */
    "progressDeadlineSeconds"?: number;
    /**
     * Number of desired pods. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.
     */
    "replicas"?: number;
    /**
     * The number of old ReplicaSets to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. This is set to the max value of int32 (i.e. 2147483647) by default, which means "retaining all old RelicaSets".
     */
    "revisionHistoryLimit"?: number;
    /**
     * DEPRECATED. The config this deployment is rolling back to. Will be cleared after rollback is done.
     */
    "rollbackTo"?: IIoK8sApiExtensionsV1beta1RollbackConfig;
    /**
     * Label selector for pods. Existing ReplicaSets whose pods are selected by this will be the ones affected by this deployment.
     */
    "selector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    /**
     * The deployment strategy to use to replace existing pods with new ones.
     */
    "strategy"?: IIoK8sApiExtensionsV1beta1DeploymentStrategy;
    /**
     * Template describes the pods that will be created.
     */
    "template": IIoK8sApiCoreV1PodTemplateSpec;
}
/**
 * DeploymentSpec is the specification of the desired behavior of the Deployment.
 */
export declare class DeploymentSpec extends Model<IDeploymentSpec> implements IDeploymentSpec {
    "minReadySeconds"?: number;
    "paused"?: boolean;
    "progressDeadlineSeconds"?: number;
    "replicas"?: number;
    "revisionHistoryLimit"?: number;
    "rollbackTo"?: IIoK8sApiExtensionsV1beta1RollbackConfig;
    "selector"?: IIoK8sApimachineryPkgApisMetaV1LabelSelector;
    "strategy"?: IIoK8sApiExtensionsV1beta1DeploymentStrategy;
    "template": IIoK8sApiCoreV1PodTemplateSpec;
    constructor(data?: ModelData<IDeploymentSpec>);
}
export { IDeploymentSpec as IIoK8sApiExtensionsV1beta1DeploymentSpec, DeploymentSpec as IoK8sApiExtensionsV1beta1DeploymentSpec };
