import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NamespaceSpec describes the attributes on a Namespace.
 */
export interface INamespaceSpec {
    /**
     * Finalizers is an opaque list of values that must be empty to permanently remove object from storage. More info: https://kubernetes.io/docs/tasks/administer-cluster/namespaces/
     */
    "finalizers"?: Array<string>;
}
/**
 * NamespaceSpec describes the attributes on a Namespace.
 */
export declare class NamespaceSpec extends Model<INamespaceSpec> implements INamespaceSpec {
    "finalizers"?: Array<string>;
    constructor(data?: ModelData<INamespaceSpec>);
}
export { INamespaceSpec as IIoK8sApiCoreV1NamespaceSpec, NamespaceSpec as IoK8sApiCoreV1NamespaceSpec };
