import { ModelData, Model } from "@kubernetes-models/base";
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 */
export interface IHTTPHeader {
    /**
     * The header field name
     */
    "name": string;
    /**
     * The header field value
     */
    "value": string;
}
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 */
export declare class HTTPHeader extends Model<IHTTPHeader> implements IHTTPHeader {
    "name": string;
    "value": string;
    constructor(data?: ModelData<IHTTPHeader>);
}
export { IHTTPHeader as IIoK8sApiCoreV1HTTPHeader, HTTPHeader as IoK8sApiCoreV1HTTPHeader };
