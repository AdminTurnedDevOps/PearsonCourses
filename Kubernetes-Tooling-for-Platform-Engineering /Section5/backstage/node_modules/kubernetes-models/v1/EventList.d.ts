import { IIoK8sApiCoreV1Event } from "./Event";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * EventList is a list of events.
 */
export interface IEventList extends TypeMeta {
    "apiVersion": "v1";
    /**
     * List of events
     */
    "items": Array<IIoK8sApiCoreV1Event>;
    "kind": "EventList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * EventList is a list of events.
 */
export declare class EventList extends Model<IEventList> implements IEventList {
    "apiVersion": IEventList["apiVersion"];
    "items": Array<IIoK8sApiCoreV1Event>;
    "kind": IEventList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IEventList["apiVersion"];
    static kind: IEventList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IEventList>;
    constructor(data?: ModelData<IEventList>);
}
export { IEventList as IIoK8sApiCoreV1EventList, EventList as IoK8sApiCoreV1EventList };
