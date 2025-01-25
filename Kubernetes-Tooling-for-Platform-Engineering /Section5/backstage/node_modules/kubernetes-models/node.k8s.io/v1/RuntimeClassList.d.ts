import { IIoK8sApiNodeV1RuntimeClass } from "./RuntimeClass";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * RuntimeClassList is a list of RuntimeClass objects.
 */
export interface IRuntimeClassList extends TypeMeta {
    "apiVersion": "node.k8s.io/v1";
    /**
     * items is a list of schema objects.
     */
    "items": Array<IIoK8sApiNodeV1RuntimeClass>;
    "kind": "RuntimeClassList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * RuntimeClassList is a list of RuntimeClass objects.
 */
export declare class RuntimeClassList extends Model<IRuntimeClassList> implements IRuntimeClassList {
    "apiVersion": IRuntimeClassList["apiVersion"];
    "items": Array<IIoK8sApiNodeV1RuntimeClass>;
    "kind": IRuntimeClassList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IRuntimeClassList["apiVersion"];
    static kind: IRuntimeClassList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IRuntimeClassList>;
    constructor(data?: ModelData<IRuntimeClassList>);
}
export { IRuntimeClassList as IIoK8sApiNodeV1RuntimeClassList, RuntimeClassList as IoK8sApiNodeV1RuntimeClassList };
