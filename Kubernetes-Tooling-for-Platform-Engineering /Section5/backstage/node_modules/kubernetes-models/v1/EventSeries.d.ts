import { IIoK8sApimachineryPkgApisMetaV1MicroTime } from "@kubernetes-models/apimachinery/apis/meta/v1/MicroTime";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time.
 */
export interface IEventSeries {
    /**
     * Number of occurrences in this series up to the last heartbeat time
     */
    "count"?: number;
    /**
     * Time of the last occurrence observed
     */
    "lastObservedTime"?: IIoK8sApimachineryPkgApisMetaV1MicroTime;
}
/**
 * EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time.
 */
export declare class EventSeries extends Model<IEventSeries> implements IEventSeries {
    "count"?: number;
    "lastObservedTime"?: IIoK8sApimachineryPkgApisMetaV1MicroTime;
    constructor(data?: ModelData<IEventSeries>);
}
export { IEventSeries as IIoK8sApiCoreV1EventSeries, EventSeries as IoK8sApiCoreV1EventSeries };
