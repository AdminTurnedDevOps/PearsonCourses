import { IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionNames } from "./CustomResourceDefinitionNames";
import { IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionCondition } from "./CustomResourceDefinitionCondition";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CustomResourceDefinitionStatus indicates the state of the CustomResourceDefinition
 */
export interface ICustomResourceDefinitionStatus {
    /**
     * acceptedNames are the names that are actually being used to serve discovery. They may be different than the names in spec.
     */
    "acceptedNames"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionNames;
    /**
     * conditions indicate state for particular aspects of a CustomResourceDefinition
     */
    "conditions"?: Array<IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionCondition>;
    /**
     * storedVersions lists all versions of CustomResources that were ever persisted. Tracking these versions allows a migration path for stored versions in etcd. The field is mutable so a migration controller can finish a migration to another version (ensuring no old objects are left in storage), and then remove the rest of the versions from this list. Versions may not be removed from `spec.versions` while they exist in this list.
     */
    "storedVersions"?: Array<string>;
}
/**
 * CustomResourceDefinitionStatus indicates the state of the CustomResourceDefinition
 */
export declare class CustomResourceDefinitionStatus extends Model<ICustomResourceDefinitionStatus> implements ICustomResourceDefinitionStatus {
    "acceptedNames"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionNames;
    "conditions"?: Array<IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionCondition>;
    "storedVersions"?: Array<string>;
    constructor(data?: ModelData<ICustomResourceDefinitionStatus>);
}
export { ICustomResourceDefinitionStatus as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionStatus, CustomResourceDefinitionStatus as IoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceDefinitionStatus };
