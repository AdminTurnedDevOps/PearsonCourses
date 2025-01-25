import { IIoK8sApiCoreV1Secret } from "./Secret";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * SecretList is a list of Secret.
 */
export interface ISecretList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * Items is a list of secret objects. More info: https://kubernetes.io/docs/concepts/configuration/secret
     */
    "items": Array<IIoK8sApiCoreV1Secret>;
    "kind": "SecretList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * SecretList is a list of Secret.
 */
export declare class SecretList extends Model<ISecretList> implements ISecretList {
    "apiVersion": ISecretList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1Secret>;
    "kind": ISecretList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: ISecretList["apiVersion"];
    static kind: ISecretList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ISecretList>;
    constructor(data?: ModelData<ISecretList>);
}
export { ISecretList as IIoK8sApiCoreV1SecretList, SecretList as IoK8sApiCoreV1SecretList };
