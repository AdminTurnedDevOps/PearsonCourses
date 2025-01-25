import { IIoK8sApiCoreV1HTTPHeader } from "./HTTPHeader";
import { IIoK8sApimachineryPkgUtilIntstrIntOrString } from "@kubernetes-models/apimachinery/util/intstr/IntOrString";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * HTTPGetAction describes an action based on HTTP Get requests.
 */
export interface IHTTPGetAction {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.
     */
    "host"?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     */
    "httpHeaders"?: Array<IIoK8sApiCoreV1HTTPHeader>;
    /**
     * Path to access on the HTTP server.
     */
    "path"?: string;
    /**
     * Name or number of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
     */
    "port": IIoK8sApimachineryPkgUtilIntstrIntOrString;
    /**
     * Scheme to use for connecting to the host. Defaults to HTTP.
     *
     * Possible enum values:
     *  - `"HTTP"` means that the scheme used will be http://
     *  - `"HTTPS"` means that the scheme used will be https://
     */
    "scheme"?: "HTTP" | "HTTPS";
}
/**
 * HTTPGetAction describes an action based on HTTP Get requests.
 */
export declare class HTTPGetAction extends Model<IHTTPGetAction> implements IHTTPGetAction {
    "host"?: string;
    "httpHeaders"?: Array<IIoK8sApiCoreV1HTTPHeader>;
    "path"?: string;
    "port": IIoK8sApimachineryPkgUtilIntstrIntOrString;
    "scheme"?: "HTTP" | "HTTPS";
    constructor(data?: ModelData<IHTTPGetAction>);
}
export { IHTTPGetAction as IIoK8sApiCoreV1HTTPGetAction, HTTPGetAction as IoK8sApiCoreV1HTTPGetAction };
