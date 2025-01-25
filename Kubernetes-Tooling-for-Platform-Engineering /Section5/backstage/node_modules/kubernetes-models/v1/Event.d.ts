import { IIoK8sApimachineryPkgApisMetaV1MicroTime } from "@kubernetes-models/apimachinery/apis/meta/v1/MicroTime";
import { IIoK8sApimachineryPkgApisMetaV1Time } from "@kubernetes-models/apimachinery/apis/meta/v1/Time";
import { IIoK8sApiCoreV1ObjectReference } from "./ObjectReference";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiCoreV1EventSeries } from "./EventSeries";
import { IIoK8sApiCoreV1EventSource } from "./EventSource";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * Event is a report of an event somewhere in the cluster.  Events have a limited retention time and triggers and messages may evolve with time.  Event consumers should not rely on the timing of an event with a given Reason reflecting a consistent underlying trigger, or the continued existence of events with that Reason.  Events should be treated as informative, best-effort, supplemental data.
 */
export interface IEvent extends TypeMeta {
    /**
     * What action was taken/failed regarding to the Regarding object.
     */
    "action"?: string;
    "apiVersion": "v1";
    /**
     * The number of times this event has occurred.
     */
    "count"?: number;
    /**
     * Time when this Event was first observed.
     */
    "eventTime"?: IIoK8sApimachineryPkgApisMetaV1MicroTime;
    /**
     * The time at which the event was first recorded. (Time of server receipt is in TypeMeta.)
     */
    "firstTimestamp"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * The object that this event is about.
     */
    "involvedObject": IIoK8sApiCoreV1ObjectReference;
    "kind": "Event";
    /**
     * The time at which the most recent occurrence of this event was recorded.
     */
    "lastTimestamp"?: IIoK8sApimachineryPkgApisMetaV1Time;
    /**
     * A human-readable description of the status of this operation.
     */
    "message"?: string;
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata": IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * This should be a short, machine understandable string that gives the reason for the transition into the object's current status.
     */
    "reason"?: string;
    /**
     * Optional secondary object for more complex actions.
     */
    "related"?: IIoK8sApiCoreV1ObjectReference;
    /**
     * Name of the controller that emitted this Event, e.g. `kubernetes.io/kubelet`.
     */
    "reportingComponent"?: string;
    /**
     * ID of the controller instance, e.g. `kubelet-xyzf`.
     */
    "reportingInstance"?: string;
    /**
     * Data about the Event series this event represents or nil if it's a singleton Event.
     */
    "series"?: IIoK8sApiCoreV1EventSeries;
    /**
     * The component reporting this event. Should be a short machine understandable string.
     */
    "source"?: IIoK8sApiCoreV1EventSource;
    /**
     * Type of this event (Normal, Warning), new types could be added in the future
     */
    "type"?: string;
}
/**
 * Event is a report of an event somewhere in the cluster.  Events have a limited retention time and triggers and messages may evolve with time.  Event consumers should not rely on the timing of an event with a given Reason reflecting a consistent underlying trigger, or the continued existence of events with that Reason.  Events should be treated as informative, best-effort, supplemental data.
 */
export declare class Event extends Model<IEvent> implements IEvent {
    "action"?: string;
    "apiVersion": IEvent["apiVersion"];
    "count"?: number;
    "eventTime"?: IIoK8sApimachineryPkgApisMetaV1MicroTime;
    "firstTimestamp"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "involvedObject": IIoK8sApiCoreV1ObjectReference;
    "kind": IEvent["kind"];
    "lastTimestamp"?: IIoK8sApimachineryPkgApisMetaV1Time;
    "message"?: string;
    "metadata": IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "reason"?: string;
    "related"?: IIoK8sApiCoreV1ObjectReference;
    "reportingComponent"?: string;
    "reportingInstance"?: string;
    "series"?: IIoK8sApiCoreV1EventSeries;
    "source"?: IIoK8sApiCoreV1EventSource;
    "type"?: string;
    static apiVersion: IEvent["apiVersion"];
    static kind: IEvent["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IEvent>;
    constructor(data?: ModelData<IEvent>);
}
export { IEvent as IIoK8sApiCoreV1Event, Event as IoK8sApiCoreV1Event };
