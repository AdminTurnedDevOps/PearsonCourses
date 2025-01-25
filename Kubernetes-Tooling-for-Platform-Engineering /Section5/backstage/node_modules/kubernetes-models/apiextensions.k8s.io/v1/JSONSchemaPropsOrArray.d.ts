import { ModelData, Model } from "@kubernetes-models/base";
/**
 * JSONSchemaPropsOrArray represents a value that can either be a JSONSchemaProps or an array of JSONSchemaProps. Mainly here for serialization purposes.
 */
export interface IJSONSchemaPropsOrArray {
}
/**
 * JSONSchemaPropsOrArray represents a value that can either be a JSONSchemaProps or an array of JSONSchemaProps. Mainly here for serialization purposes.
 */
export declare class JSONSchemaPropsOrArray extends Model<IJSONSchemaPropsOrArray> implements IJSONSchemaPropsOrArray {
    constructor(data?: ModelData<IJSONSchemaPropsOrArray>);
}
export { IJSONSchemaPropsOrArray as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1JSONSchemaPropsOrArray, JSONSchemaPropsOrArray as IoK8sApiextensionsApiserverPkgApisApiextensionsV1JSONSchemaPropsOrArray };
