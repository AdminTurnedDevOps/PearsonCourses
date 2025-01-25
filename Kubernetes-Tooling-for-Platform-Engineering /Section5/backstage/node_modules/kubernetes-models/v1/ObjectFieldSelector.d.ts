import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ObjectFieldSelector selects an APIVersioned field of an object.
 */
export interface IObjectFieldSelector {
    /**
     * Version of the schema the FieldPath is written in terms of, defaults to "v1".
     */
    "apiVersion"?: string;
    /**
     * Path of the field to select in the specified API version.
     */
    "fieldPath": string;
}
/**
 * ObjectFieldSelector selects an APIVersioned field of an object.
 */
export declare class ObjectFieldSelector extends Model<IObjectFieldSelector> implements IObjectFieldSelector {
    "apiVersion"?: IObjectFieldSelector["apiVersion"];
    "fieldPath": string;
    constructor(data?: ModelData<IObjectFieldSelector>);
}
export { IObjectFieldSelector as IIoK8sApiCoreV1ObjectFieldSelector, ObjectFieldSelector as IoK8sApiCoreV1ObjectFieldSelector };
