import { ModelData, Model } from "@kubernetes-models/base";
/**
 * StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered.
 */
export interface IStatusCause {
    /**
     * The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.
     *
     * Examples:
     *   "name" - the field "name" on the current resource
     *   "items[0].name" - the field "name" on the first array entry in "items"
     */
    "field"?: string;
    /**
     * A human-readable description of the cause of the error.  This field may be presented as-is to a reader.
     */
    "message"?: string;
    /**
     * A machine-readable description of the cause of the error. If this value is empty there is no information available.
     */
    "reason"?: string;
}
/**
 * StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered.
 */
export declare class StatusCause extends Model<IStatusCause> implements IStatusCause {
    "field"?: string;
    "message"?: string;
    "reason"?: string;
    constructor(data?: ModelData<IStatusCause>);
}
export { IStatusCause as IIoK8sApimachineryPkgApisMetaV1StatusCause, StatusCause as IoK8sApimachineryPkgApisMetaV1StatusCause };
