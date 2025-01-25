import { IIoK8sApiCoreV1LimitRange } from "./LimitRange";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * LimitRangeList is a list of LimitRange items.
 */
export interface ILimitRangeList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * Items is a list of LimitRange objects. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     */
    "items": Array<IIoK8sApiCoreV1LimitRange>;
    "kind": "LimitRangeList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * LimitRangeList is a list of LimitRange items.
 */
export declare class LimitRangeList extends Model<ILimitRangeList> implements ILimitRangeList {
    "apiVersion": ILimitRangeList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1LimitRange>;
    "kind": ILimitRangeList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: ILimitRangeList["apiVersion"];
    static kind: ILimitRangeList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ILimitRangeList>;
    constructor(data?: ModelData<ILimitRangeList>);
}
export { ILimitRangeList as IIoK8sApiCoreV1LimitRangeList, LimitRangeList as IoK8sApiCoreV1LimitRangeList };
