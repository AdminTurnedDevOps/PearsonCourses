/// <reference types="node" />
import * as _backstage_backend_plugin_api from '@backstage/backend-plugin-api';
import { DiscoveryService, LoggerService, AuthService, HttpAuthService } from '@backstage/backend-plugin-api';
import { TechDocsCollatorEntityTransformer as TechDocsCollatorEntityTransformer$1, TechDocsCollatorDocumentTransformer as TechDocsCollatorDocumentTransformer$1 } from '@backstage/plugin-search-backend-module-techdocs';
import { TokenManager } from '@backstage/backend-common';
import { CatalogApi } from '@backstage/catalog-client';
import { Config } from '@backstage/config';
import { Permission } from '@backstage/plugin-permission-common';
import { DocumentCollatorFactory } from '@backstage/plugin-search-common';
import { Readable } from 'stream';
import { Entity } from '@backstage/catalog-model';
import { TechDocsDocument } from '@backstage/plugin-techdocs-node';

/** @public */
interface TechDocsCollatorEntityTransformerExtensionPoint {
    setTransformer(transformer: TechDocsCollatorEntityTransformer$1): void;
    setDocumentTransformer(transformer: TechDocsCollatorDocumentTransformer$1): void;
}
/**
 * Extension point used to customize the TechDocs collator entity transformer.
 *
 * @public
 */
declare const techdocsCollatorEntityTransformerExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<TechDocsCollatorEntityTransformerExtensionPoint>;
/**
 * @public
 * Search backend module for the TechDocs index.
 */
declare const _default: _backstage_backend_plugin_api.BackendFeature;

/** @public */
type TechDocsCollatorEntityTransformer = (entity: Entity) => Partial<Omit<TechDocsDocument, 'location' | 'authorization'>>;

/** @public */
interface MkSearchIndexDoc {
    title: string;
    text: string;
    location: string;
    tags?: string[];
}
/** @public */
type TechDocsCollatorDocumentTransformer = (doc: MkSearchIndexDoc) => Partial<Omit<TechDocsDocument, 'location' | 'authorization' | 'kind' | 'namespace' | 'name' | 'lifecycle' | 'owner'>>;

/**
 * Options to configure the TechDocs collator factory
 *
 * @public
 * @deprecated This type is deprecated along with the {@link DefaultTechDocsCollatorFactory}.
 */
type TechDocsCollatorFactoryOptions = {
    discovery: DiscoveryService;
    logger: LoggerService;
    tokenManager?: TokenManager;
    auth?: AuthService;
    httpAuth?: HttpAuthService;
    locationTemplate?: string;
    catalogClient?: CatalogApi;
    parallelismLimit?: number;
    legacyPathCasing?: boolean;
    entityTransformer?: TechDocsCollatorEntityTransformer;
    documentTransformer?: TechDocsCollatorDocumentTransformer;
};
/**
 * A search collator factory responsible for gathering and transforming
 * TechDocs documents.
 *
 * @public
 * @deprecated Migrate to the {@link https://backstage.io/docs/backend-system/building-backends/migrating | new backend system} and install this collator via module instead (see {@link https://github.com/backstage/backstage/blob/nbs10/search-deprecate-create-router/plugins/search-backend-module-techdocs/README.md#installation | here} for more installation details).
 */
declare class DefaultTechDocsCollatorFactory implements DocumentCollatorFactory {
    readonly type: string;
    readonly visibilityPermission: Permission;
    private discovery;
    private locationTemplate;
    private readonly logger;
    private readonly auth;
    private readonly catalogClient;
    private readonly parallelismLimit;
    private readonly legacyPathCasing;
    private entityTransformer;
    private documentTransformer;
    private constructor();
    static fromConfig(config: Config, options: TechDocsCollatorFactoryOptions): DefaultTechDocsCollatorFactory;
    getCollator(): Promise<Readable>;
    private execute;
    private applyArgsToFormat;
    private static constructDocsIndexUrl;
    private static handleEntityInfoCasing;
}

/** @public */
declare const defaultTechDocsCollatorEntityTransformer: TechDocsCollatorEntityTransformer;

export { DefaultTechDocsCollatorFactory, type MkSearchIndexDoc, type TechDocsCollatorDocumentTransformer, type TechDocsCollatorEntityTransformer, type TechDocsCollatorEntityTransformerExtensionPoint, type TechDocsCollatorFactoryOptions, _default as default, defaultTechDocsCollatorEntityTransformer, techdocsCollatorEntityTransformerExtensionPoint };
