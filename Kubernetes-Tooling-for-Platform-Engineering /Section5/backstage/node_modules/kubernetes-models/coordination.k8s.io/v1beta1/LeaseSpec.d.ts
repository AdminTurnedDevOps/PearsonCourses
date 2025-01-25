import { IIoK8sApimachineryPkgApisMetaV1MicroTime } from "@kubernetes-models/apimachinery/apis/meta/v1/MicroTime";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * LeaseSpec is a specification of a Lease.
 */
export interface ILeaseSpec {
    /**
     * acquireTime is a time when the current lease was acquired.
     */
    "acquireTime"?: IIoK8sApimachineryPkgApisMetaV1MicroTime;
    /**
     * holderIdentity contains the identity of the holder of a current lease.
     */
    "holderIdentity"?: string;
    /**
     * leaseDurationSeconds is a duration that candidates for a lease need to wait to force acquire it. This is measure against time of last observed RenewTime.
     */
    "leaseDurationSeconds"?: number;
    /**
     * leaseTransitions is the number of transitions of a lease between holders.
     */
    "leaseTransitions"?: number;
    /**
     * renewTime is a time when the current holder of a lease has last updated the lease.
     */
    "renewTime"?: IIoK8sApimachineryPkgApisMetaV1MicroTime;
}
/**
 * LeaseSpec is a specification of a Lease.
 */
export declare class LeaseSpec extends Model<ILeaseSpec> implements ILeaseSpec {
    "acquireTime"?: IIoK8sApimachineryPkgApisMetaV1MicroTime;
    "holderIdentity"?: string;
    "leaseDurationSeconds"?: number;
    "leaseTransitions"?: number;
    "renewTime"?: IIoK8sApimachineryPkgApisMetaV1MicroTime;
    constructor(data?: ModelData<ILeaseSpec>);
}
export { ILeaseSpec as IIoK8sApiCoordinationV1beta1LeaseSpec, LeaseSpec as IoK8sApiCoordinationV1beta1LeaseSpec };
