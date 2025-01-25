import { ServiceFactory } from '@backstage/backend-plugin-api';
import { CompoundEntityRef, Entity } from '@backstage/catalog-model';
import { ServiceMock } from '@backstage/backend-test-utils';
import { CatalogApi, GetEntitiesRequest, CatalogRequestOptions, GetEntitiesResponse, GetEntitiesByRefsRequest, GetEntitiesByRefsResponse, QueryEntitiesRequest, QueryEntitiesResponse, GetEntityAncestorsRequest, GetEntityAncestorsResponse, GetEntityFacetsRequest, GetEntityFacetsResponse, Location, AddLocationRequest, AddLocationResponse, ValidateEntityResponse } from '@backstage/catalog-client';
import { CatalogService, CatalogServiceRequestOptions } from '@backstage/plugin-catalog-node';

/**
 * A mock friendly version of `CatalogService` /
 * {@link @backstage/catalog-client#CatalogApi | CatalogApi}.
 *
 * @public
 * @remarks
 *
 * This interface supports both API types at the same time, and has an optional
 * second argument to simplify testing since the mock implementation does not
 * care about credentials.
 */
interface CatalogServiceMock extends CatalogService, CatalogApi {
    getEntities(request?: GetEntitiesRequest, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<GetEntitiesResponse>;
    getEntitiesByRefs(request: GetEntitiesByRefsRequest, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<GetEntitiesByRefsResponse>;
    queryEntities(request?: QueryEntitiesRequest, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<QueryEntitiesResponse>;
    getEntityAncestors(request: GetEntityAncestorsRequest, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<GetEntityAncestorsResponse>;
    getEntityByRef(entityRef: string | CompoundEntityRef, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<Entity | undefined>;
    removeEntityByUid(uid: string, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<void>;
    refreshEntity(entityRef: string, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<void>;
    getEntityFacets(request: GetEntityFacetsRequest, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<GetEntityFacetsResponse>;
    getLocationById(id: string, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<Location | undefined>;
    getLocationByRef(locationRef: string, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<Location | undefined>;
    addLocation(location: AddLocationRequest, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<AddLocationResponse>;
    removeLocationById(id: string, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<void>;
    getLocationByEntity(entityRef: string | CompoundEntityRef, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<Location | undefined>;
    validateEntity(entity: Entity, locationRef: string, options?: CatalogServiceRequestOptions | CatalogRequestOptions): Promise<ValidateEntityResponse>;
}

/**
 * Creates a fake catalog client that handles entities in memory storage. Note
 * that this client may be severely limited in functionality, and advanced
 * functions may not be available at all.
 *
 * @public
 */
declare function catalogServiceMock(options?: {
    entities?: Entity[];
}): CatalogServiceMock;
/**
 * A collection of mock functionality for the catalog service.
 *
 * @public
 */
declare namespace catalogServiceMock {
    /**
     * Creates a fake catalog client that handles entities in memory storage. Note
     * that this client may be severely limited in functionality, and advanced
     * functions may not be available at all.
     */
    const factory: (options?: {
        entities?: Entity[];
    }) => ServiceFactory<CatalogServiceMock, "plugin", "singleton">;
    /**
     * Creates a catalog client whose methods are mock functions, possibly with
     * some of them overloaded by the caller.
     */
    const mock: (partialImpl?: Partial<CatalogServiceMock> | undefined) => ServiceMock<CatalogServiceMock>;
}

export { type CatalogServiceMock, catalogServiceMock };
