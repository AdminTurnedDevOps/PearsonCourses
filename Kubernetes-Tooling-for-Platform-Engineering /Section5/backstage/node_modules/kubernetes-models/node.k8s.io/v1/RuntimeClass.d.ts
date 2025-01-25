import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { IIoK8sApiNodeV1Overhead } from "./Overhead";
import { IIoK8sApiNodeV1Scheduling } from "./Scheduling";
import { ModelData, TypeMeta, Model } from "@kubernetes-models/base";
/**
 * RuntimeClass defines a class of container runtime supported in the cluster. The RuntimeClass is used to determine which container runtime is used to run all containers in a pod. RuntimeClasses are manually defined by a user or cluster provisioner, and referenced in the PodSpec. The Kubelet is responsible for resolving the RuntimeClassName reference before running the pod.  For more details, see https://kubernetes.io/docs/concepts/containers/runtime-class/
 */
export interface IRuntimeClass extends TypeMeta {
    "apiVersion": "node.k8s.io/v1";
    /**
     * handler specifies the underlying runtime and configuration that the CRI implementation will use to handle pods of this class. The possible values are specific to the node & CRI configuration.  It is assumed that all handlers are available on every node, and handlers of the same name are equivalent on every node. For example, a handler called "runc" might specify that the runc OCI runtime (using native Linux containers) will be used to run the containers in a pod. The Handler must be lowercase, conform to the DNS Label (RFC 1123) requirements, and is immutable.
     */
    "handler": string;
    "kind": "RuntimeClass";
    /**
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    /**
     * overhead represents the resource overhead associated with running a pod for a given RuntimeClass. For more details, see
     *  https://kubernetes.io/docs/concepts/scheduling-eviction/pod-overhead/
     */
    "overhead"?: IIoK8sApiNodeV1Overhead;
    /**
     * scheduling holds the scheduling constraints to ensure that pods running with this RuntimeClass are scheduled to nodes that support it. If scheduling is nil, this RuntimeClass is assumed to be supported by all nodes.
     */
    "scheduling"?: IIoK8sApiNodeV1Scheduling;
}
/**
 * RuntimeClass defines a class of container runtime supported in the cluster. The RuntimeClass is used to determine which container runtime is used to run all containers in a pod. RuntimeClasses are manually defined by a user or cluster provisioner, and referenced in the PodSpec. The Kubelet is responsible for resolving the RuntimeClassName reference before running the pod.  For more details, see https://kubernetes.io/docs/concepts/containers/runtime-class/
 */
export declare class RuntimeClass extends Model<IRuntimeClass> implements IRuntimeClass {
    "apiVersion": IRuntimeClass["apiVersion"];
    "handler": string;
    "kind": IRuntimeClass["kind"];
    "metadata"?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    "overhead"?: IIoK8sApiNodeV1Overhead;
    "scheduling"?: IIoK8sApiNodeV1Scheduling;
    static apiVersion: IRuntimeClass["apiVersion"];
    static kind: IRuntimeClass["kind"];
    static is: import("@kubernetes-models/base").TypeMetaGuard<IRuntimeClass>;
    constructor(data?: ModelData<IRuntimeClass>);
}
export { IRuntimeClass as IIoK8sApiNodeV1RuntimeClass, RuntimeClass as IoK8sApiNodeV1RuntimeClass };
