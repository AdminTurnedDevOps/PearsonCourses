/// <reference types="node" />
import { CompoundEntityRef, Entity, LocationEntityV1alpha1 } from '@backstage/catalog-model';
import { JsonValue } from '@backstage/types';
import { LocationSpec as LocationSpec$1, AnalyzeLocationRequest, AnalyzeLocationResponse, AnalyzeLocationExistingEntity } from '@backstage/plugin-catalog-common';
import * as _backstage_backend_plugin_api from '@backstage/backend-plugin-api';
import { BackstageCredentials } from '@backstage/backend-plugin-api';
import { GetEntitiesRequest, GetEntitiesResponse, GetEntitiesByRefsRequest, GetEntitiesByRefsResponse, QueryEntitiesRequest, QueryEntitiesResponse, GetEntityAncestorsRequest, GetEntityAncestorsResponse, GetEntityFacetsRequest, GetEntityFacetsResponse, Location, AddLocationRequest, AddLocationResponse, ValidateEntityResponse } from '@backstage/catalog-client';

/**
 * Holds the entity location information.
 *
 * @remarks
 *
 *  `presence` flag: when using repo importer plugin, location is being created before the component yaml file is merged to the main branch.
 *  This flag is then set to indicate that the file can be not present.
 *  default value: 'required'.
 *
 * @public
 * @deprecated use the same type from `@backstage/plugin-catalog-common` instead
 */
type LocationSpec = LocationSpec$1;
/**
 * Holds the relation data for entities.
 *
 * @public
 */
type EntityRelationSpec = {
    /**
     * The source entity of this relation.
     */
    source: CompoundEntityRef;
    /**
     * The type of the relation.
     */
    type: string;
    /**
     * The target entity of this relation.
     */
    target: CompoundEntityRef;
};
/**
 * A filter expression for entities.
 *
 * @public
 */
type EntityFilter = {
    allOf: EntityFilter[];
} | {
    anyOf: EntityFilter[];
} | {
    not: EntityFilter;
} | EntitiesSearchFilter;
/**
 * Matches rows in the search table.
 *
 * @public
 */
type EntitiesSearchFilter = {
    /**
     * The key to match on.
     *
     * Matches are always case insensitive.
     */
    key: string;
    /**
     * Match on plain equality of values.
     *
     * Match on values that are equal to any of the given array items. Matches are
     * always case insensitive.
     */
    values?: string[];
};

/**
 * @public
 */
type CatalogProcessor = {
    /**
     * A unique identifier for the Catalog Processor.
     */
    getProcessorName(): string;
    /**
     * Reads the contents of a location.
     *
     * @param location - The location to read
     * @param optional - Whether a missing target should trigger an error
     * @param emit - A sink for items resulting from the read
     * @param parser - A parser, that is able to take the raw catalog descriptor
     *               data and turn it into the actual result pieces.
     * @param cache - A cache for storing values local to this processor and the current entity.
     * @returns True if handled by this processor, false otherwise
     */
    readLocation?(location: LocationSpec$1, optional: boolean, emit: CatalogProcessorEmit, parser: CatalogProcessorParser, cache: CatalogProcessorCache): Promise<boolean>;
    /**
     * Pre-processes an emitted entity, after it has been emitted but before it
     * has been validated.
     *
     * This type of processing usually involves enriching the entity with
     * additional data, and the input entity may actually still be incomplete
     * when the processor is invoked.
     *
     * @param entity - The (possibly partial) entity to process
     * @param location - The location that the entity came from
     * @param emit - A sink for auxiliary items resulting from the processing
     * @param originLocation - The location that the entity originally came from.
     *   While location resolves to the direct parent location, originLocation
     *   tells which location was used to start the ingestion loop.
     * @param cache - A cache for storing values local to this processor and the current entity.
     * @returns The same entity or a modified version of it
     */
    preProcessEntity?(entity: Entity, location: LocationSpec$1, emit: CatalogProcessorEmit, originLocation: LocationSpec$1, cache: CatalogProcessorCache): Promise<Entity>;
    /**
     * Validates the entity as a known entity kind, after it has been pre-
     * processed and has passed through basic overall validation.
     *
     * @param entity - The entity to validate
     * @returns Resolves to true, if the entity was of a kind that was known and
     *   handled by this processor, and was found to be valid. Resolves to false,
     *   if the entity was not of a kind that was known by this processor.
     *   Rejects to an Error describing the problem, if the entity was of a kind
     *   that was known by this processor and was not valid.
     */
    validateEntityKind?(entity: Entity): Promise<boolean>;
    /**
     * Post-processes an emitted entity, after it has been validated.
     *
     * @param entity - The entity to process
     * @param location - The location that the entity came from
     * @param emit - A sink for auxiliary items resulting from the processing
     * @param cache - A cache for storing values local to this processor and the current entity.
     * @returns The same entity or a modified version of it
     */
    postProcessEntity?(entity: Entity, location: LocationSpec$1, emit: CatalogProcessorEmit, cache: CatalogProcessorCache): Promise<Entity>;
};
/**
 * A parser, that is able to take the raw catalog descriptor data and turn it
 * into the actual result pieces. The default implementation performs a YAML
 * document parsing.
 * @public
 */
type CatalogProcessorParser = (options: {
    data: Buffer;
    location: LocationSpec$1;
}) => AsyncIterable<CatalogProcessorResult>;
/**
 * A cache for storing data during processing.
 *
 * The values stored in the cache are always local to each processor, meaning
 * no processor can see cache values from other processors.
 *
 * The cache instance provided to the CatalogProcessor is also scoped to the
 * entity being processed, meaning that each processor run can't see cache
 * values from processing runs for other entities.
 *
 * Values that are set during a processing run will only be visible in the directly
 * following run. The cache will be overwritten every run unless no new cache items
 * are written, in which case the existing values remain in the cache.
 *
 * @public
 */
interface CatalogProcessorCache {
    /**
     * Retrieve a value from the cache.
     */
    get<ItemType extends JsonValue>(key: string): Promise<ItemType | undefined>;
    /**
     * Store a value in the cache.
     */
    set<ItemType extends JsonValue>(key: string, value: ItemType): Promise<void>;
}
/** @public */
type CatalogProcessorEmit = (generated: CatalogProcessorResult) => void;
/** @public */
type CatalogProcessorLocationResult = {
    type: 'location';
    location: LocationSpec$1;
};
/** @public */
type CatalogProcessorEntityResult = {
    type: 'entity';
    entity: Entity;
    location: LocationSpec$1;
};
/** @public */
type CatalogProcessorRelationResult = {
    type: 'relation';
    relation: EntityRelationSpec;
};
/** @public */
type CatalogProcessorErrorResult = {
    type: 'error';
    error: Error;
    location: LocationSpec$1;
};
/** @public */
type CatalogProcessorRefreshKeysResult = {
    type: 'refresh';
    key: string;
};
/** @public */
type CatalogProcessorResult = CatalogProcessorLocationResult | CatalogProcessorEntityResult | CatalogProcessorRelationResult | CatalogProcessorErrorResult | CatalogProcessorRefreshKeysResult;

/**
 * Factory functions for the standard processing result types.
 *
 * @public
 */
declare const processingResult: Readonly<{
    /**
     * Associates a NotFoundError with the processing state of the current entity.
     */
    readonly notFoundError: (atLocation: LocationSpec$1, message: string) => CatalogProcessorResult;
    /**
     * Associates an InputError with the processing state of the current entity.
     */
    readonly inputError: (atLocation: LocationSpec$1, message: string) => CatalogProcessorResult;
    /**
     * Associates a general Error with the processing state of the current entity.
     */
    readonly generalError: (atLocation: LocationSpec$1, message: string) => CatalogProcessorResult;
    /**
     * Emits a location. In effect, this is analogous to emitting a Location kind
     * child entity. This is commonly used in discovery processors. Do not use
     * this while processing Location entities.
     */
    readonly location: (newLocation: LocationSpec$1) => CatalogProcessorResult;
    /**
     * Emits a child of the current entity, associated with a certain location.
     */
    readonly entity: (atLocation: LocationSpec$1, newEntity: Entity) => CatalogProcessorResult;
    /**
     * Emits a relation owned by the current entity. The relation does not have to
     * start or end at the current entity. The relation only lives for as long as
     * the current entity lives.
     */
    readonly relation: (spec: EntityRelationSpec) => CatalogProcessorResult;
    /**
     * Associates the given refresh key with the current entity. The effect of
     * this is that the entity will be marked for refresh when such requests are
     * made.
     */
    readonly refresh: (key: string) => CatalogProcessorResult;
}>;

/**
 * Entities that are not yet processed.
 * @public
 */
type DeferredEntity = {
    entity: Entity;
    locationKey?: string;
};
/** @public */
type PlaceholderResolverRead = (url: string) => Promise<Buffer>;
/** @public */
type PlaceholderResolverResolveUrl = (url: string, base: string) => string;
/** @public */
type PlaceholderResolverParams = {
    key: string;
    value: JsonValue;
    baseUrl: string;
    read: PlaceholderResolverRead;
    resolveUrl: PlaceholderResolverResolveUrl;
    emit: CatalogProcessorEmit;
};
/** @public */
type PlaceholderResolver = (params: PlaceholderResolverParams) => Promise<JsonValue>;
/** @public */
type LocationAnalyzer = {
    /**
     * Generates an entity configuration for given git repository. It's used for
     * importing new component to the backstage app.
     *
     * @param location - Git repository to analyze and generate config for.
     */
    analyzeLocation(location: AnalyzeLocationRequest, credentials: BackstageCredentials): Promise<AnalyzeLocationResponse>;
};
/** @public */
type AnalyzeOptions = {
    url: string;
    catalogFilename?: string;
};
/** @public */
type ScmLocationAnalyzer = {
    /** The method that decides if this analyzer can work with the provided url */
    supports(url: string): boolean;
    /** This function can return an array of already existing entities */
    analyze(options: AnalyzeOptions): Promise<{
        /** Existing entities in the analyzed location */
        existing: AnalyzeLocationExistingEntity[];
    }>;
};

/**
 * A 'full' mutation replaces all existing entities created by this entity provider with new ones.
 * A 'delta' mutation can both add and remove entities provided by this provider. Previously provided
 * entities from a 'full' mutation are not removed.
 *
 * @public
 */
type EntityProviderMutation = {
    type: 'full';
    entities: DeferredEntity[];
} | {
    type: 'delta';
    added: DeferredEntity[];
    removed: (DeferredEntity | {
        entityRef: string;
        locationKey?: string;
    })[];
};
/**
 * The options given to an entity refresh operation.
 *
 * @public
 */
type EntityProviderRefreshOptions = {
    keys: string[];
};
/**
 * The connection between the catalog and the entity provider.
 * Entity providers use this connection to add and remove entities from the catalog.
 *
 * @public
 */
interface EntityProviderConnection {
    /**
     * Applies either a full or a delta update to the catalog engine.
     */
    applyMutation(mutation: EntityProviderMutation): Promise<void>;
    /**
     * Schedules a refresh on all of the entities that have a matching refresh key associated with the provided keys.
     */
    refresh(options: EntityProviderRefreshOptions): Promise<void>;
}
/**
 * An entity provider is able to provide entities to the catalog.
 * See https://backstage.io/docs/features/software-catalog/life-of-an-entity for more details.
 *
 * @public
 */
interface EntityProvider {
    /**
     * The name of the provider, which must be unique for all providers that are
     * active in a catalog, and stable over time since emitted entities are
     * related to the provider by this name.
     */
    getProviderName(): string;
    /**
     * Called upon initialization by the catalog engine.
     */
    connect(connection: EntityProviderConnection): Promise<void>;
}

/**
 * A standard way of producing a machine generated name for a location.
 *
 * @public
 */
declare function locationSpecToMetadataName(location: LocationSpec$1): string;
/**
 * A standard way of producing a machine generated Location kind entity for a
 * location.
 *
 * @public
 */
declare function locationSpecToLocationEntity(opts: {
    location: LocationSpec$1;
    parentEntity?: Entity;
}): LocationEntityV1alpha1;

/**
 * @public
 */
interface CatalogServiceRequestOptions {
    credentials: BackstageCredentials;
}
/**
 * A version of the {@link @backstage/catalog-client#CatalogApi | CatalogApi} that
 * requires backend credentials to be passed instead of a token.
 *
 * @public
 */
interface CatalogService {
    getEntities(request: GetEntitiesRequest | undefined, options: CatalogServiceRequestOptions): Promise<GetEntitiesResponse>;
    getEntitiesByRefs(request: GetEntitiesByRefsRequest, options: CatalogServiceRequestOptions): Promise<GetEntitiesByRefsResponse>;
    queryEntities(request: QueryEntitiesRequest | undefined, options: CatalogServiceRequestOptions): Promise<QueryEntitiesResponse>;
    getEntityAncestors(request: GetEntityAncestorsRequest, options: CatalogServiceRequestOptions): Promise<GetEntityAncestorsResponse>;
    getEntityByRef(entityRef: string | CompoundEntityRef, options: CatalogServiceRequestOptions): Promise<Entity | undefined>;
    removeEntityByUid(uid: string, options: CatalogServiceRequestOptions): Promise<void>;
    refreshEntity(entityRef: string, options: CatalogServiceRequestOptions): Promise<void>;
    getEntityFacets(request: GetEntityFacetsRequest, options: CatalogServiceRequestOptions): Promise<GetEntityFacetsResponse>;
    getLocationById(id: string, options: CatalogServiceRequestOptions): Promise<Location | undefined>;
    getLocationByRef(locationRef: string, options: CatalogServiceRequestOptions): Promise<Location | undefined>;
    addLocation(location: AddLocationRequest, options: CatalogServiceRequestOptions): Promise<AddLocationResponse>;
    removeLocationById(id: string, options: CatalogServiceRequestOptions): Promise<void>;
    getLocationByEntity(entityRef: string | CompoundEntityRef, options: CatalogServiceRequestOptions): Promise<Location | undefined>;
    validateEntity(entity: Entity, locationRef: string, options: CatalogServiceRequestOptions): Promise<ValidateEntityResponse>;
}
/**
 * The catalogService provides the catalog API.
 *
 * @public
 */
declare const catalogServiceRef: _backstage_backend_plugin_api.ServiceRef<CatalogService, "plugin", "singleton">;

export { type AnalyzeOptions, type CatalogProcessor, type CatalogProcessorCache, type CatalogProcessorEmit, type CatalogProcessorEntityResult, type CatalogProcessorErrorResult, type CatalogProcessorLocationResult, type CatalogProcessorParser, type CatalogProcessorRefreshKeysResult, type CatalogProcessorRelationResult, type CatalogProcessorResult, type CatalogService, type CatalogServiceRequestOptions, type DeferredEntity, type EntitiesSearchFilter, type EntityFilter, type EntityProvider, type EntityProviderConnection, type EntityProviderMutation, type EntityProviderRefreshOptions, type EntityRelationSpec, type LocationAnalyzer, type LocationSpec, type PlaceholderResolver, type PlaceholderResolverParams, type PlaceholderResolverRead, type PlaceholderResolverResolveUrl, type ScmLocationAnalyzer, catalogServiceRef, locationSpecToLocationEntity, locationSpecToMetadataName, processingResult };
