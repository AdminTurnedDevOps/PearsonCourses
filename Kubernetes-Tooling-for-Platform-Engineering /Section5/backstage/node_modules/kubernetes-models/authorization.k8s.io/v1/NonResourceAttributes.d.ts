import { ModelData, Model } from "@kubernetes-models/base";
/**
 * NonResourceAttributes includes the authorization attributes available for non-resource requests to the Authorizer interface
 */
export interface INonResourceAttributes {
    /**
     * Path is the URL path of the request
     */
    "path"?: string;
    /**
     * Verb is the standard HTTP verb
     */
    "verb"?: string;
}
/**
 * NonResourceAttributes includes the authorization attributes available for non-resource requests to the Authorizer interface
 */
export declare class NonResourceAttributes extends Model<INonResourceAttributes> implements INonResourceAttributes {
    "path"?: string;
    "verb"?: string;
    constructor(data?: ModelData<INonResourceAttributes>);
}
export { INonResourceAttributes as IIoK8sApiAuthorizationV1NonResourceAttributes, NonResourceAttributes as IoK8sApiAuthorizationV1NonResourceAttributes };
