import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiStorageV1beta1CSINodeSpec } from "./CSINodeSpec";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * DEPRECATED - This group version of CSINode is deprecated by storage/v1/CSINode. See the release notes for more information. CSINode holds information about all CSI drivers installed on a node. CSI drivers do not need to create the CSINode object directly. As long as they use the node-driver-registrar sidecar container, the kubelet will automatically populate the CSINode object for the CSI driver as part of kubelet plugin registration. CSINode has the same name as a node. If the object is missing, it means either there are no CSI Drivers available on the node, or the Kubelet version is low enough that it doesn't create this object. CSINode has an OwnerReference that points to the corresponding node object.
 * @deprecated
 */
export interface ICSINode extends TypeMeta {
    "apiVersion": "storage.k8s.io/v1beta1";
    "kind": "CSINode";
    /**
     * metadata.name must be the Kubernetes node name.
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * spec is the specification of CSINode
     */
    "spec": IIoK8sApiStorageV1beta1CSINodeSpec;
}
/**
 * DEPRECATED - This group version of CSINode is deprecated by storage/v1/CSINode. See the release notes for more information. CSINode holds information about all CSI drivers installed on a node. CSI drivers do not need to create the CSINode object directly. As long as they use the node-driver-registrar sidecar container, the kubelet will automatically populate the CSINode object for the CSI driver as part of kubelet plugin registration. CSINode has the same name as a node. If the object is missing, it means either there are no CSI Drivers available on the node, or the Kubelet version is low enough that it doesn't create this object. CSINode has an OwnerReference that points to the corresponding node object.
 * @deprecated
 */
export declare class CSINode extends Model<ICSINode> implements ICSINode {
    "apiVersion": ICSINode["apiVersion"];
    "kind": ICSINode["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "spec": IIoK8sApiStorageV1beta1CSINodeSpec;
    static apiVersion: ICSINode["apiVersion"];
    static kind: ICSINode["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<ICSINode>;
    constructor(data?: ModelData<ICSINode>);
}
export { ICSINode as IIoK8sApiStorageV1beta1CSINode, CSINode as IoK8sApiStorageV1beta1CSINode };
