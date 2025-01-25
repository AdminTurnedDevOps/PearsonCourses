import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionSpec } from "./CustomResourceDefinitionSpec";
import { IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionStatus } from "./CustomResourceDefinitionStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * CustomResourceDefinition represents a resource that should be exposed on the API server.  Its name MUST be in the format <.spec.name>.<.spec.group>. Deprecated in v1.16, planned for removal in v1.22. Use apiextensions.k8s.io/v1 CustomResourceDefinition instead.
 * @deprecated
 */
export interface ICustomResourceDefinition extends TypeMeta {
    "apiVersion": "apiextensions.k8s.io/v1beta1";
    "kind": "CustomResourceDefinition";
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * spec describes how the user wants the resources to appear
     */
    "spec": IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionSpec;
    /**
     * status indicates the actual state of the CustomResourceDefinition
     */
    "status"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionStatus;
}
/**
 * CustomResourceDefinition represents a resource that should be exposed on the API server.  Its name MUST be in the format <.spec.name>.<.spec.group>. Deprecated in v1.16, planned for removal in v1.22. Use apiextensions.k8s.io/v1 CustomResourceDefinition instead.
 * @deprecated
 */
export declare class CustomResourceDefinition extends Model<ICustomResourceDefinition> implements ICustomResourceDefinition {
    "apiVersion": ICustomResourceDefinition["apiVersion"];
    "kind": ICustomResourceDefinition["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec": IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionSpec;
    "status"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionStatus;
    static apiVersion: ICustomResourceDefinition["apiVersion"];
    static kind: ICustomResourceDefinition["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICustomResourceDefinition>;
    constructor(data?: ModelData<ICustomResourceDefinition>);
}
export { ICustomResourceDefinition as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinition, CustomResourceDefinition as IoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinition };
