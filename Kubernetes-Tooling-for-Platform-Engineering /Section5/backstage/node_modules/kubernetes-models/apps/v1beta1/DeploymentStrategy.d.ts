import { IIoK8sApiAppsV1beta1RollingUpdateDeployment } from "./RollingUpdateDeployment";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * DeploymentStrategy describes how to replace existing pods with new ones.
 */
export interface IDeploymentStrategy {
    /**
     * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate.
     */
    "rollingUpdate"?: IIoK8sApiAppsV1beta1RollingUpdateDeployment;
    /**
     * Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
     */
    "type"?: string;
}
/**
 * DeploymentStrategy describes how to replace existing pods with new ones.
 */
export declare class DeploymentStrategy extends Model<IDeploymentStrategy> implements IDeploymentStrategy {
    "rollingUpdate"?: IIoK8sApiAppsV1beta1RollingUpdateDeployment;
    "type"?: string;
    constructor(data?: ModelData<IDeploymentStrategy>);
}
export { IDeploymentStrategy as IIoK8sApiAppsV1beta1DeploymentStrategy, DeploymentStrategy as IoK8sApiAppsV1beta1DeploymentStrategy };
