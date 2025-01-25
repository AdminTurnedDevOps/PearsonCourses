import { IIoK8sApiExtensionsV1beta1DaemonSet } from "./DaemonSet";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * DaemonSetList is a collection of daemon sets.
 */
export interface IDaemonSetList extends TypeMeta {
    "apiVersion": "extensions/v1beta1";
    /**
     * A list of daemon sets.
     */
    "items": Array<IIoK8sApiExtensionsV1beta1DaemonSet>;
    "kind": "DaemonSetList";
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * DaemonSetList is a collection of daemon sets.
 */
export declare class DaemonSetList extends Model<IDaemonSetList> implements IDaemonSetList {
    "apiVersion": IDaemonSetList["apiVersion"];
    "items": Array<IIoK8sApiExtensionsV1beta1DaemonSet>;
    "kind": IDaemonSetList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IDaemonSetList["apiVersion"];
    static kind: IDaemonSetList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IDaemonSetList>;
    constructor(data?: ModelData<IDaemonSetList>);
}
export { IDaemonSetList as IIoK8sApiExtensionsV1beta1DaemonSetList, DaemonSetList as IoK8sApiExtensionsV1beta1DaemonSetList };
