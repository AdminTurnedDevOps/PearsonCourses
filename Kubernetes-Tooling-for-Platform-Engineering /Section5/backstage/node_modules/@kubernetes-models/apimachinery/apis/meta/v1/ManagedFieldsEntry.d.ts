import { IIoK8sApimachineryPkgApisMetaV1FieldsV1 } from "./FieldsV1";
import { IIoK8sApimachineryPkgApisMetaV1Time } from "./Time";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.
 */
export interface IManagedFieldsEntry {
    /**
     * APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.
     */
    "apiVersion"?: string;
    /**
     * FieldsType is the discriminator for the different fields format and version. There is currently only one possible value: "FieldsV1"
     */
    "fieldsType"?: string;
    /**
     * FieldsV1 holds the first JSON version format as described in the "FieldsV1" type.
     */
    "fieldsV1"?: IIoK8sApimachineryPkgApisMetaV1FieldsV1;
    /**
     * Manager is an identifier of the workflow managing these fields.
     */
    "manager"?: string;
    /**
     * Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.
     */
    "operation"?: string;
    /**
     * Subresource is the name of the subresource used to update that object, or empty string if the object was updated through the main resource. The value of this field is used to distinguish between managers, even if they share the same name. For example, a status update will be distinct from a regular update using the same manager name. Note that the APIVersion field is not related to the Subresource field and it always corresponds to the version of the main resource.
     */
    "subresource"?: string;
    /**
     * Time is the timestamp of when the ManagedFields entry was added. The timestamp will also be updated if a field is added, the manager changes any of the owned fields value or removes a field. The timestamp does not update when a field is removed from the entry because another manager took it over.
     */
    "time"?: IIoK8sApimachineryPkgApisMetaV1Time;
}
/**
 * ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.
 */
export declare class ManagedFieldsEntry extends Model<IManagedFieldsEntry> implements IManagedFieldsEntry {
    "apiVersion"?: IManagedFieldsEntry["apiVersion"];
    "fieldsType"?: string;
    "fieldsV1"?: IIoK8sApimachineryPkgApisMetaV1FieldsV1;
    "manager"?: string;
    "operation"?: string;
    "subresource"?: string;
    "time"?: IIoK8sApimachineryPkgApisMetaV1Time;
    constructor(data?: ModelData<IManagedFieldsEntry>);
}
export { IManagedFieldsEntry as IIoK8sApimachineryPkgApisMetaV1ManagedFieldsEntry, ManagedFieldsEntry as IoK8sApimachineryPkgApisMetaV1ManagedFieldsEntry };
