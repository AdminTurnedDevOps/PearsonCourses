import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * DeploymentCondition describes the state of a deployment at a certain point.
 */
export interface IDeploymentCondition {
    /**
     * Last time the condition transitioned from one status to another.
     */
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * The last time this condition was updated.
     */
    "lastUpdateTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * A human readable message indicating details about the transition.
     */
    "message"?: string;
    /**
     * The reason for the condition's last transition.
     */
    "reason"?: string;
    /**
     * Status of the condition, one of True, False, Unknown.
     */
    "status": string;
    /**
     * Type of deployment condition.
     */
    "type": string;
}
/**
 * DeploymentCondition describes the state of a deployment at a certain point.
 */
export declare class DeploymentCondition extends Model<IDeploymentCondition> implements IDeploymentCondition {
    "lastTransitionTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "lastUpdateTime"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "reason"?: string;
    "status": string;
    "type": string;
    constructor(data?: ModelData<IDeploymentCondition>);
}
export { IDeploymentCondition as IIoK8sApiAppsV1beta1DeploymentCondition, DeploymentCondition as IoK8sApiAppsV1beta1DeploymentCondition };
