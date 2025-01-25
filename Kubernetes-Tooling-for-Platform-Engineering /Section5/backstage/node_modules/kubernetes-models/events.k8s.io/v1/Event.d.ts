import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { IIoK8sApiCoreV1EventSource } from "../../v1/EventSource";
import { IIoK8sApimachineryPkgApisMetaV1MicroTime } from "@kubernetes-models/apimachinery/apis/meta/v1/MicroTime";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1ObjectReference } from "../../v1/ObjectReference";
import { IIoK8sApiEventsV1EventSeries } from "./EventSeries";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Event is a report of an event somewhere in the cluster. It generally denotes some state change in the system. Events have a limited retention time and triggers and messages may evolve with time.  Event consumers should not rely on the timing of an event with a given Reason reflecting a consistent underlying trigger, or the continued existence of events with that Reason.  Events should be treated as informative, best-effort, supplemental data.
 */
export interface IEvent extends TypeMeta {
    /**
     * action is what action was taken/failed regarding to the regarding object. It is machine-readable. This field cannot be empty for new Events and it can have at most 128 characters.
     */
    "action"?: string;
    "apiVersion": "events.k8s.io/v1";
    /**
     * deprecatedCount is the deprecated field assuring backward compatibility with core.v1 Event type.
     */
    "deprecatedCount"?: number;
    /**
     * deprecatedFirstTimestamp is the deprecated field assuring backward compatibility with core.v1 Event type.
     */
    "deprecatedFirstTimestamp"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * deprecatedLastTimestamp is the deprecated field assuring backward compatibility with core.v1 Event type.
     */
    "deprecatedLastTimestamp"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * deprecatedSource is the deprecated field assuring backward compatibility with core.v1 Event type.
     */
    "deprecatedSource"?: IIoK8sApiCoreV1EventSource;
    /**
     * eventTime is the time when this Event was first observed. It is required.
     */
    "eventTime": IIoK8sApimachineryPkgApisMetaV1MicroTime;
    "kind": "Event";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * note is a human-readable description of the status of this operation. Maximal length of the note is 1kB, but libraries should be prepared to handle values up to 64kB.
     */
    "note"?: string;
    /**
     * reason is why the action was taken. It is human-readable. This field cannot be empty for new Events and it can have at most 128 characters.
     */
    "reason"?: string;
    /**
     * regarding contains the object this Event is about. In most cases it's an Object reporting controller implements, e.g. ReplicaSetController implements ReplicaSets and this event is emitted because it acts on some changes in a ReplicaSet object.
     */
    "regarding"?: IIoK8sApiCoreV1ObjectReference;
    /**
     * related is the optional secondary object for more complex actions. E.g. when regarding object triggers a creation or deletion of related object.
     */
    "related"?: IIoK8sApiCoreV1ObjectReference;
    /**
     * reportingController is the name of the controller that emitted this Event, e.g. `kubernetes.io/kubelet`. This field cannot be empty for new Events.
     */
    "reportingController"?: string;
    /**
     * reportingInstance is the ID of the controller instance, e.g. `kubelet-xyzf`. This field cannot be empty for new Events and it can have at most 128 characters.
     */
    "reportingInstance"?: string;
    /**
     * series is data about the Event series this event represents or nil if it's a singleton Event.
     */
    "series"?: IIoK8sApiEventsV1EventSeries;
    /**
     * type is the type of this event (Normal, Warning), new types could be added in the future. It is machine-readable. This field cannot be empty for new Events.
     */
    "type"?: string;
}
/**
 * Event is a report of an event somewhere in the cluster. It generally denotes some state change in the system. Events have a limited retention time and triggers and messages may evolve with time.  Event consumers should not rely on the timing of an event with a given Reason reflecting a consistent underlying trigger, or the continued existence of events with that Reason.  Events should be treated as informative, best-effort, supplemental data.
 */
export declare class Event extends Model<IEvent> implements IEvent {
    "action"?: string;
    "apiVersion": IEvent["apiVersion"];
    "deprecatedCount"?: number;
    "deprecatedFirstTimestamp"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "deprecatedLastTimestamp"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "deprecatedSource"?: IIoK8sApiCoreV1EventSource;
    "eventTime": IIoK8sApimachineryPkgApisMetaV1MicroTime;
    "kind": IEvent["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "note"?: string;
    "reason"?: string;
    "regarding"?: IIoK8sApiCoreV1ObjectReference;
    "related"?: IIoK8sApiCoreV1ObjectReference;
    "reportingController"?: string;
    "reportingInstance"?: string;
    "series"?: IIoK8sApiEventsV1EventSeries;
    "type"?: string;
    static apiVersion: IEvent["apiVersion"];
    static kind: IEvent["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IEvent>;
    constructor(data?: ModelData<IEvent>);
}
export { IEvent as IIoK8sApiEventsV1Event, Event as IoK8sApiEventsV1Event };
