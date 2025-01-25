import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiStorageV1beta1CSIDriverSpec } from "./CSIDriverSpec";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * CSIDriver captures information about a Container Storage Interface (CSI) volume driver deployed on the cluster. CSI drivers do not need to create the CSIDriver object directly. Instead they may use the cluster-driver-registrar sidecar container. When deployed with a CSI driver it automatically creates a CSIDriver object representing the driver. Kubernetes attach detach controller uses this object to determine whether attach is required. Kubelet uses this object to determine whether pod information needs to be passed on mount. CSIDriver objects are non-namespaced.
 */
export interface ICSIDriver extends TypeMeta {
    "apiVersion": "storage.k8s.io/v1beta1";
    "kind": "CSIDriver";
    /**
     * Standard object metadata. metadata.Name indicates the name of the CSI driver that this object refers to; it MUST be the same name returned by the CSI GetPluginName() call for that driver. The driver name must be 63 characters or less, beginning and ending with an alphanumeric character ([a-z0-9A-Z]) with dashes (-), dots (.), and alphanumerics between. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * Specification of the CSI Driver.
     */
    "spec": IIoK8sApiStorageV1beta1CSIDriverSpec;
}
/**
 * CSIDriver captures information about a Container Storage Interface (CSI) volume driver deployed on the cluster. CSI drivers do not need to create the CSIDriver object directly. Instead they may use the cluster-driver-registrar sidecar container. When deployed with a CSI driver it automatically creates a CSIDriver object representing the driver. Kubernetes attach detach controller uses this object to determine whether attach is required. Kubelet uses this object to determine whether pod information needs to be passed on mount. CSIDriver objects are non-namespaced.
 */
export declare class CSIDriver extends Model<ICSIDriver> implements ICSIDriver {
    "apiVersion": ICSIDriver["apiVersion"];
    "kind": ICSIDriver["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec": IIoK8sApiStorageV1beta1CSIDriverSpec;
    static apiVersion: ICSIDriver["apiVersion"];
    static kind: ICSIDriver["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICSIDriver>;
    constructor(data?: ModelData<ICSIDriver>);
}
export { ICSIDriver as IIoK8sApiStorageV1beta1CSIDriver, CSIDriver as IoK8sApiStorageV1beta1CSIDriver };
