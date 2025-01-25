import { JsonValue, JsonObject } from '@backstage/types';
import { V1Pod, V1Service, V1ConfigMap, V1Deployment, V1ReplicaSet, V1LimitRange, V1ResourceQuota, V2HorizontalPodAutoscaler, V1Job, V1CronJob, V1Ingress, V1StatefulSet, V1DaemonSet, PodStatus } from '@kubernetes/client-node';
import { Entity } from '@backstage/catalog-model';
import * as _backstage_plugin_permission_common from '@backstage/plugin-permission-common';
import { ObjectsByEntityResponse as ObjectsByEntityResponse$1, FetchResponse as FetchResponse$1 } from '@backstage/plugin-kubernetes-common';

/** @public */
type KubernetesRequestAuth = {
    [providerKey: string]: JsonValue | undefined;
};
/** @public */
interface CustomResourceMatcher {
    group: string;
    apiVersion: string;
    plural: string;
}
/** @public */
interface WorkloadsByEntityRequest {
    auth: KubernetesRequestAuth;
    entity: Entity;
}
/** @public */
interface CustomObjectsByEntityRequest {
    auth: KubernetesRequestAuth;
    customResources: CustomResourceMatcher[];
    entity: Entity;
}
/** @public */
interface KubernetesRequestBody {
    auth?: KubernetesRequestAuth;
    entity: Entity;
}
/** @public */
interface ClusterAttributes {
    /**
     * Name of the Kubernetes cluster; used as an internal identifier.
     */
    name: string;
    /**
     * Human-readable name for the cluster, to be dispayed in UIs.
     */
    title?: string;
    /**
     * Specifies the link to the Kubernetes dashboard managing this cluster.
     * @remarks
     * Note that you should specify the app used for the dashboard
     * using the dashboardApp property, in order to properly format
     * links to kubernetes resources,  otherwise it will assume that you're running the standard one.
     * Also, for cloud clusters such as GKE, you should provide additional parameters using dashboardParameters.
     * @see dashboardApp
     */
    dashboardUrl?: string;
    /**
     * Specifies the app that provides the Kubernetes dashboard.
     * This will be used for formatting links to kubernetes objects inside the dashboard.
     * @remarks
     * The supported dashboards are: standard, rancher, openshift, gke, aks, eks
     * Note that it will default to the regular dashboard provided by the Kubernetes project (standard).
     * Note that you can add your own formatter by registering it to the clusterLinksFormatters dictionary.
     * @defaultValue standard
     * @see dashboardUrl
     * @example
     * ```ts
     * import { clusterLinksFormatters } from '@backstage/plugin-kubernetes';
     * clusterLinksFormatters.myDashboard = (options) => ...;
     * ```
     */
    dashboardApp?: string;
    /**
     * Specifies specific parameters used by some dashboard URL formatters.
     * This is used by the GKE formatter which requires the project, region and cluster name.
     */
    dashboardParameters?: JsonObject;
}
/** @public */
interface ClusterObjects {
    cluster: ClusterAttributes;
    resources: FetchResponse[];
    podMetrics: ClientPodStatus[];
    errors: KubernetesFetchError[];
}
/** @public */
interface ObjectsByEntityResponse {
    items: ClusterObjects[];
}
/** @public */
type AuthProviderType = 'google' | 'serviceAccount' | 'aws' | 'azure';
/** @public */
type FetchResponse = PodFetchResponse | ServiceFetchResponse | ConfigMapFetchResponse | DeploymentFetchResponse | LimitRangeFetchResponse | ResourceQuotaFetchResponse | ReplicaSetsFetchResponse | HorizontalPodAutoscalersFetchResponse | JobsFetchResponse | CronJobsFetchResponse | IngressesFetchResponse | CustomResourceFetchResponse | StatefulSetsFetchResponse | DaemonSetsFetchResponse | PodStatusFetchResponse;
/** @public */
interface PodFetchResponse {
    type: 'pods';
    resources: Array<V1Pod>;
}
/** @public */
interface ServiceFetchResponse {
    type: 'services';
    resources: Array<V1Service>;
}
/** @public */
interface ConfigMapFetchResponse {
    type: 'configmaps';
    resources: Array<V1ConfigMap>;
}
/** @public */
interface DeploymentFetchResponse {
    type: 'deployments';
    resources: Array<V1Deployment>;
}
/** @public */
interface ReplicaSetsFetchResponse {
    type: 'replicasets';
    resources: Array<V1ReplicaSet>;
}
/** @public */
interface LimitRangeFetchResponse {
    type: 'limitranges';
    resources: Array<V1LimitRange>;
}
/** @public */
interface ResourceQuotaFetchResponse {
    type: 'resourcequotas';
    resources: Array<V1ResourceQuota>;
}
/** @public */
interface HorizontalPodAutoscalersFetchResponse {
    type: 'horizontalpodautoscalers';
    resources: Array<V2HorizontalPodAutoscaler>;
}
/** @public */
interface JobsFetchResponse {
    type: 'jobs';
    resources: Array<V1Job>;
}
/** @public */
interface CronJobsFetchResponse {
    type: 'cronjobs';
    resources: Array<V1CronJob>;
}
/** @public */
interface IngressesFetchResponse {
    type: 'ingresses';
    resources: Array<V1Ingress>;
}
/** @public */
interface CustomResourceFetchResponse {
    type: 'customresources';
    resources: Array<any>;
}
/** @public */
interface StatefulSetsFetchResponse {
    type: 'statefulsets';
    resources: Array<V1StatefulSet>;
}
/** @public */
interface DaemonSetsFetchResponse {
    type: 'daemonsets';
    resources: Array<V1DaemonSet>;
}
/** @public */
interface PodStatusFetchResponse {
    type: 'podstatus';
    resources: Array<PodStatus>;
}
/** @public */
type KubernetesFetchError = StatusError | RawFetchError;
/** @public */
interface StatusError {
    errorType: KubernetesErrorTypes;
    statusCode?: number;
    resourcePath?: string;
}
/** @public */
interface RawFetchError {
    errorType: 'FETCH_ERROR';
    message: string;
}
/** @public */
type KubernetesErrorTypes = 'BAD_REQUEST' | 'UNAUTHORIZED_ERROR' | 'NOT_FOUND' | 'SYSTEM_ERROR' | 'UNKNOWN_ERROR';
/** @public */
interface ClientCurrentResourceUsage {
    currentUsage: number | string;
    requestTotal: number | string;
    limitTotal: number | string;
}
/** @public */
interface ClientContainerStatus {
    container: string;
    cpuUsage: ClientCurrentResourceUsage;
    memoryUsage: ClientCurrentResourceUsage;
}
/** @public */
interface ClientPodStatus {
    pod: V1Pod;
    cpu: ClientCurrentResourceUsage;
    memory: ClientCurrentResourceUsage;
    containers: ClientContainerStatus[];
}
/** @public */
interface DeploymentResources {
    pods: V1Pod[];
    replicaSets: V1ReplicaSet[];
    deployments: V1Deployment[];
    horizontalPodAutoscalers: V2HorizontalPodAutoscaler[];
}
/** @public */
interface GroupedResponses extends DeploymentResources {
    services: V1Service[];
    configMaps: V1ConfigMap[];
    ingresses: V1Ingress[];
    jobs: V1Job[];
    cronJobs: V1CronJob[];
    customResources: any[];
    statefulsets: V1StatefulSet[];
    daemonSets: V1DaemonSet[];
}

/**
 * Annotation for specifying the API server of a Kubernetes cluster
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_API_SERVER = "kubernetes.io/api-server";
/**
 * Annotation for specifying the Certificate Authority of an API server for a Kubernetes cluster
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_API_SERVER_CA = "kubernetes.io/api-server-certificate-authority";
/**
 * Annotation for specifying the auth provider for a Kubernetes cluster
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_AUTH_PROVIDER = "kubernetes.io/auth-provider";
/**
 * Annotation for specifying the oidc provider used to get id tokens for a Kubernetes cluster
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_OIDC_TOKEN_PROVIDER = "kubernetes.io/oidc-token-provider";
/**
 * Annotation for specifying boolean value for skip metric lookup.
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_SKIP_METRICS_LOOKUP = "kubernetes.io/skip-metrics-lookup";
/**
 * Annotation for specifying boolean value for skip tls verify.
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_SKIP_TLS_VERIFY = "kubernetes.io/skip-tls-verify";
/**
 * Annotation for specifying the dashboard url for a Kubernetes cluster.
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_DASHBOARD_URL = "kubernetes.io/dashboard-url";
/**
 * Annotation for specifying the dashboard app for a Kubernetes cluster.
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_DASHBOARD_APP = "kubernetes.io/dashboard-app";
/**
 * Annotation for specifying the dashboard app parameters for a Kubernetes cluster.
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_DASHBOARD_PARAMETERS = "kubernetes.io/dashboard-parameters";
/**
 * Annotation for specifying the assume role use to authenticate with AWS.
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_AWS_ASSUME_ROLE = "kubernetes.io/aws-assume-role";
/**
 * Annotation for specifying the AWS ID of a cluster when signing STS tokens
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_AWS_CLUSTER_ID = "kubernetes.io/x-k8s-aws-id";
/**
 * Annotation for specifying an external id when communicating with AWS
 *
 * @public
 */
declare const ANNOTATION_KUBERNETES_AWS_EXTERNAL_ID = "kubernetes.io/aws-external-id";

/** This permission is used to check access to the proxy endpoint
 * @public
 */
declare const kubernetesProxyPermission: _backstage_plugin_permission_common.BasicPermission;
/**
 * List of all Kubernetes permissions.
 * @public
 */
declare const kubernetesPermissions: _backstage_plugin_permission_common.BasicPermission[];

/**
 * Severity of the error, where 10 is critical and 0 is very low.
 *
 * @public
 */
type ErrorSeverity = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
/**
 * A list of errors keyed by Cluster name
 *
 * @public
 */
type DetectedErrorsByCluster = Map<string, DetectedError[]>;
/**
 * A reference to a Kubernetes object
 *
 * @public
 */
interface ResourceRef {
    name: string;
    namespace: string;
    kind: string;
    apiGroup: string;
}
/**
 * Represents an error found on a Kubernetes object
 *
 * @public
 */
interface DetectedError {
    type: string;
    severity: ErrorSeverity;
    message: string;
    proposedFix?: ProposedFix;
    sourceRef: ResourceRef;
    occurrenceCount: number;
}
/** @public */
type ProposedFix = LogSolution | DocsSolution | EventsSolution;
/** @public */
interface ProposedFixBase {
    errorType: string;
    rootCauseExplanation: string;
    actions: string[];
}
/** @public */
interface LogSolution extends ProposedFixBase {
    type: 'logs';
    container: string;
}
/** @public */
interface DocsSolution extends ProposedFixBase {
    type: 'docs';
    docsLink: string;
}
/** @public */
interface EventsSolution extends ProposedFixBase {
    type: 'events';
    podName: string;
}
/** @public */
interface ErrorMapper<T> {
    detectErrors: (resource: T) => DetectedError[];
}

/**
 * For each cluster try to find errors in each of the object types provided
 * returning a map of cluster names to errors in that cluster
 *
 * @public
 */
declare const detectErrors: (objects: ObjectsByEntityResponse$1) => DetectedErrorsByCluster;

/** @public */
declare const groupResponses: (fetchResponse: FetchResponse$1[]) => GroupedResponses;

export { ANNOTATION_KUBERNETES_API_SERVER, ANNOTATION_KUBERNETES_API_SERVER_CA, ANNOTATION_KUBERNETES_AUTH_PROVIDER, ANNOTATION_KUBERNETES_AWS_ASSUME_ROLE, ANNOTATION_KUBERNETES_AWS_CLUSTER_ID, ANNOTATION_KUBERNETES_AWS_EXTERNAL_ID, ANNOTATION_KUBERNETES_DASHBOARD_APP, ANNOTATION_KUBERNETES_DASHBOARD_PARAMETERS, ANNOTATION_KUBERNETES_DASHBOARD_URL, ANNOTATION_KUBERNETES_OIDC_TOKEN_PROVIDER, ANNOTATION_KUBERNETES_SKIP_METRICS_LOOKUP, ANNOTATION_KUBERNETES_SKIP_TLS_VERIFY, type AuthProviderType, type ClientContainerStatus, type ClientCurrentResourceUsage, type ClientPodStatus, type ClusterAttributes, type ClusterObjects, type ConfigMapFetchResponse, type CronJobsFetchResponse, type CustomObjectsByEntityRequest, type CustomResourceFetchResponse, type CustomResourceMatcher, type DaemonSetsFetchResponse, type DeploymentFetchResponse, type DeploymentResources, type DetectedError, type DetectedErrorsByCluster, type DocsSolution, type ErrorMapper, type ErrorSeverity, type EventsSolution, type FetchResponse, type GroupedResponses, type HorizontalPodAutoscalersFetchResponse, type IngressesFetchResponse, type JobsFetchResponse, type KubernetesErrorTypes, type KubernetesFetchError, type KubernetesRequestAuth, type KubernetesRequestBody, type LimitRangeFetchResponse, type LogSolution, type ObjectsByEntityResponse, type PodFetchResponse, type PodStatusFetchResponse, type ProposedFix, type ProposedFixBase, type RawFetchError, type ReplicaSetsFetchResponse, type ResourceQuotaFetchResponse, type ResourceRef, type ServiceFetchResponse, type StatefulSetsFetchResponse, type StatusError, type WorkloadsByEntityRequest, detectErrors, groupResponses, kubernetesPermissions, kubernetesProxyPermission };
