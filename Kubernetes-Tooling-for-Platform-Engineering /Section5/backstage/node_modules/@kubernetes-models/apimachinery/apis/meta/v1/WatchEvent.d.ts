import { IIoK8sApimachineryPkgRuntimeRawExtension } from "../../../runtime/RawExtension";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Event represents a single event to a watched resource.
 */
export interface IWatchEvent {
    /**
     * Object is:
     *  \* If Type is Added or Modified: the new state of the object.
     *  \* If Type is Deleted: the state of the object immediately before deletion.
     *  \* If Type is Error: \*Status is recommended; other types may make sense
     *    depending on context.
     */
    "object": IIoK8sApimachineryPkgRuntimeRawExtension;
    "type": string;
}
/**
 * Event represents a single event to a watched resource.
 */
export declare class WatchEvent extends Model<IWatchEvent> implements IWatchEvent {
    "object": IIoK8sApimachineryPkgRuntimeRawExtension;
    "type": string;
    constructor(data?: ModelData<IWatchEvent>);
}
export { IWatchEvent as IIoK8sApimachineryPkgApisMetaV1WatchEvent, WatchEvent as IoK8sApimachineryPkgApisMetaV1WatchEvent };
