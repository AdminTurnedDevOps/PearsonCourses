import { ModelData, Model } from "@kubernetes-models/base";
/**
 * IngressClassParametersReference identifies an API object. This can be used to specify a cluster or namespace-scoped resource.
 */
export interface IIngressClassParametersReference {
    /**
     * APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.
     */
    "apiGroup"?: string;
    /**
     * Kind is the type of resource being referenced.
     */
    "kind": string;
    /**
     * Name is the name of resource being referenced.
     */
    "name": string;
    /**
     * Namespace is the namespace of the resource being referenced. This field is required when scope is set to "Namespace" and must be unset when scope is set to "Cluster".
     */
    "namespace"?: string;
    /**
     * Scope represents if this refers to a cluster or namespace scoped resource. This may be set to "Cluster" (default) or "Namespace". Field can be enabled with IngressClassNamespacedParams feature gate.
     */
    "scope"?: string;
}
/**
 * IngressClassParametersReference identifies an API object. This can be used to specify a cluster or namespace-scoped resource.
 */
export declare class IngressClassParametersReference extends Model<IIngressClassParametersReference> implements IIngressClassParametersReference {
    "apiGroup"?: string;
    "kind": IIngressClassParametersReference["kind"];
    "name": string;
    "namespace"?: string;
    "scope"?: string;
    constructor(data?: ModelData<IIngressClassParametersReference>);
}
export { IIngressClassParametersReference as IIoK8sApiNetworkingV1beta1IngressClassParametersReference, IngressClassParametersReference as IoK8sApiNetworkingV1beta1IngressClassParametersReference };
