import * as _backstage_backend_plugin_api from '@backstage/backend-plugin-api';
import { LoggerService, PermissionsService, DiscoveryService, HttpAuthService, AuthService, BackstageCredentials, RootConfigService } from '@backstage/backend-plugin-api';
import * as k8sTypes from '@backstage/plugin-kubernetes-node';
import { AuthenticationStrategy as AuthenticationStrategy$1, ClusterDetails as ClusterDetails$1, KubernetesCredential as KubernetesCredential$1, AuthMetadata as AuthMetadata$1, KubernetesClustersSupplier as KubernetesClustersSupplier$1, CustomResource as CustomResource$1, KubernetesFetcher as KubernetesFetcher$1, KubernetesObjectsProvider as KubernetesObjectsProvider$1, KubernetesServiceLocator as KubernetesServiceLocator$1 } from '@backstage/plugin-kubernetes-node';
import { KubernetesRequestAuth, KubernetesRequestBody } from '@backstage/plugin-kubernetes-common';
import { Config } from '@backstage/config';
import { TokenCredential } from '@azure/identity';
import { CatalogApi } from '@backstage/catalog-client';
import { PermissionEvaluator } from '@backstage/plugin-permission-common';
import express from 'express';
import { Duration } from 'luxon';
import { RequestHandler } from 'http-proxy-middleware';
import { Logger } from 'winston';

/**
 * This is the backend plugin that provides the Kubernetes integration.
 * @public
 */
declare const kubernetesPlugin: _backstage_backend_plugin_api.BackendFeature;

/**
 *
 * @public
 */
declare class AksStrategy implements AuthenticationStrategy$1 {
    getCredential(_: ClusterDetails$1, requestAuth: KubernetesRequestAuth): Promise<KubernetesCredential$1>;
    validateCluster(): Error[];
    presentAuthMetadata(_authMetadata: AuthMetadata$1): AuthMetadata$1;
}

/**
 *
 * @public
 */
declare class AnonymousStrategy implements AuthenticationStrategy$1 {
    getCredential(): Promise<KubernetesCredential$1>;
    validateCluster(): Error[];
    presentAuthMetadata(_authMetadata: AuthMetadata$1): AuthMetadata$1;
}

/**
 *
 * @public
 */
type SigningCreds = {
    accessKeyId: string | undefined;
    secretAccessKey: string | undefined;
    sessionToken: string | undefined;
};
/**
 *
 * @public
 */
declare class AwsIamStrategy implements AuthenticationStrategy$1 {
    private readonly credsManager;
    constructor(opts: {
        config: Config;
    });
    getCredential(clusterDetails: ClusterDetails$1): Promise<KubernetesCredential$1>;
    validateCluster(): Error[];
    private getBearerToken;
    presentAuthMetadata(_authMetadata: AuthMetadata$1): AuthMetadata$1;
}

/**
 *
 * @public
 */
declare class AzureIdentityStrategy implements AuthenticationStrategy$1 {
    private readonly logger;
    private readonly tokenCredential;
    private accessToken;
    private newTokenPromise;
    constructor(logger: LoggerService, tokenCredential?: TokenCredential);
    getCredential(): Promise<KubernetesCredential$1>;
    validateCluster(): Error[];
    private fetchNewToken;
    private tokenRequiresRefresh;
    private tokenExpired;
    presentAuthMetadata(_authMetadata: AuthMetadata$1): AuthMetadata$1;
}

/**
 *
 * @public
 */
declare class GoogleStrategy implements AuthenticationStrategy$1 {
    getCredential(_: ClusterDetails$1, requestAuth: KubernetesRequestAuth): Promise<KubernetesCredential$1>;
    validateCluster(): Error[];
    presentAuthMetadata(_authMetadata: AuthMetadata$1): AuthMetadata$1;
}

/**
 *
 * @public
 */
declare class GoogleServiceAccountStrategy implements AuthenticationStrategy$1 {
    getCredential(): Promise<KubernetesCredential$1>;
    validateCluster(): Error[];
    presentAuthMetadata(_authMetadata: AuthMetadata$1): AuthMetadata$1;
}

/**
 *
 * @public
 */
type DispatchStrategyOptions = {
    authStrategyMap: {
        [key: string]: AuthenticationStrategy$1;
    };
};
/**
 * used to direct a KubernetesAuthProvider to its corresponding AuthenticationStrategy
 * @public
 */
declare class DispatchStrategy implements AuthenticationStrategy$1 {
    private readonly strategyMap;
    constructor(options: DispatchStrategyOptions);
    getCredential(clusterDetails: ClusterDetails$1, auth: KubernetesRequestAuth): Promise<KubernetesCredential$1>;
    validateCluster(authMetadata: AuthMetadata$1): Error[];
    presentAuthMetadata(_authMetadata: AuthMetadata$1): AuthMetadata$1;
}

/**
 *
 * @public
 */
declare class ServiceAccountStrategy implements AuthenticationStrategy$1 {
    getCredential(clusterDetails: ClusterDetails$1): Promise<KubernetesCredential$1>;
    validateCluster(): Error[];
    presentAuthMetadata(_authMetadata: AuthMetadata$1): AuthMetadata$1;
}

/**
 *
 * @public
 */
declare class OidcStrategy implements AuthenticationStrategy$1 {
    getCredential(clusterDetails: ClusterDetails$1, authConfig: KubernetesRequestAuth): Promise<KubernetesCredential$1>;
    validateCluster(authMetadata: AuthMetadata$1): Error[];
    presentAuthMetadata(_authMetadata: AuthMetadata$1): AuthMetadata$1;
}

/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type AuthenticationStrategy = k8sTypes.AuthenticationStrategy;
/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type KubernetesCredential = k8sTypes.KubernetesCredential;

/**
 *
 * @public
 */
type ServiceLocatorMethod = 'multiTenant' | 'singleTenant' | 'catalogRelation' | 'http';
/**
 *
 * @public
 */
interface KubernetesObjectsProviderOptions {
    logger: LoggerService;
    config: Config;
    fetcher: k8sTypes.KubernetesFetcher;
    serviceLocator: k8sTypes.KubernetesServiceLocator;
    customResources: k8sTypes.CustomResource[];
    objectTypesToFetch?: k8sTypes.ObjectToFetch[];
}
/**
 *
 * @public
 */
type ObjectsByEntityRequest = KubernetesRequestBody;
/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type KubernetesObjectsProvider = k8sTypes.KubernetesObjectsProvider;
/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type CustomResourcesByEntity = k8sTypes.CustomResourcesByEntity;
/**
 * @public
 * @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type AuthMetadata = k8sTypes.AuthMetadata;
/**
 * @public
 * @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type ClusterDetails = k8sTypes.ClusterDetails;
/**
 * @public
 * @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type KubernetesClustersSupplier = k8sTypes.KubernetesClustersSupplier;
/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type KubernetesObjectTypes = k8sTypes.KubernetesObjectTypes;
/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type ObjectToFetch = k8sTypes.ObjectToFetch;
/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type CustomResource = k8sTypes.CustomResource;
/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type ObjectFetchParams = k8sTypes.ObjectFetchParams;
/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type FetchResponseWrapper = k8sTypes.FetchResponseWrapper;
/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type KubernetesFetcher = k8sTypes.KubernetesFetcher;
/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type ServiceLocatorRequestContext = k8sTypes.ServiceLocatorRequestContext;
/**
 * @public @deprecated Import it from \@backstage/plugin-kubernetes-node instead
 */
type KubernetesServiceLocator = k8sTypes.KubernetesServiceLocator;

/**
 * The header that is used to specify the cluster name.
 *
 * @public
 */
declare const HEADER_KUBERNETES_CLUSTER: string;
/**
 * The header that is used to specify the Authentication Authorities token.
 * e.x if using the google auth provider as your authentication authority then this field would be the google provided bearer token.
 * @public
 */
declare const HEADER_KUBERNETES_AUTH: string;
/**
 * The options object expected to be passed as a parameter to KubernetesProxy.createRequestHandler().
 *
 * @public
 */
type KubernetesProxyCreateRequestHandlerOptions = {
    permissionApi: PermissionsService;
};
/**
 * Options accepted as a parameter by the KubernetesProxy
 *
 * @public
 */
type KubernetesProxyOptions = {
    logger: LoggerService;
    clusterSupplier: KubernetesClustersSupplier;
    authStrategy: AuthenticationStrategy;
    discovery: DiscoveryService;
    httpAuth?: HttpAuthService;
};
/**
 * A proxy that routes requests to the Kubernetes API.
 *
 * @public
 */
declare class KubernetesProxy {
    private readonly middlewareForClusterName;
    private readonly logger;
    private readonly clusterSupplier;
    private readonly authStrategy;
    private readonly httpAuth;
    constructor(options: KubernetesProxyOptions);
    createRequestHandler(options: KubernetesProxyCreateRequestHandlerOptions): RequestHandler;
    private getMiddleware;
    private getClusterForRequest;
    private static authHeadersToKubernetesRequestAuth;
    private static headerToDictionary;
    private static combineHeaders;
}

/**
 * @deprecated Please migrate to the new backend system as this will be removed in the future.
 * @public
 */
interface KubernetesEnvironment {
    logger: LoggerService;
    config: Config;
    catalogApi: CatalogApi;
    discovery: DiscoveryService;
    permissions: PermissionEvaluator;
    auth?: AuthService;
    httpAuth?: HttpAuthService;
}
/**
 * The return type of the `KubernetesBuilder.build` method
 * @deprecated Please migrate to the new backend system as this will be removed in the future.
 * @public
 */
type KubernetesBuilderReturn = Promise<{
    router: express.Router;
    clusterSupplier: KubernetesClustersSupplier$1;
    customResources: CustomResource$1[];
    fetcher: KubernetesFetcher$1;
    proxy: KubernetesProxy;
    objectsProvider: KubernetesObjectsProvider$1;
    serviceLocator: KubernetesServiceLocator$1;
    authStrategyMap: {
        [key: string]: AuthenticationStrategy$1;
    };
}>;
/**
 * @deprecated Please migrate to the new backend system as this will be removed in the future.
 * @public
 * */
declare class KubernetesBuilder {
    protected readonly env: KubernetesEnvironment;
    private clusterSupplier?;
    private defaultClusterRefreshInterval;
    private objectsProvider?;
    private fetcher?;
    private serviceLocator?;
    private proxy?;
    private authStrategyMap?;
    static createBuilder(env: KubernetesEnvironment): KubernetesBuilder;
    constructor(env: KubernetesEnvironment);
    build(): KubernetesBuilderReturn;
    setClusterSupplier(clusterSupplier?: KubernetesClustersSupplier$1): this;
    setDefaultClusterRefreshInterval(refreshInterval: Duration): this;
    setObjectsProvider(objectsProvider?: KubernetesObjectsProvider$1): this;
    setFetcher(fetcher?: KubernetesFetcher$1): this;
    setServiceLocator(serviceLocator?: KubernetesServiceLocator$1): this;
    setProxy(proxy?: KubernetesProxy): this;
    setAuthStrategyMap(authStrategyMap: {
        [key: string]: AuthenticationStrategy$1;
    }): void;
    addAuthStrategy(key: string, strategy: AuthenticationStrategy$1): this;
    protected buildCustomResources(): CustomResource$1[];
    protected buildClusterSupplier(refreshInterval: Duration): KubernetesClustersSupplier$1;
    protected buildObjectsProvider(options: KubernetesObjectsProviderOptions): KubernetesObjectsProvider$1;
    protected buildFetcher(): KubernetesFetcher$1;
    protected buildServiceLocator(method: ServiceLocatorMethod, clusterSupplier: KubernetesClustersSupplier$1): KubernetesServiceLocator$1;
    protected buildMultiTenantServiceLocator(clusterSupplier: KubernetesClustersSupplier$1): KubernetesServiceLocator$1;
    protected buildSingleTenantServiceLocator(clusterSupplier: KubernetesClustersSupplier$1): KubernetesServiceLocator$1;
    protected buildCatalogRelationServiceLocator(clusterSupplier: KubernetesClustersSupplier$1): KubernetesServiceLocator$1;
    protected buildHttpServiceLocator(_clusterSupplier: KubernetesClustersSupplier$1): KubernetesServiceLocator$1;
    protected buildProxy(logger: LoggerService, clusterSupplier: KubernetesClustersSupplier$1, discovery: DiscoveryService, httpAuth: HttpAuthService): KubernetesProxy;
    protected buildRouter(objectsProvider: KubernetesObjectsProvider$1, clusterSupplier: KubernetesClustersSupplier$1, catalogApi: CatalogApi, proxy: KubernetesProxy, permissionApi: PermissionEvaluator, authService: AuthService, httpAuth: HttpAuthService): express.Router;
    protected buildAuthStrategyMap(): {
        [key: string]: AuthenticationStrategy$1;
    };
    protected fetchClusterDetails(clusterSupplier: KubernetesClustersSupplier$1, options: {
        credentials: BackstageCredentials;
    }): Promise<k8sTypes.ClusterDetails[]>;
    protected getServiceLocatorMethod(): ServiceLocatorMethod;
    protected getFetcher(): KubernetesFetcher$1;
    protected getClusterSupplier(): KubernetesClustersSupplier$1;
    protected getServiceLocator(): KubernetesServiceLocator$1;
    protected getObjectsProvider(options: KubernetesObjectsProviderOptions): KubernetesObjectsProvider$1;
    protected getObjectTypesToFetch(): k8sTypes.ObjectToFetch[] | undefined;
    protected getProxy(logger: LoggerService, clusterSupplier: KubernetesClustersSupplier$1, discovery: DiscoveryService, httpAuth: HttpAuthService): KubernetesProxy;
    protected getAuthStrategyMap(): {
        [key: string]: AuthenticationStrategy$1;
    };
}

/**
 *
 * @public
 */
declare const DEFAULT_OBJECTS: ObjectToFetch[];

/**
 * @deprecated Please migrate to the new backend system as this will be removed in the future.
 * @public
 */
interface RouterOptions {
    logger: Logger;
    config: RootConfigService;
    catalogApi: CatalogApi;
    clusterSupplier?: KubernetesClustersSupplier;
    discovery: DiscoveryService;
    permissions: PermissionEvaluator;
}
/**
 * creates and configure a new router for handling the kubernetes backend APIs
 * @param options - specifies the options required by this plugin
 * @returns a new router
 * @deprecated Please migrate to the new backend system as this will be removed in the future.
 * ```
 * import { KubernetesBuilder } from '@backstage/plugin-kubernetes-backend';
 * const { router } = await KubernetesBuilder.createBuilder({
 *   logger,
 *   config,
 * }).build();
 * ```
 *
 * @public
 */
declare function createRouter(options: RouterOptions): Promise<express.Router>;

export { AksStrategy, AnonymousStrategy, type AuthMetadata, type AuthenticationStrategy, AwsIamStrategy, AzureIdentityStrategy, type ClusterDetails, type CustomResource, type CustomResourcesByEntity, DEFAULT_OBJECTS, DispatchStrategy, type DispatchStrategyOptions, type FetchResponseWrapper, GoogleServiceAccountStrategy, GoogleStrategy, HEADER_KUBERNETES_AUTH, HEADER_KUBERNETES_CLUSTER, KubernetesBuilder, type KubernetesBuilderReturn, type KubernetesClustersSupplier, type KubernetesCredential, type KubernetesEnvironment, type KubernetesFetcher, type KubernetesObjectTypes, type KubernetesObjectsProvider, type KubernetesObjectsProviderOptions, KubernetesProxy, type KubernetesProxyCreateRequestHandlerOptions, type KubernetesProxyOptions, type KubernetesServiceLocator, type ObjectFetchParams, type ObjectToFetch, type ObjectsByEntityRequest, OidcStrategy, type RouterOptions, ServiceAccountStrategy, type ServiceLocatorMethod, type ServiceLocatorRequestContext, type SigningCreds, createRouter, kubernetesPlugin as default };
