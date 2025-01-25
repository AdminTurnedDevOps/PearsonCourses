import { Entity } from '@backstage/catalog-model';
import { PreparerBuilder, GeneratorBuilder, PublisherBase, DocsBuildStrategy as DocsBuildStrategy$1, TechDocsDocument as TechDocsDocument$1 } from '@backstage/plugin-techdocs-node';
export * from '@backstage/plugin-techdocs-node';
import * as _backstage_backend_plugin_api from '@backstage/backend-plugin-api';
import { DiscoveryService, HttpAuthService, AuthService } from '@backstage/backend-plugin-api';
import { PluginCacheManager, TokenManager } from '@backstage/backend-common';
import { CatalogApi } from '@backstage/catalog-client';
import { Config } from '@backstage/config';
import express from 'express';
import { Knex } from 'knex';
import * as winston from 'winston';
import { Logger } from 'winston';
import { TechDocsCollatorFactoryOptions as TechDocsCollatorFactoryOptions$1, DefaultTechDocsCollatorFactory as DefaultTechDocsCollatorFactory$1 } from '@backstage/plugin-search-backend-module-techdocs';
import { Permission } from '@backstage/plugin-permission-common';

/**
 * The TechDocs plugin is responsible for serving and building documentation for any entity.
 * @public
 */
declare const techdocsPlugin: _backstage_backend_plugin_api.BackendFeature;

/**
 * Required dependencies for running TechDocs in the "out-of-the-box"
 * deployment configuration (prepare/generate/publish all in the Backend).
 *
 * @public
 */
type OutOfTheBoxDeploymentOptions = {
    preparers: PreparerBuilder;
    generators: GeneratorBuilder;
    publisher: PublisherBase;
    logger: winston.Logger;
    discovery: DiscoveryService;
    database?: Knex;
    config: Config;
    cache: PluginCacheManager;
    docsBuildStrategy?: DocsBuildStrategy$1;
    buildLogTransport?: winston.transport;
    catalogClient?: CatalogApi;
    httpAuth?: HttpAuthService;
    auth?: AuthService;
};
/**
 * Required dependencies for running TechDocs in the "recommended" deployment
 * configuration (prepare/generate handled externally in CI/CD).
 *
 * @public
 * @deprecated This type is only exported for legacy reasons and will be removed in the future.
 */
type RecommendedDeploymentOptions = {
    publisher: PublisherBase;
    logger: winston.Logger;
    discovery: DiscoveryService;
    config: Config;
    cache: PluginCacheManager;
    docsBuildStrategy?: DocsBuildStrategy$1;
    buildLogTransport?: winston.transport;
    catalogClient?: CatalogApi;
    httpAuth?: HttpAuthService;
    auth?: AuthService;
};
/**
 * One of the two deployment configurations must be provided.
 *
 * @public
 * @deprecated This type is only exported for legacy reasons and will be removed in the future.
 */
type RouterOptions = RecommendedDeploymentOptions | OutOfTheBoxDeploymentOptions;
/**
 * Creates a techdocs router.
 *
 * @public
 * @deprecated This function is only exported for legacy reasons and will be removed in the future.
 * Please {@link https://backstage.io/docs/backend-system/building-backends/migrating | migrate } to use the new backend system and follow these {@link https://backstage.io/docs/features/techdocs/getting-started#new-backend-system | instructions } to install the user settings backend plugin.
 */
declare function createRouter(options: RouterOptions): Promise<express.Router>;

/**
 * Options to configure the TechDocs collator
 *
 * @public
 */
type TechDocsCollatorOptions = {
    discovery: DiscoveryService;
    logger: Logger;
    tokenManager: TokenManager;
    locationTemplate?: string;
    catalogClient?: CatalogApi;
    parallelismLimit?: number;
    legacyPathCasing?: boolean;
};
/**
 * A search collator responsible for gathering and transforming TechDocs documents.
 *
 * @public
 * @deprecated Upgrade to a more recent `@backstage/plugin-search-backend-node` and
 * use `DefaultTechDocsCollatorFactory` instead.
 */
declare class DefaultTechDocsCollator {
    private readonly legacyPathCasing;
    private readonly options;
    readonly type: string;
    readonly visibilityPermission: Permission;
    private constructor();
    static fromConfig(config: Config, options: TechDocsCollatorOptions): DefaultTechDocsCollator;
    execute(): Promise<TechDocsDocument$1[]>;
    protected applyArgsToFormat(format: string, args: Record<string, string>): string;
    private static constructDocsIndexUrl;
    private static handleEntityInfoCasing;
}

/**
 * todo(backstage/techdocs-core): stop exporting these in a future release.
 */

/**
 * @public
 * @deprecated import from `@backstage/plugin-search-backend-module-techdocs` instead
 */
type TechDocsCollatorFactoryOptions = TechDocsCollatorFactoryOptions$1;
/**
 * @public
 * @deprecated import from `@backstage/plugin-search-backend-module-techdocs` instead
 */
declare const DefaultTechDocsCollatorFactory: typeof DefaultTechDocsCollatorFactory$1;

/**
 * The Backstage backend plugin that renders technical documentation for your components
 *
 * @packageDocumentation
 */

/**
 * @public
 * @deprecated import from `@backstage/plugin-techdocs-node` instead
 */
type DocsBuildStrategy = DocsBuildStrategy$1;
/**
 * @public
 * @deprecated use direct type definition instead
 */
type ShouldBuildParameters = {
    entity: Entity;
};
/**
 * @public
 * @deprecated import from `@backstage/plugin-techdocs-node` instead
 */
type TechDocsDocument = TechDocsDocument$1;

export { DefaultTechDocsCollator, DefaultTechDocsCollatorFactory, type DocsBuildStrategy, type OutOfTheBoxDeploymentOptions, type RecommendedDeploymentOptions, type RouterOptions, type ShouldBuildParameters, type TechDocsCollatorFactoryOptions, type TechDocsCollatorOptions, type TechDocsDocument, createRouter, techdocsPlugin as default };
