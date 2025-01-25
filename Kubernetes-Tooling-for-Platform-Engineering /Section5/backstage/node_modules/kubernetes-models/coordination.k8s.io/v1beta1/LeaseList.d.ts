import { IIoK8sApiCoordinationV1beta1Lease } from "./Lease";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * LeaseList is a list of Lease objects.
 */
export interface ILeaseList extends TypeMeta {
    "apiVersion": "coordination.k8s.io/v1beta1";
    /**
     * Items is a list of schema objects.
     */
    "items": Array<IIoK8sApiCoordinationV1beta1Lease>;
    "kind": "LeaseList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * LeaseList is a list of Lease objects.
 */
export declare class LeaseList extends Model<ILeaseList> implements ILeaseList {
    "apiVersion": ILeaseList["apiVersion"];
    "items": Array<IIoK8sApiCoordinationV1beta1Lease>;
    "kind": ILeaseList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: ILeaseList["apiVersion"];
    static kind: ILeaseList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ILeaseList>;
    constructor(data?: ModelData<ILeaseList>);
}
export { ILeaseList as IIoK8sApiCoordinationV1beta1LeaseList, LeaseList as IoK8sApiCoordinationV1beta1LeaseList };
