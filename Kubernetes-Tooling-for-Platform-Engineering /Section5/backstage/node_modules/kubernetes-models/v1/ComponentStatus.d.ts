import { IIoK8sApiCoreV1ComponentCondition } from "./ComponentCondition";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ComponentStatus (and ComponentStatusList) holds the cluster validation info. Deprecated: This API is deprecated in v1.19+
 * @deprecated
 */
export interface IComponentStatus extends TypeMeta {
    "apiVersion": "v1";
    /**
     * List of component conditions observed
     */
    "conditions"?: Array<IIoK8sApiCoreV1ComponentCondition>;
    "kind": "ComponentStatus";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
}
/**
 * ComponentStatus (and ComponentStatusList) holds the cluster validation info. Deprecated: This API is deprecated in v1.19+
 * @deprecated
 */
export declare class ComponentStatus extends Model<IComponentStatus> implements IComponentStatus {
    "apiVersion": IComponentStatus["apiVersion"];
    "conditions"?: Array<IIoK8sApiCoreV1ComponentCondition>;
    "kind": IComponentStatus["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    static apiVersion: IComponentStatus["apiVersion"];
    static kind: IComponentStatus["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IComponentStatus>;
    constructor(data?: ModelData<IComponentStatus>);
}
export { IComponentStatus as IIoK8sApiCoreV1ComponentStatus, ComponentStatus as IoK8sApiCoreV1ComponentStatus };
