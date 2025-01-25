import { ModelData, Model } from "@kubernetes-models/base";
/**
 * EventSource contains information for an event.
 */
export interface IEventSource {
    /**
     * Component from which the event is generated.
     */
    "component"?: string;
    /**
     * Node name on which the event is generated.
     */
    "host"?: string;
}
/**
 * EventSource contains information for an event.
 */
export declare class EventSource extends Model<IEventSource> implements IEventSource {
    "component"?: string;
    "host"?: string;
    constructor(data?: ModelData<IEventSource>);
}
export { IEventSource as IIoK8sApiCoreV1EventSource, EventSource as IoK8sApiCoreV1EventSource };
