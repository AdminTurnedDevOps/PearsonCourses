import { IIoK8sApiCoreV1Namespace } from "./Namespace";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * NamespaceList is a list of Namespaces.
 */
export interface INamespaceList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * Items is the list of Namespace objects in the list. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
     */
    "items": Array<IIoK8sApiCoreV1Namespace>;
    "kind": "NamespaceList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * NamespaceList is a list of Namespaces.
 */
export declare class NamespaceList extends Model<INamespaceList> implements INamespaceList {
    "apiVersion": INamespaceList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1Namespace>;
    "kind": INamespaceList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: INamespaceList["apiVersion"];
    static kind: INamespaceList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<INamespaceList>;
    constructor(data?: ModelData<INamespaceList>);
}
export { INamespaceList as IIoK8sApiCoreV1NamespaceList, NamespaceList as IoK8sApiCoreV1NamespaceList };
