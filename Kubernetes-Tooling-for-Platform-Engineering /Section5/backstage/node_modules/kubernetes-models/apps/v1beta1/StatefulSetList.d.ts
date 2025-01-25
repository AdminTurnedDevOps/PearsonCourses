import { IIoK8sApiAppsV1beta1StatefulSet } from "./StatefulSet";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * StatefulSetList is a collection of StatefulSets.
 */
export interface IStatefulSetList extends TypeMeta {
    "apiVersion": "apps/v1beta1";
    "items": Array<IIoK8sApiAppsV1beta1StatefulSet>;
    "kind": "StatefulSetList";
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * StatefulSetList is a collection of StatefulSets.
 */
export declare class StatefulSetList extends Model<IStatefulSetList> implements IStatefulSetList {
    "apiVersion": IStatefulSetList["apiVersion"];
    "items": Array<IIoK8sApiAppsV1beta1StatefulSet>;
    "kind": IStatefulSetList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IStatefulSetList["apiVersion"];
    static kind: IStatefulSetList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IStatefulSetList>;
    constructor(data?: ModelData<IStatefulSetList>);
}
export { IStatefulSetList as IIoK8sApiAppsV1beta1StatefulSetList, StatefulSetList as IoK8sApiAppsV1beta1StatefulSetList };
