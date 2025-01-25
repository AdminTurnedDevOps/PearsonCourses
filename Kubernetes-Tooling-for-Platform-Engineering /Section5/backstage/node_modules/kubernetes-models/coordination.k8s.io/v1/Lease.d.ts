import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoordinationV1LeaseSpec } from "./LeaseSpec";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Lease defines a lease concept.
 */
export interface ILease extends TypeMeta {
    "apiVersion": "coordination.k8s.io/v1";
    "kind": "Lease";
    /**
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * spec contains the specification of the Lease. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    "spec"?: IIoK8sApiCoordinationV1LeaseSpec;
}
/**
 * Lease defines a lease concept.
 */
export declare class Lease extends Model<ILease> implements ILease {
    "apiVersion": ILease["apiVersion"];
    "kind": ILease["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec"?: IIoK8sApiCoordinationV1LeaseSpec;
    static apiVersion: ILease["apiVersion"];
    static kind: ILease["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ILease>;
    constructor(data?: ModelData<ILease>);
}
export { ILease as IIoK8sApiCoordinationV1Lease, Lease as IoK8sApiCoordinationV1Lease };
