import { IIoK8sApimachineryPkgApisMetaV1MicroTime } from "@kubernetes-models/apimachinery/apis/meta/v1/MicroTime";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time.
 */
export interface IEventSeries {
    /**
     * count is the number of occurrences in this series up to the last heartbeat time.
     */
    "count": number;
    /**
     * lastObservedTime is the time when last Event from the series was seen before last heartbeat.
     */
    "lastObservedTime": IIoK8sApimachineryPkgApisMetaV1MicroTime;
}
/**
 * EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time.
 */
export declare class EventSeries extends Model<IEventSeries> implements IEventSeries {
    "count": number;
    "lastObservedTime": IIoK8sApimachineryPkgApisMetaV1MicroTime;
    constructor(data?: ModelData<IEventSeries>);
}
export { IEventSeries as IIoK8sApiEventsV1beta1EventSeries, EventSeries as IoK8sApiEventsV1beta1EventSeries };
