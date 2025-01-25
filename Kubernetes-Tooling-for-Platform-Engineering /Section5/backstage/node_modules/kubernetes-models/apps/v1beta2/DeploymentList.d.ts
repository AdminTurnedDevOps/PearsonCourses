import { IIoK8sApiAppsV1beta2Deployment } from "./Deployment";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * DeploymentList is a list of Deployments.
 */
export interface IDeploymentList extends TypeMeta {
    "apiVersion": "apps/v1beta2";
    /**
     * Items is the list of Deployments.
     */
    "items": Array<IIoK8sApiAppsV1beta2Deployment>;
    "kind": "DeploymentList";
    /**
     * Standard list metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * DeploymentList is a list of Deployments.
 */
export declare class DeploymentList extends Model<IDeploymentList> implements IDeploymentList {
    "apiVersion": IDeploymentList["apiVersion"];
    "items": Array<IIoK8sApiAppsV1beta2Deployment>;
    "kind": IDeploymentList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IDeploymentList["apiVersion"];
    static kind: IDeploymentList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IDeploymentList>;
    constructor(data?: ModelData<IDeploymentList>);
}
export { IDeploymentList as IIoK8sApiAppsV1beta2DeploymentList, DeploymentList as IoK8sApiAppsV1beta2DeploymentList };
