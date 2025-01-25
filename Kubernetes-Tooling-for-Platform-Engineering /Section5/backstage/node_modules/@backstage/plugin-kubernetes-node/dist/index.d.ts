import * as _backstage_backend_plugin_api from '@backstage/backend-plugin-api';
import { BackstageCredentials } from '@backstage/backend-plugin-api';
import { KubernetesObjectsProvider as KubernetesObjectsProvider$1, KubernetesClustersSupplier as KubernetesClustersSupplier$1, AuthenticationStrategy as AuthenticationStrategy$1, KubernetesFetcher as KubernetesFetcher$1, KubernetesServiceLocator as KubernetesServiceLocator$1, ClusterDetails as ClusterDetails$1 } from '@backstage/plugin-kubernetes-node';
import { Entity } from '@backstage/catalog-model';
import { ObjectsByEntityResponse, KubernetesRequestAuth, CustomResourceMatcher, KubernetesFetchError, FetchResponse } from '@backstage/plugin-kubernetes-common';
import { JsonObject } from '@backstage/types';
import { Logger } from 'winston';

/**
 * The interface for {@link kubernetesObjectsProviderExtensionPoint}.
 *
 * @public
 */
interface KubernetesObjectsProviderExtensionPoint {
    addObjectsProvider(provider: KubernetesObjectsProvider$1): void;
}
/**
 * An extension point the exposes the ability to configure a objects provider.
 *
 * @public
 */
declare const kubernetesObjectsProviderExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<KubernetesObjectsProviderExtensionPoint>;
/**
 * The interface for {@link kubernetesClusterSupplierExtensionPoint}.
 *
 * @public
 */
interface KubernetesClusterSupplierExtensionPoint {
    addClusterSupplier(clusterSupplier: KubernetesClustersSupplier$1): void;
}
/**
 * An extension point the exposes the ability to configure a cluster supplier.
 *
 * @public
 */
declare const kubernetesClusterSupplierExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<KubernetesClusterSupplierExtensionPoint>;
/**
 * The interface for {@link kubernetesAuthStrategyExtensionPoint}.
 *
 * @public
 */
interface KubernetesAuthStrategyExtensionPoint {
    addAuthStrategy(key: string, strategy: AuthenticationStrategy$1): void;
}
/**
 * An extension point the exposes the ability to add an Auth Strategy.
 *
 * @public
 */
declare const kubernetesAuthStrategyExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<KubernetesAuthStrategyExtensionPoint>;
/**
 * The interface for {@link kubernetesFetcherExtensionPoint}.
 *
 * @public
 */
interface KubernetesFetcherExtensionPoint {
    addFetcher(fetcher: KubernetesFetcher$1): void;
}
/**
 * An extension point the exposes the ability to configure a kubernetes fetcher.
 *
 * @public
 */
declare const kubernetesFetcherExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<KubernetesFetcherExtensionPoint>;
/**
 * The interface for {@link kubernetesServiceLocatorExtensionPoint}.
 *
 * @public
 */
interface KubernetesServiceLocatorExtensionPoint {
    addServiceLocator(serviceLocator: KubernetesServiceLocator$1): void;
}
/**
 * An extension point the exposes the ability to configure a kubernetes service locator.
 *
 * @public
 */
declare const kubernetesServiceLocatorExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<KubernetesServiceLocatorExtensionPoint>;

/**
 *
 * @public
 */
interface KubernetesObjectsProvider {
    getKubernetesObjectsByEntity(kubernetesObjectsByEntity: KubernetesObjectsByEntity, options: {
        credentials: BackstageCredentials;
    }): Promise<ObjectsByEntityResponse>;
    getCustomResourcesByEntity(customResourcesByEntity: CustomResourcesByEntity, options: {
        credentials: BackstageCredentials;
    }): Promise<ObjectsByEntityResponse>;
}
/**
 *
 * @public
 */
interface KubernetesObjectsByEntity {
    entity: Entity;
    auth: KubernetesRequestAuth;
}
/**
 *
 * @public
 */
interface CustomResourcesByEntity extends KubernetesObjectsByEntity {
    customResources: CustomResourceMatcher[];
}
/**
 * Provider-specific authentication configuration
 * @public
 */
type AuthMetadata = Record<string, string>;
/**
 *
 * @public
 */
interface ClusterDetails {
    /**
     * Name of the Kubernetes cluster; used as an internal identifier.
     */
    name: string;
    /**
     * Human-readable name for the cluster, to be dispayed in UIs.
     */
    title?: string;
    url: string;
    authMetadata: AuthMetadata;
    skipTLSVerify?: boolean;
    /**
     * Whether to skip the lookup to the metrics server to retrieve pod resource usage.
     * It is not guaranteed that the Kubernetes distro has the metrics server installed.
     */
    skipMetricsLookup?: boolean;
    caData?: string | undefined;
    caFile?: string | undefined;
    /**
     * Specifies the link to the Kubernetes dashboard managing this cluster.
     * @remarks
     * Note that you should specify the app used for the dashboard
     * using the dashboardApp property, in order to properly format
     * links to kubernetes resources, otherwise it will assume that you're running the standard one.
     * @see dashboardApp
     * @see dashboardParameters
     */
    dashboardUrl?: string;
    /**
     * Specifies the app that provides the Kubernetes dashboard.
     * This will be used for formatting links to kubernetes objects inside the dashboard.
     * @remarks
     * The existing apps are: standard, rancher, openshift, gke, aks, eks
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
     * @see dashboardApp
     */
    dashboardParameters?: JsonObject;
    /**
     * Specifies which custom resources to look for when returning an entity's
     * Kubernetes resources.
     */
    customResources?: CustomResourceMatcher[];
}
/**
 * Used to load cluster details from different sources
 * @public
 */
interface KubernetesClustersSupplier {
    /**
     * Returns the cached list of clusters.
     *
     * Implementations _should_ cache the clusters and refresh them periodically,
     * as getClusters is called whenever the list of clusters is needed.
     */
    getClusters(options: {
        credentials: BackstageCredentials;
    }): Promise<ClusterDetails[]>;
}
/**
 * Authentication data used to make a request to Kubernetes
 * @public
 */
type KubernetesCredential = {
    type: 'bearer token';
    token: string;
} | {
    type: 'x509 client certificate';
    cert: string;
    key: string;
} | {
    type: 'anonymous';
};
/**
 *
 * @public
 */
interface AuthenticationStrategy {
    getCredential(clusterDetails: ClusterDetails, authConfig: KubernetesRequestAuth): Promise<KubernetesCredential>;
    validateCluster(authMetadata: AuthMetadata): Error[];
    presentAuthMetadata(authMetadata: AuthMetadata): AuthMetadata;
}
/**
 *
 * @public
 */
type KubernetesObjectTypes = 'pods' | 'services' | 'configmaps' | 'deployments' | 'limitranges' | 'resourcequotas' | 'replicasets' | 'horizontalpodautoscalers' | 'jobs' | 'cronjobs' | 'ingresses' | 'customresources' | 'statefulsets' | 'daemonsets';
/**
 *
 * @public
 */
interface ObjectToFetch {
    objectType: KubernetesObjectTypes;
    group: string;
    apiVersion: string;
    plural: string;
}
/**
 *
 * @public
 */
interface CustomResource extends ObjectToFetch {
    objectType: 'customresources';
}
/**
 *
 * @public
 */
interface ObjectFetchParams {
    serviceId: string;
    clusterDetails: ClusterDetails;
    credential: KubernetesCredential;
    objectTypesToFetch: Set<ObjectToFetch>;
    labelSelector?: string;
    customResources: CustomResource[];
    namespace?: string;
}
/**
 *
 * @public
 */
interface FetchResponseWrapper {
    errors: KubernetesFetchError[];
    responses: FetchResponse[];
}
/**
 * Fetches information from a kubernetes cluster using the cluster details object to target a specific cluster
 *
 * @public
 */
interface KubernetesFetcher {
    fetchObjectsForService(params: ObjectFetchParams): Promise<FetchResponseWrapper>;
    fetchPodMetricsByNamespaces(clusterDetails: ClusterDetails, credential: KubernetesCredential, namespaces: Set<string>, labelSelector?: string): Promise<FetchResponseWrapper>;
}
/**
 * @public
 */
interface ServiceLocatorRequestContext {
    objectTypesToFetch: Set<ObjectToFetch>;
    customResources: CustomResourceMatcher[];
    credentials: BackstageCredentials;
}
/**
 * Used to locate which cluster(s) a service is running on
 * @public
 */
interface KubernetesServiceLocator {
    getClustersByEntity(entity: Entity, requestContext: ServiceLocatorRequestContext): Promise<{
        clusters: ClusterDetails[];
    }>;
}

/**
 *
 * @public
 */
type PinnipedClientCerts = {
    key: string;
    cert: string;
    expirationTimestamp: string;
};
/**
 *
 * @public
 */
type PinnipedParameters = {
    clusterScopedIdToken: string;
    authenticator: {
        apiGroup: string;
        kind: string;
        name: string;
    };
    tokenCredentialRequest?: {
        apiGroup?: string;
    };
};
/**
 *
 * @public
 */
declare class PinnipedHelper {
    private readonly logger;
    constructor(logger: Logger);
    tokenCredentialRequest(clusterDetails: ClusterDetails$1, pinnipedParams: PinnipedParameters): Promise<PinnipedClientCerts>;
    private exchangeClusterTokentoClientCerts;
    private buildRequestForPinniped;
}

export { type AuthMetadata, type AuthenticationStrategy, type ClusterDetails, type CustomResource, type CustomResourcesByEntity, type FetchResponseWrapper, type KubernetesAuthStrategyExtensionPoint, type KubernetesClusterSupplierExtensionPoint, type KubernetesClustersSupplier, type KubernetesCredential, type KubernetesFetcher, type KubernetesFetcherExtensionPoint, type KubernetesObjectTypes, type KubernetesObjectsByEntity, type KubernetesObjectsProvider, type KubernetesObjectsProviderExtensionPoint, type KubernetesServiceLocator, type KubernetesServiceLocatorExtensionPoint, type ObjectFetchParams, type ObjectToFetch, type PinnipedClientCerts, PinnipedHelper, type PinnipedParameters, type ServiceLocatorRequestContext, kubernetesAuthStrategyExtensionPoint, kubernetesClusterSupplierExtensionPoint, kubernetesFetcherExtensionPoint, kubernetesObjectsProviderExtensionPoint, kubernetesServiceLocatorExtensionPoint };
