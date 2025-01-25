import { IIoK8sApiAppsV1StatefulSet } from "./StatefulSet";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * StatefulSetList is a collection of StatefulSets.
 */
export interface IStatefulSetList extends TypeMeta {
    "apiVersion": "apps/v1";
    /**
     * Items is the list of stateful sets.
     */
    "items": Array<IIoK8sApiAppsV1StatefulSet>;
    "kind": "StatefulSetList";
    /**
     * Standard list's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * StatefulSetList is a collection of StatefulSets.
 */
export declare class StatefulSetList extends Model<IStatefulSetList> implements IStatefulSetList {
    "apiVersion": IStatefulSetList["apiVersion"];
    "items": Array<IIoK8sApiAppsV1StatefulSet>;
    "kind": IStatefulSetList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IStatefulSetList["apiVersion"];
    static kind: IStatefulSetList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IStatefulSetList>;
    constructor(data?: ModelData<IStatefulSetList>);
}
export { IStatefulSetList as IIoK8sApiAppsV1StatefulSetList, StatefulSetList as IoK8sApiAppsV1StatefulSetList };
