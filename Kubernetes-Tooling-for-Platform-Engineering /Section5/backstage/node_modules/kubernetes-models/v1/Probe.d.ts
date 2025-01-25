import { IIoK8sApiCoreV1ExecAction } from "./ExecAction";
import { IIoK8sApiCoreV1GRPCAction } from "./GRPCAction";
import { IIoK8sApiCoreV1HTTPGetAction } from "./HTTPGetAction";
import { IIoK8sApiCoreV1TCPSocketAction } from "./TCPSocketAction";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.
 */
export interface IProbe {
    /**
     * Exec specifies the action to take.
     */
    "exec"?: IIoK8sApiCoreV1ExecAction;
    /**
     * Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.
     */
    "failureThreshold"?: number;
    /**
     * GRPC specifies an action involving a GRPC port.
     */
    "grpc"?: IIoK8sApiCoreV1GRPCAction;
    /**
     * HTTPGet specifies the http request to perform.
     */
    "httpGet"?: IIoK8sApiCoreV1HTTPGetAction;
    /**
     * Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     */
    "initialDelaySeconds"?: number;
    /**
     * How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.
     */
    "periodSeconds"?: number;
    /**
     * Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
     */
    "successThreshold"?: number;
    /**
     * TCPSocket specifies an action involving a TCP port.
     */
    "tcpSocket"?: IIoK8sApiCoreV1TCPSocketAction;
    /**
     * Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
     */
    "terminationGracePeriodSeconds"?: number;
    /**
     * Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     */
    "timeoutSeconds"?: number;
}
/**
 * Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.
 */
export declare class Probe extends Model<IProbe> implements IProbe {
    "exec"?: IIoK8sApiCoreV1ExecAction;
    "failureThreshold"?: number;
    "grpc"?: IIoK8sApiCoreV1GRPCAction;
    "httpGet"?: IIoK8sApiCoreV1HTTPGetAction;
    "initialDelaySeconds"?: number;
    "periodSeconds"?: number;
    "successThreshold"?: number;
    "tcpSocket"?: IIoK8sApiCoreV1TCPSocketAction;
    "terminationGracePeriodSeconds"?: number;
    "timeoutSeconds"?: number;
    constructor(data?: ModelData<IProbe>);
}
export { IProbe as IIoK8sApiCoreV1Probe, Probe as IoK8sApiCoreV1Probe };
