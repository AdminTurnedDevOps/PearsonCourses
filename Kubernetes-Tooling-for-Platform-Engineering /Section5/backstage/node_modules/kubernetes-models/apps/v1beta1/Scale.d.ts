import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiAppsV1beta1ScaleSpec } from "./ScaleSpec";
import { IIoK8sApiAppsV1beta1ScaleStatus } from "./ScaleStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Scale represents a scaling request for a resource.
 */
export interface IScale extends TypeMeta {
    "apiVersion": "apps/v1beta1";
    "kind": "Scale";
    /**
     * Standard object metadata; More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * defines the behavior of the scale. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status.
     */
    "spec"?: IIoK8sApiAppsV1beta1ScaleSpec;
    /**
     * current status of the scale. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status. Read-only.
     */
    "status"?: IIoK8sApiAppsV1beta1ScaleStatus;
}
/**
 * Scale represents a scaling request for a resource.
 */
export declare class Scale extends Model<IScale> implements IScale {
    "apiVersion": IScale["apiVersion"];
    "kind": IScale["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiAppsV1beta1ScaleSpec;
    "status"?: IIoK8sApiAppsV1beta1ScaleStatus;
    static apiVersion: IScale["apiVersion"];
    static kind: IScale["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IScale>;
    constructor(data?: ModelData<IScale>);
}
export { IScale as IIoK8sApiAppsV1beta1Scale, Scale as IoK8sApiAppsV1beta1Scale };
