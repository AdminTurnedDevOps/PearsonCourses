import { IIoK8sApiCoreV1Pod } from "./Pod";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PodList is a list of Pods.
 */
export interface IPodList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * List of pods. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md
     */
    "items": Array<IIoK8sApiCoreV1Pod>;
    "kind": "PodList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * PodList is a list of Pods.
 */
export declare class PodList extends Model<IPodList> implements IPodList {
    "apiVersion": IPodList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1Pod>;
    "kind": IPodList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IPodList["apiVersion"];
    static kind: IPodList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPodList>;
    constructor(data?: ModelData<IPodList>);
}
export { IPodList as IIoK8sApiCoreV1PodList, PodList as IoK8sApiCoreV1PodList };
