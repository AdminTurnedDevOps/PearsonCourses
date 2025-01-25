import { IIoK8sApiCoreV1EnvVar } from "./EnvVar";
import { IIoK8sApiCoreV1EnvFromSource } from "./EnvFromSource";
import { IIoK8sApiCoreV1Lifecycle } from "./Lifecycle";
import { IIoK8sApiCoreV1Probe } from "./Probe";
import { IIoK8sApiCoreV1ContainerPort } from "./ContainerPort";
import { IIoK8sApiCoreV1ContainerResizePolicy } from "./ContainerResizePolicy";
import { IIoK8sApiCoreV1ResourceRequirements } from "./ResourceRequirements";
import { IIoK8sApiCoreV1SecurityContext } from "./SecurityContext";
import { IIoK8sApiCoreV1VolumeDevice } from "./VolumeDevice";
import { IIoK8sApiCoreV1VolumeMount } from "./VolumeMount";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * An EphemeralContainer is a temporary container that you may add to an existing Pod for user-initiated activities such as debugging. Ephemeral containers have no resource or scheduling guarantees, and they will not be restarted when they exit or when a Pod is removed or restarted. The kubelet may evict a Pod if an ephemeral container causes the Pod to exceed its resource allocation.
 *
 * To add an ephemeral container, use the ephemeralcontainers subresource of an existing Pod. Ephemeral containers may not be removed or restarted.
 */
export interface IEphemeralContainer {
    /**
     * Arguments to the entrypoint. The image's CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     */
    "args"?: Array<string>;
    /**
     * Entrypoint array. Not executed within a shell. The image's ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     */
    "command"?: Array<string>;
    /**
     * List of environment variables to set in the container. Cannot be updated.
     */
    "env"?: Array<IIoK8sApiCoreV1EnvVar>;
    /**
     * List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.
     */
    "envFrom"?: Array<IIoK8sApiCoreV1EnvFromSource>;
    /**
     * Container image name. More info: https://kubernetes.io/docs/concepts/containers/images
     */
    "image"?: string;
    /**
     * Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
     *
     * Possible enum values:
     *  - `"Always"` means that kubelet always attempts to pull the latest image. Container will fail If the pull fails.
     *  - `"IfNotPresent"` means that kubelet pulls if the image isn't present on disk. Container will fail if the image isn't present and the pull fails.
     *  - `"Never"` means that kubelet never pulls an image, but only uses a local image. Container will fail if the image isn't present
     */
    "imagePullPolicy"?: "Always" | "IfNotPresent" | "Never";
    /**
     * Lifecycle is not allowed for ephemeral containers.
     */
    "lifecycle"?: IIoK8sApiCoreV1Lifecycle;
    /**
     * Probes are not allowed for ephemeral containers.
     */
    "livenessProbe"?: IIoK8sApiCoreV1Probe;
    /**
     * Name of the ephemeral container specified as a DNS_LABEL. This name must be unique among all containers, init containers and ephemeral containers.
     */
    "name": string;
    /**
     * Ports are not allowed for ephemeral containers.
     */
    "ports"?: Array<IIoK8sApiCoreV1ContainerPort>;
    /**
     * Probes are not allowed for ephemeral containers.
     */
    "readinessProbe"?: IIoK8sApiCoreV1Probe;
    /**
     * Resources resize policy for the container.
     */
    "resizePolicy"?: Array<IIoK8sApiCoreV1ContainerResizePolicy>;
    /**
     * Resources are not allowed for ephemeral containers. Ephemeral containers use spare resources already allocated to the pod.
     */
    "resources"?: IIoK8sApiCoreV1ResourceRequirements;
    /**
     * Optional: SecurityContext defines the security options the ephemeral container should be run with. If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
     */
    "securityContext"?: IIoK8sApiCoreV1SecurityContext;
    /**
     * Probes are not allowed for ephemeral containers.
     */
    "startupProbe"?: IIoK8sApiCoreV1Probe;
    /**
     * Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.
     */
    "stdin"?: boolean;
    /**
     * Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false
     */
    "stdinOnce"?: boolean;
    /**
     * If set, the name of the container from PodSpec that this ephemeral container targets. The ephemeral container will be run in the namespaces (IPC, PID, etc) of this container. If not set then the ephemeral container uses the namespaces configured in the Pod spec.
     *
     * The container runtime must implement support for this feature. If the runtime does not support namespace targeting then the result of setting this field is undefined.
     */
    "targetContainerName"?: string;
    /**
     * Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.
     */
    "terminationMessagePath"?: string;
    /**
     * Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.
     *
     * Possible enum values:
     *  - `"FallbackToLogsOnError"` will read the most recent contents of the container logs for the container status message when the container exits with an error and the terminationMessagePath has no contents.
     *  - `"File"` is the default behavior and will set the container status message to the contents of the container's terminationMessagePath when the container exits.
     */
    "terminationMessagePolicy"?: "FallbackToLogsOnError" | "File";
    /**
     * Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.
     */
    "tty"?: boolean;
    /**
     * volumeDevices is the list of block devices to be used by the container.
     */
    "volumeDevices"?: Array<IIoK8sApiCoreV1VolumeDevice>;
    /**
     * Pod volumes to mount into the container's filesystem. Subpath mounts are not allowed for ephemeral containers. Cannot be updated.
     */
    "volumeMounts"?: Array<IIoK8sApiCoreV1VolumeMount>;
    /**
     * Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.
     */
    "workingDir"?: string;
}
/**
 * An EphemeralContainer is a temporary container that you may add to an existing Pod for user-initiated activities such as debugging. Ephemeral containers have no resource or scheduling guarantees, and they will not be restarted when they exit or when a Pod is removed or restarted. The kubelet may evict a Pod if an ephemeral container causes the Pod to exceed its resource allocation.
 *
 * To add an ephemeral container, use the ephemeralcontainers subresource of an existing Pod. Ephemeral containers may not be removed or restarted.
 */
export declare class EphemeralContainer extends Model<IEphemeralContainer> implements IEphemeralContainer {
    "args"?: Array<string>;
    "command"?: Array<string>;
    "env"?: Array<IIoK8sApiCoreV1EnvVar>;
    "envFrom"?: Array<IIoK8sApiCoreV1EnvFromSource>;
    "image"?: string;
    "imagePullPolicy"?: "Always" | "IfNotPresent" | "Never";
    "lifecycle"?: IIoK8sApiCoreV1Lifecycle;
    "livenessProbe"?: IIoK8sApiCoreV1Probe;
    "name": string;
    "ports"?: Array<IIoK8sApiCoreV1ContainerPort>;
    "readinessProbe"?: IIoK8sApiCoreV1Probe;
    "resizePolicy"?: Array<IIoK8sApiCoreV1ContainerResizePolicy>;
    "resources"?: IIoK8sApiCoreV1ResourceRequirements;
    "securityContext"?: IIoK8sApiCoreV1SecurityContext;
    "startupProbe"?: IIoK8sApiCoreV1Probe;
    "stdin"?: boolean;
    "stdinOnce"?: boolean;
    "targetContainerName"?: string;
    "terminationMessagePath"?: string;
    "terminationMessagePolicy"?: "FallbackToLogsOnError" | "File";
    "tty"?: boolean;
    "volumeDevices"?: Array<IIoK8sApiCoreV1VolumeDevice>;
    "volumeMounts"?: Array<IIoK8sApiCoreV1VolumeMount>;
    "workingDir"?: string;
    constructor(data?: ModelData<IEphemeralContainer>);
}
export { IEphemeralContainer as IIoK8sApiCoreV1EphemeralContainer, EphemeralContainer as IoK8sApiCoreV1EphemeralContainer };
