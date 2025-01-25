import { IIoK8sApiAppsV1beta1ControllerRevision } from "./ControllerRevision";
import { IIoK8sApimachineryPkgApisMetaV1ListMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ListMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * ControllerRevisionList is a resource containing a list of ControllerRevision objects.
 */
export interface IControllerRevisionList extends TypeMeta {
    "apiVersion": "apps/v1beta1";
    /**
     * Items is the list of ControllerRevisions
     */
    "items": Array<IIoK8sApiAppsV1beta1ControllerRevision>;
    "kind": "ControllerRevisionList";
    /**
     * More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
}
/**
 * ControllerRevisionList is a resource containing a list of ControllerRevision objects.
 */
export declare class ControllerRevisionList extends Model<IControllerRevisionList> implements IControllerRevisionList {
    "apiVersion": IControllerRevisionList["apiVersion"];
    "items": Array<IIoK8sApiAppsV1beta1ControllerRevision>;
    "kind": IControllerRevisionList["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ListMeta;
    static apiVersion: IControllerRevisionList["apiVersion"];
    static kind: IControllerRevisionList["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IControllerRevisionList>;
    constructor(data?: ModelData<IControllerRevisionList>);
}
export { IControllerRevisionList as IIoK8sApiAppsV1beta1ControllerRevisionList, ControllerRevisionList as IoK8sApiAppsV1beta1ControllerRevisionList };
