import { IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1JSONSchemaProps } from "./JSONSchemaProps";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CustomResourceValidation is a list of validation methods for CustomResources.
 */
export interface ICustomResourceValidation {
    /**
     * openAPIV3Schema is the OpenAPI v3 schema to use for validation and pruning.
     */
    "openAPIV3Schema"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1JSONSchemaProps;
}
/**
 * CustomResourceValidation is a list of validation methods for CustomResources.
 */
export declare class CustomResourceValidation extends Model<ICustomResourceValidation> implements ICustomResourceValidation {
    "openAPIV3Schema"?: IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1JSONSchemaProps;
    constructor(data?: ModelData<ICustomResourceValidation>);
}
export { ICustomResourceValidation as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceValidation, CustomResourceValidation as IoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceValidation };
