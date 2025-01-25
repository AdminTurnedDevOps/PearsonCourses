import { IIoK8sApimachineryPkgApisMetaV1APIGroup } from "./APIGroup";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * APIGroupList is a list of APIGroup, to allow clients to discover the API at /apis.
 */
export interface IAPIGroupList {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     */
    "apiVersion"?: string;
    /**
     * groups is a list of APIGroup.
     */
    "groups": Array<IIoK8sApimachineryPkgApisMetaV1APIGroup>;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    "kind"?: string;
}
/**
 * APIGroupList is a list of APIGroup, to allow clients to discover the API at /apis.
 */
export declare class APIGroupList extends Model<IAPIGroupList> implements IAPIGroupList {
    "apiVersion"?: IAPIGroupList["apiVersion"];
    "groups": Array<IIoK8sApimachineryPkgApisMetaV1APIGroup>;
    "kind"?: IAPIGroupList["kind"];
    constructor(data?: ModelData<IAPIGroupList>);
}
export { IAPIGroupList as IIoK8sApimachineryPkgApisMetaV1APIGroupList, APIGroupList as IoK8sApimachineryPkgApisMetaV1APIGroupList };
