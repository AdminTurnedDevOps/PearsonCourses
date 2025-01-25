import * as _backstage_backend_plugin_api from '@backstage/backend-plugin-api';
import { CatalogApi } from '@backstage/catalog-client';
import { Entity, Validators } from '@backstage/catalog-model';
import { CatalogProcessor, EntityProvider, PlaceholderResolver, CatalogProcessorParser, LocationAnalyzer, ScmLocationAnalyzer, EntitiesSearchFilter } from '@backstage/plugin-catalog-node';
import { PermissionRuleParams, Permission } from '@backstage/plugin-permission-common';
import { PermissionRule } from '@backstage/plugin-permission-node';

/**
 * @alpha
 */
interface CatalogLocationsExtensionPoint {
    /**
     * Allows setting custom location types, such as showcased in: https://backstage.io/docs/features/software-catalog/external-integrations/#creating-a-catalog-data-reader-processor
     * @param locationTypes - List of location types to allow, default is "url" and "file"
     */
    setAllowedLocationTypes(locationTypes: Array<string>): void;
}
/**
 * @alpha
 */
declare const catalogLocationsExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<CatalogLocationsExtensionPoint>;
/**
 * @alpha
 */
interface CatalogProcessingExtensionPoint {
    addProcessor(...processors: Array<CatalogProcessor | Array<CatalogProcessor>>): void;
    addEntityProvider(...providers: Array<EntityProvider | Array<EntityProvider>>): void;
    addPlaceholderResolver(key: string, resolver: PlaceholderResolver): void;
    setOnProcessingErrorHandler(handler: (event: {
        unprocessedEntity: Entity;
        errors: Error[];
    }) => Promise<void> | void): void;
}
/** @alpha */
interface CatalogModelExtensionPoint {
    /**
     * Sets the validator function to use for one or more special fields of an
     * entity. This is useful if the default rules for formatting of fields are
     * not sufficient.
     *
     * @param validators - The (subset of) validators to set
     */
    setFieldValidators(validators: Partial<Validators>): void;
    /**
     * Sets the entity data parser which is used to read raw data from locations
     * @param parser - Parser which will used to extract entities from raw data
     */
    setEntityDataParser(parser: CatalogProcessorParser): void;
}
/**
 * @alpha
 */
declare const catalogProcessingExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<CatalogProcessingExtensionPoint>;
/**
 * @alpha
 */
interface CatalogAnalysisExtensionPoint {
    /**
     * Replaces the entire location analyzer with a new one.
     *
     * @remarks
     *
     * By providing a factory function you can access all the SCM analyzers that
     * have been added through `addScmLocationAnalyzer`. If you provide a
     * `LocationAnalyzer` directly, the SCM analyzers will be ignored.
     */
    setLocationAnalyzer(analyzerOrFactory: LocationAnalyzer | ((options: {
        scmLocationAnalyzers: ScmLocationAnalyzer[];
    }) => Promise<{
        locationAnalyzer: LocationAnalyzer;
    }>)): void;
    /**
     * Adds an analyzer for a specific SCM type to the default location analyzer.
     */
    addScmLocationAnalyzer(analyzer: ScmLocationAnalyzer): void;
}
/**
 * @alpha
 */
declare const catalogAnalysisExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<CatalogAnalysisExtensionPoint>;
/** @alpha */
declare const catalogModelExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<CatalogModelExtensionPoint>;
/**
 * @alpha
 */
type CatalogPermissionRuleInput<TParams extends PermissionRuleParams = PermissionRuleParams> = PermissionRule<Entity, EntitiesSearchFilter, 'catalog-entity', TParams>;
/**
 * @alpha
 */
interface CatalogPermissionExtensionPoint {
    addPermissions(...permissions: Array<Permission | Array<Permission>>): void;
    addPermissionRules(...rules: Array<CatalogPermissionRuleInput | Array<CatalogPermissionRuleInput>>): void;
}
/**
 * @alpha
 */
declare const catalogPermissionExtensionPoint: _backstage_backend_plugin_api.ExtensionPoint<CatalogPermissionExtensionPoint>;

/**
 * @alpha
 * @deprecated Use {@link @backstage/plugin-catalog-node#catalogServiceRef} instead
 */
declare const catalogServiceRef: _backstage_backend_plugin_api.ServiceRef<CatalogApi, "plugin", "singleton">;

export { type CatalogAnalysisExtensionPoint, type CatalogLocationsExtensionPoint, type CatalogModelExtensionPoint, type CatalogPermissionExtensionPoint, type CatalogPermissionRuleInput, type CatalogProcessingExtensionPoint, catalogAnalysisExtensionPoint, catalogLocationsExtensionPoint, catalogModelExtensionPoint, catalogPermissionExtensionPoint, catalogProcessingExtensionPoint, catalogServiceRef };
