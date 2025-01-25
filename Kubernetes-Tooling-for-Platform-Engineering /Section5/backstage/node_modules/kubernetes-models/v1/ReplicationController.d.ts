import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1ReplicationControllerSpec } from "./ReplicationControllerSpec";
import { IIoK8sApiCoreV1ReplicationControllerStatus } from "./ReplicationControllerStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ReplicationController represents the configuration of a replication controller.
 */
export interface IReplicationController extends TypeMeta {
    "apiVersion": "v1";
    "kind": "ReplicationController";
    /**
     * If the Labels of a ReplicationController are empty, they are defaulted to be the same as the Pod(s) that the replication controller manages. Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec defines the specification of the desired behavior of the replication controller. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiCoreV1ReplicationControllerSpec;
    /**
     * Status is the most recently observed status of the replication controller. This data may be out of date by some window of time. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "status"?: IIoK8sApiCoreV1ReplicationControllerStatus;
}
/**
 * ReplicationController represents the configuration of a replication controller.
 */
export declare class ReplicationController extends Model<IReplicationController> implements IReplicationController {
    "apiVersion": IReplicationController["apiVersion"];
    "kind": IReplicationController["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiCoreV1ReplicationControllerSpec;
    "status"?: IIoK8sApiCoreV1ReplicationControllerStatus;
    static apiVersion: IReplicationController["apiVersion"];
    static kind: IReplicationController["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IReplicationController>;
    constructor(data?: ModelData<IReplicationController>);
}
export { IReplicationController as IIoK8sApiCoreV1ReplicationController, ReplicationController as IoK8sApiCoreV1ReplicationController };
