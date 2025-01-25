import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Adds and removes POSIX capabilities from running containers.
 */
export interface ICapabilities {
    /**
     * Added capabilities
     */
    "add"?: Array<string>;
    /**
     * Removed capabilities
     */
    "drop"?: Array<string>;
}
/**
 * Adds and removes POSIX capabilities from running containers.
 */
export declare class Capabilities extends Model<ICapabilities> implements ICapabilities {
    "add"?: Array<string>;
    "drop"?: Array<string>;
    constructor(data?: ModelData<ICapabilities>);
}
export { ICapabilities as IIoK8sApiCoreV1Capabilities, Capabilities as IoK8sApiCoreV1Capabilities };
