import { IIoK8sApiExtensionsV1beta1HTTPIngressPath } from "./HTTPIngressPath";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'.
 */
export interface IHTTPIngressRuleValue {
    /**
     * A collection of paths that map requests to backends.
     */
    "paths": Array<IIoK8sApiExtensionsV1beta1HTTPIngressPath>;
}
/**
 * HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'.
 */
export declare class HTTPIngressRuleValue extends Model<IHTTPIngressRuleValue> implements IHTTPIngressRuleValue {
    "paths": Array<IIoK8sApiExtensionsV1beta1HTTPIngressPath>;
    constructor(data?: ModelData<IHTTPIngressRuleValue>);
}
export { IHTTPIngressRuleValue as IIoK8sApiExtensionsV1beta1HTTPIngressRuleValue, HTTPIngressRuleValue as IoK8sApiExtensionsV1beta1HTTPIngressRuleValue };
