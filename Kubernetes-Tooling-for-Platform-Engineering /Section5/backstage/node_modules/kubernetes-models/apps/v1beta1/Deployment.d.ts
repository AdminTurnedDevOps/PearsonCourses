import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAppsV1beta1DeploymentSpec } from "./DeploymentSpec";
import { IIoK8sApiAppsV1beta1DeploymentStatus } from "./DeploymentStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * DEPRECATED - This group version of Deployment is deprecated by apps/v1beta2/Deployment. See the release notes for more information. Deployment enables declarative updates for Pods and ReplicaSets.
 * @deprecated
 */
export interface IDeployment extends TypeMeta {
    "apiVersion": "apps/v1beta1";
    "kind": "Deployment";
    /**
     * Standard object metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Specification of the desired behavior of the Deployment.
     */
    "spec"?: IIoK8sApiAppsV1beta1DeploymentSpec;
    /**
     * Most recently observed status of the Deployment.
     */
    "status"?: IIoK8sApiAppsV1beta1DeploymentStatus;
}
/**
 * DEPRECATED - This group version of Deployment is deprecated by apps/v1beta2/Deployment. See the release notes for more information. Deployment enables declarative updates for Pods and ReplicaSets.
 * @deprecated
 */
export declare class Deployment extends Model<IDeployment> implements IDeployment {
    "apiVersion": IDeployment["apiVersion"];
    "kind": IDeployment["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiAppsV1beta1DeploymentSpec;
    "status"?: IIoK8sApiAppsV1beta1DeploymentStatus;
    static apiVersion: IDeployment["apiVersion"];
    static kind: IDeployment["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IDeployment>;
    constructor(data?: ModelData<IDeployment>);
}
export { IDeployment as IIoK8sApiAppsV1beta1Deployment, Deployment as IoK8sApiAppsV1beta1Deployment };
