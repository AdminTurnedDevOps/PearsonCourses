import { ModelData, Model } from "@kubernetes-models/base";
/**
 * SELinuxOptions are the labels to be applied to the container
 */
export interface ISELinuxOptions {
    /**
     * Level is SELinux level label that applies to the container.
     */
    "level"?: string;
    /**
     * Role is a SELinux role label that applies to the container.
     */
    "role"?: string;
    /**
     * Type is a SELinux type label that applies to the container.
     */
    "type"?: string;
    /**
     * User is a SELinux user label that applies to the container.
     */
    "user"?: string;
}
/**
 * SELinuxOptions are the labels to be applied to the container
 */
export declare class SELinuxOptions extends Model<ISELinuxOptions> implements ISELinuxOptions {
    "level"?: string;
    "role"?: string;
    "type"?: string;
    "user"?: string;
    constructor(data?: ModelData<ISELinuxOptions>);
}
export { ISELinuxOptions as IIoK8sApiCoreV1SELinuxOptions, SELinuxOptions as IoK8sApiCoreV1SELinuxOptions };
