import { IIoK8sApiExtensionsV1beta1RollbackConfig } from "./RollbackConfig";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * DEPRECATED. DeploymentRollback stores the information required to rollback a deployment.
 * @deprecated
 */
export interface IDeploymentRollback extends TypeMeta {
    "apiVersion": "extensions/v1beta1";
    "kind": "DeploymentRollback";
    /**
     * Required: This must match the Name of a deployment.
     */
    "name": string;
    /**
     * The config of this deployment rollback.
     */
    "rollbackTo": IIoK8sApiExtensionsV1beta1RollbackConfig;
    /**
     * The annotations to be updated to a deployment
     */
    "updatedAnnotations"?: {
        [key: string]: string;
    };
}
/**
 * DEPRECATED. DeploymentRollback stores the information required to rollback a deployment.
 * @deprecated
 */
export declare class DeploymentRollback extends Model<IDeploymentRollback> implements IDeploymentRollback {
    "apiVersion": IDeploymentRollback["apiVersion"];
    "kind": IDeploymentRollback["kind"];
    "name": string;
    "rollbackTo": IIoK8sApiExtensionsV1beta1RollbackConfig;
    "updatedAnnotations"?: {
        [key: string]: string;
    };
    static apiVersion: IDeploymentRollback["apiVersion"];
    static kind: IDeploymentRollback["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IDeploymentRollback>;
    constructor(data?: ModelData<IDeploymentRollback>);
}
export { IDeploymentRollback as IIoK8sApiExtensionsV1beta1DeploymentRollback, DeploymentRollback as IoK8sApiExtensionsV1beta1DeploymentRollback };
