import { IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinition } from "./CustomResourceDefinition";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * CustomResourceDefinitionList is a list of CustomResourceDefinition objects.
 */
export interface ICustomResourceDefinitionList extends TypeMeta {
    "apiVersion": "apiextensions.k8s.io/v1beta1";
    /**
     * items list individual CustomResourceDefinition objects
     */
    "items": Array<IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinition>;
    "kind": "CustomResourceDefinitionList";
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * CustomResourceDefinitionList is a list of CustomResourceDefinition objects.
 */
export declare class CustomResourceDefinitionList extends Model<ICustomResourceDefinitionList> implements ICustomResourceDefinitionList {
    "apiVersion": ICustomResourceDefinitionList["apiVersion"];
    "items": Array<IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinition>;
    "kind": ICustomResourceDefinitionList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: ICustomResourceDefinitionList["apiVersion"];
    static kind: ICustomResourceDefinitionList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICustomResourceDefinitionList>;
    constructor(data?: ModelData<ICustomResourceDefinitionList>);
}
export { ICustomResourceDefinitionList as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionList, CustomResourceDefinitionList as IoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionList };
