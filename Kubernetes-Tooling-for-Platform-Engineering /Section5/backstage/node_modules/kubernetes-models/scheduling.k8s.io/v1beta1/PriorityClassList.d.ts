import { IIoK8sApiSchedulingV1beta1PriorityClass } from "./PriorityClass";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * PriorityClassList is a collection of priority classes.
 */
export interface IPriorityClassList extends TypeMeta {
    "apiVersion": "scheduling.k8s.io/v1beta1";
    /**
     * items is the list of PriorityClasses
     */
    "items": Array<IIoK8sApiSchedulingV1beta1PriorityClass>;
    "kind": "PriorityClassList";
    /**
     * Standard list metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * PriorityClassList is a collection of priority classes.
 */
export declare class PriorityClassList extends Model<IPriorityClassList> implements IPriorityClassList {
    "apiVersion": IPriorityClassList["apiVersion"];
    "items": Array<IIoK8sApiSchedulingV1beta1PriorityClass>;
    "kind": IPriorityClassList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IPriorityClassList["apiVersion"];
    static kind: IPriorityClassList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IPriorityClassList>;
    constructor(data?: ModelData<IPriorityClassList>);
}
export { IPriorityClassList as IIoK8sApiSchedulingV1beta1PriorityClassList, PriorityClassList as IoK8sApiSchedulingV1beta1PriorityClassList };
