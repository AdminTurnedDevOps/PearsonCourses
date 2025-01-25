import { ModelData, Model } from "@kubernetes-models/base";
/**
 * JSON represents any valid JSON value. These types are supported: bool, int64, float64, string, []interface{}, map[string]interface{} and nil.
 */
export interface IJSON {
}
/**
 * JSON represents any valid JSON value. These types are supported: bool, int64, float64, string, []interface{}, map[string]interface{} and nil.
 */
export declare class JSON extends Model<IJSON> implements IJSON {
    constructor(data?: ModelData<IJSON>);
}
export { IJSON as IIoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1JSON, JSON as IoK8sApiextensionsApiserverPkgApisApiextensionsV1beta1JSON };
