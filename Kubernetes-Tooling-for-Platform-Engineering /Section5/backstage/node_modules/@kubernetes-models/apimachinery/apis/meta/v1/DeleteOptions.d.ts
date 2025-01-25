import { IIoK8sApimachineryPkgApisMetaV1Preconditions } from "./Preconditions";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * DeleteOptions may be provided when deleting an API object.
 */
export interface IDeleteOptions {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     */
    "apiVersion"?: string;
    /**
     * When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     */
    "dryRun"?: Array<string>;
    /**
     * The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     */
    "gracePeriodSeconds"?: number;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "kind"?: string;
    /**
     * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the "orphan" finalizer will be added to/removed from the object's finalizers list. Either this field or PropagationPolicy may be set, but not both.
     */
    "orphanDependents"?: boolean;
    /**
     * Must be fulfilled before a deletion is carried out. If not possible, a 409 Conflict status will be returned.
     */
    "preconditions"?: IIoK8sApimachineryPkgApisMetaV1Preconditions;
    /**
     * Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: 'Orphan' - orphan the dependents; 'Background' - allow the garbage collector to delete the dependents in the background; 'Foreground' - a cascading policy that deletes all dependents in the foreground.
     */
    "propagationPolicy"?: string;
}
/**
 * DeleteOptions may be provided when deleting an API object.
 */
export declare class DeleteOptions extends Model<IDeleteOptions> implements IDeleteOptions {
    "apiVersion"?: IDeleteOptions["apiVersion"];
    "dryRun"?: Array<string>;
    "gracePeriodSeconds"?: number;
    "kind"?: IDeleteOptions["kind"];
    "orphanDependents"?: boolean;
    "preconditions"?: IIoK8sApimachineryPkgApisMetaV1Preconditions;
    "propagationPolicy"?: string;
    constructor(data?: ModelData<IDeleteOptions>);
}
export { IDeleteOptions as IIoK8sApimachineryPkgApisMetaV1DeleteOptions, DeleteOptions as IoK8sApimachineryPkgApisMetaV1DeleteOptions };
