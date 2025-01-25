import { IIoK8sApimachineryPkgApisMetaV1MicroTime } from "@kubernetes-models/apimachinery/apis/meta/v1/MicroTime";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time. How often to update the EventSeries is up to the event reporters. The default event reporter in "k8s.io/client-go/tools/events/event_broadcaster.go" shows how this struct is updated on heartbeats and can guide customized reporter implementations.
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
 * EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time. How often to update the EventSeries is up to the event reporters. The default event reporter in "k8s.io/client-go/tools/events/event_broadcaster.go" shows how this struct is updated on heartbeats and can guide customized reporter implementations.
 */
export declare class EventSeries extends Model<IEventSeries> implements IEventSeries {
    "count": number;
    "lastObservedTime": IIoK8sApimachineryPkgApisMetaV1MicroTime;
    constructor(data?: ModelData<IEventSeries>);
}
export { IEventSeries as IIoK8sApiEventsV1EventSeries, EventSeries as IoK8sApiEventsV1EventSeries };
