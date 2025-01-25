import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAppsV1DeploymentSpec } from "./DeploymentSpec";
import { IIoK8sApiAppsV1DeploymentStatus } from "./DeploymentStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Deployment enables declarative updates for Pods and ReplicaSets.
 */
export interface IDeployment extends TypeMeta {
    "apiVersion": "apps/v1";
    "kind": "Deployment";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Specification of the desired behavior of the Deployment.
     */
    "spec"?: IIoK8sApiAppsV1DeploymentSpec;
    /**
     * Most recently observed status of the Deployment.
     */
    "status"?: IIoK8sApiAppsV1DeploymentStatus;
}
/**
 * Deployment enables declarative updates for Pods and ReplicaSets.
 */
export declare class Deployment extends Model<IDeployment> implements IDeployment {
    "apiVersion": IDeployment["apiVersion"];
    "kind": IDeployment["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiAppsV1DeploymentSpec;
    "status"?: IIoK8sApiAppsV1DeploymentStatus;
    static apiVersion: IDeployment["apiVersion"];
    static kind: IDeployment["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IDeployment>;
    constructor(data?: ModelData<IDeployment>);
}
export { IDeployment as IIoK8sApiAppsV1Deployment, Deployment as IoK8sApiAppsV1Deployment };
