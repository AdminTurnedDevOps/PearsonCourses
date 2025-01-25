import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Sysctl defines a kernel parameter to be set
 */
export interface ISysctl {
    /**
     * Name of a property to set
     */
    "name": string;
    /**
     * Value of a property to set
     */
    "value": string;
}
/**
 * Sysctl defines a kernel parameter to be set
 */
export declare class Sysctl extends Model<ISysctl> implements ISysctl {
    "name": string;
    "value": string;
    constructor(data?: ModelData<ISysctl>);
}
export { ISysctl as IIoK8sApiCoreV1Sysctl, Sysctl as IoK8sApiCoreV1Sysctl };
