import { ModelData, Model } from "@kubernetes-models/base";
/**
 * GroupVersion contains the "group/version" and "version" string of a version. It is made a struct to keep extensibility.
 */
export interface IGroupVersionForDiscovery {
    /**
     * groupVersion specifies the API group and version in the form "group/version"
     */
    "groupVersion": string;
    /**
     * version specifies the version in the form of "version". This is to save the clients the trouble of splitting the GroupVersion.
     */
    "version": string;
}
/**
 * GroupVersion contains the "group/version" and "version" string of a version. It is made a struct to keep extensibility.
 */
export declare class GroupVersionForDiscovery extends Model<IGroupVersionForDiscovery> implements IGroupVersionForDiscovery {
    "groupVersion": string;
    "version": string;
    constructor(data?: ModelData<IGroupVersionForDiscovery>);
}
export { IGroupVersionForDiscovery as IIoK8sApimachineryPkgApisMetaV1GroupVersionForDiscovery, GroupVersionForDiscovery as IoK8sApimachineryPkgApisMetaV1GroupVersionForDiscovery };
