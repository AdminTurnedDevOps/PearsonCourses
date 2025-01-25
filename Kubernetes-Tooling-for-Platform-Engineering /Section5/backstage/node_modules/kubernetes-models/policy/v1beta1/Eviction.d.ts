import { IIoK8sApimachineryPkgApisMetaV1DeleteOptions } from "@kubernetes-models/apimachinery/apis/meta/v1/DeleteOptions";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Eviction evicts a pod from its node subject to certain policies and safety constraints. This is a subresource of Pod.  A request to cause such an eviction is created by POSTing to .../pods/<pod name>/evictions.
 */
export interface IEviction extends TypeMeta {
    "apiVersion": "policy/v1beta1";
    /**
     * DeleteOptions may be provided
     */
    "deleteOptions"?: IIoK8sApimachineryPkgApisMetaV1DeleteOptions;
    "kind": "Eviction";
    /**
     * ObjectMeta describes the pod that is being evicted.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
}
/**
 * Eviction evicts a pod from its node subject to certain policies and safety constraints. This is a subresource of Pod.  A request to cause such an eviction is created by POSTing to .../pods/<pod name>/evictions.
 */
export declare class Eviction extends Model<IEviction> implements IEviction {
    "apiVersion": IEviction["apiVersion"];
    "deleteOptions"?: IIoK8sApimachineryPkgApisMetaV1DeleteOptions;
    "kind": IEviction["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    static apiVersion: IEviction["apiVersion"];
    static kind: IEviction["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IEviction>;
    constructor(data?: ModelData<IEviction>);
}
export { IEviction as IIoK8sApiPolicyV1beta1Eviction, Eviction as IoK8sApiPolicyV1beta1Eviction };
