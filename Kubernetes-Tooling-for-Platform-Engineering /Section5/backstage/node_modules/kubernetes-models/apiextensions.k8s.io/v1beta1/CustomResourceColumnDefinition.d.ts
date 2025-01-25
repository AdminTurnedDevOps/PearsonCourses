import { ModelData, Model } from "@kubernetes-models/base";
/**
 * CustomResourceColumnDefinition specifies a column for server side printing.
 */
export interface ICustomResourceColumnDefinition {
    /**
     * JSONPath is a simple JSON path (i.e. with array notation) which is evaluated against each custom resource to produce the value for this column.
     */
    "JSONPath": string;
    /**
     * description is a human readable description of this column.
     */
    "description"?: string;
    /**
     * format is an optional OpenAPI type definition for this column. The 'name' format is applied to the primary identifier column to assist in clients identifying column is the resource name. See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for details.
     */
    "format"?: string;
    /**
     * name is a human readable name for the column.
     */
    "name": string;
    /**
     * priority is an integer defining the relative importance of this column compared to others. Lower numbers are considered higher priority. Columns that may be omitted in limited space scenarios should be given a priority greater than 0.
     */
    "priority"?: number;
    /**
     * type is an OpenAPI type definition for this column. See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for details.
     */
    "type": string;
}
/**
 * CustomResourceColumnDefinition specifies a column for server side printing.
 */
export declare class CustomResourceColumnDefinition extends Model<ICustomResourceColumnDefinition> implements ICustomResourceColumnDefinition {
    "JSONPath": string;
    "description"?: string;
    "format"?: string;
    "name": string;
    "priority"?: number;
    "type": string;
    constructor(data?: ModelData<ICustomResourceColumnDefinition>);
}
export { ICustomResourceColumnDefinition as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceColumnDefinition, CustomResourceColumnDefinition as IoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1CustomResourceColumnDefinition };
