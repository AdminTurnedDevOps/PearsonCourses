import { ModelData, Model } from "@kubernetes-models/base";
/**
 * UncountedTerminatedPods holds UIDs of Pods that have terminated but haven't been accounted in Job status counters.
 */
export interface IUncountedTerminatedPods {
    /**
     * failed holds UIDs of failed Pods.
     */
    "failed"?: Array<string>;
    /**
     * succeeded holds UIDs of succeeded Pods.
     */
    "succeeded"?: Array<string>;
}
/**
 * UncountedTerminatedPods holds UIDs of Pods that have terminated but haven't been accounted in Job status counters.
 */
export declare class UncountedTerminatedPods extends Model<IUncountedTerminatedPods> implements IUncountedTerminatedPods {
    "failed"?: Array<string>;
    "succeeded"?: Array<string>;
    constructor(data?: ModelData<IUncountedTerminatedPods>);
}
export { IUncountedTerminatedPods as IIoK8sApiBatchV1UncountedTerminatedPods, UncountedTerminatedPods as IoK8sApiBatchV1UncountedTerminatedPods };
