import { IIoK8sApimachineryPkgRuntimeRawExtension } from "@kubernetes-models/apimachinery/runtime/RawExtension";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * DEPRECATED - This group version of ControllerRevision is deprecated by apps/v1beta2/ControllerRevision. See the release notes for more information. ControllerRevision implements an immutable snapshot of state data. Clients are responsible for serializing and deserializing the objects that contain their internal state. Once a ControllerRevision has been successfully created, it can not be updated. The API Server will fail validation of all requests that attempt to mutate the Data field. ControllerRevisions may, however, be deleted. Note that, due to its use by both the DaemonSet and StatefulSet controllers for update and rollback, this object is beta. However, it may be subject to name and representation changes in future releases, and clients should not depend on its stability. It is primarily for internal use by controllers.
 * @deprecated
 */
export interface IControllerRevision extends TypeMeta {
    "apiVersion": "apps/v1beta1";
    /**
     * Data is the serialized representation of the state.
     */
    "data"?: IIoK8sApimachineryPkgRuntimeRawExtension;
    "kind": "ControllerRevision";
    /**
     * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Revision indicates the revision of the state represented by Data.
     */
    "revision": number;
}
/**
 * DEPRECATED - This group version of ControllerRevision is deprecated by apps/v1beta2/ControllerRevision. See the release notes for more information. ControllerRevision implements an immutable snapshot of state data. Clients are responsible for serializing and deserializing the objects that contain their internal state. Once a ControllerRevision has been successfully created, it can not be updated. The API Server will fail validation of all requests that attempt to mutate the Data field. ControllerRevisions may, however, be deleted. Note that, due to its use by both the DaemonSet and StatefulSet controllers for update and rollback, this object is beta. However, it may be subject to name and representation changes in future releases, and clients should not depend on its stability. It is primarily for internal use by controllers.
 * @deprecated
 */
export declare class ControllerRevision extends Model<IControllerRevision> implements IControllerRevision {
    "apiVersion": IControllerRevision["apiVersion"];
    "data"?: IIoK8sApimachineryPkgRuntimeRawExtension;
    "kind": IControllerRevision["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "revision": number;
    static apiVersion: IControllerRevision["apiVersion"];
    static kind: IControllerRevision["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IControllerRevision>;
    constructor(data?: ModelData<IControllerRevision>);
}
export { IControllerRevision as IIoK8sApiAppsV1beta1ControllerRevision, ControllerRevision as IoK8sApiAppsV1beta1ControllerRevision };
