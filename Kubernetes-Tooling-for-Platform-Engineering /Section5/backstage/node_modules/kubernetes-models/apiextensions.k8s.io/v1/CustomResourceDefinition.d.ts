import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceDefinitionSpec } from "./CustomResourceDefinitionSpec";
import { IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceDefinitionStatus } from "./CustomResourceDefinitionStatus";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * CustomResourceDefinition represents a resource that should be exposed on the API server.  Its name MUST be in the format <.spec.name>.<.spec.group>.
 */
export interface ICustomResourceDefinition extends TypeMeta {
    "apiVersion": "apiextensions.k8s.io/v1";
    "kind": "CustomResourceDefinition";
    /**
     * Standard object's metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * spec describes how the user wants the resources to appear
     */
    "spec": IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceDefinitionSpec;
    /**
     * status indicates the actual state of the CustomResourceDefinition
     */
    "status"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceDefinitionStatus;
}
/**
 * CustomResourceDefinition represents a resource that should be exposed on the API server.  Its name MUST be in the format <.spec.name>.<.spec.group>.
 */
export declare class CustomResourceDefinition extends Model<ICustomResourceDefinition> implements ICustomResourceDefinition {
    "apiVersion": ICustomResourceDefinition["apiVersion"];
    "kind": ICustomResourceDefinition["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec": IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceDefinitionSpec;
    "status"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceDefinitionStatus;
    static apiVersion: ICustomResourceDefinition["apiVersion"];
    static kind: ICustomResourceDefinition["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICustomResourceDefinition>;
    constructor(data?: ModelData<ICustomResourceDefinition>);
}
export { ICustomResourceDefinition as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceDefinition, CustomResourceDefinition as IoK8sApiextensionsApiserverPkgApisApiextensionsV1CustomResourceDefinition };
