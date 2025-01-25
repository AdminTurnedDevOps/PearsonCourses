import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1NamespaceSpec } from "./NamespaceSpec";
import { IIoK8sApiCoreV1NamespaceStatus } from "./NamespaceStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Namespace provides a scope for Names. Use of multiple namespaces is optional.
 */
export interface INamespace extends TypeMeta {
    "apiVersion": "v1";
    "kind": "Namespace";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Spec defines the behavior of the Namespace. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiCoreV1NamespaceSpec;
    /**
     * Status describes the current status of a Namespace. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "status"?: IIoK8sApiCoreV1NamespaceStatus;
}
/**
 * Namespace provides a scope for Names. Use of multiple namespaces is optional.
 */
export declare class Namespace extends Model<INamespace> implements INamespace {
    "apiVersion": INamespace["apiVersion"];
    "kind": INamespace["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiCoreV1NamespaceSpec;
    "status"?: IIoK8sApiCoreV1NamespaceStatus;
    static apiVersion: INamespace["apiVersion"];
    static kind: INamespace["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<INamespace>;
    constructor(data?: ModelData<INamespace>);
}
export { INamespace as IIoK8sApiCoreV1Namespace, Namespace as IoK8sApiCoreV1Namespace };
