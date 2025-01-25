import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1ObjectReference } from "./ObjectReference";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Binding ties one object to another; for example, a pod is bound to a node by a scheduler. Deprecated in 1.7, please use the bindings subresource of pods instead.
 * @deprecated
 */
export interface IBinding extends TypeMeta {
    "apiVersion": "v1";
    "kind": "Binding";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * The target object that you want to bind to the standard object.
     */
    "target": IIoK8sApiCoreV1ObjectReference;
}
/**
 * Binding ties one object to another; for example, a pod is bound to a node by a scheduler. Deprecated in 1.7, please use the bindings subresource of pods instead.
 * @deprecated
 */
export declare class Binding extends Model<IBinding> implements IBinding {
    "apiVersion": IBinding["apiVersion"];
    "kind": IBinding["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "target": IIoK8sApiCoreV1ObjectReference;
    static apiVersion: IBinding["apiVersion"];
    static kind: IBinding["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IBinding>;
    constructor(data?: ModelData<IBinding>);
}
export { IBinding as IIoK8sApiCoreV1Binding, Binding as IoK8sApiCoreV1Binding };
