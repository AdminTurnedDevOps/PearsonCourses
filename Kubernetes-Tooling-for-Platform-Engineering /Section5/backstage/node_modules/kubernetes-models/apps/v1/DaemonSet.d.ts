import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAppsV1DaemonSetSpec } from "./DaemonSetSpec";
import { IIoK8sApiAppsV1DaemonSetStatus } from "./DaemonSetStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * DaemonSet represents the configuration of a daemon set.
 */
export interface IDaemonSet extends TypeMeta {
    "apiVersion": "apps/v1";
    "kind": "DaemonSet";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * The desired behavior of this daemon set. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiAppsV1DaemonSetSpec;
    /**
     * The current status of this daemon set. This data may be out of date by some window of time. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "status"?: IIoK8sApiAppsV1DaemonSetStatus;
}
/**
 * DaemonSet represents the configuration of a daemon set.
 */
export declare class DaemonSet extends Model<IDaemonSet> implements IDaemonSet {
    "apiVersion": IDaemonSet["apiVersion"];
    "kind": IDaemonSet["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiAppsV1DaemonSetSpec;
    "status"?: IIoK8sApiAppsV1DaemonSetStatus;
    static apiVersion: IDaemonSet["apiVersion"];
    static kind: IDaemonSet["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IDaemonSet>;
    constructor(data?: ModelData<IDaemonSet>);
}
export { IDaemonSet as IIoK8sApiAppsV1DaemonSet, DaemonSet as IoK8sApiAppsV1DaemonSet };
