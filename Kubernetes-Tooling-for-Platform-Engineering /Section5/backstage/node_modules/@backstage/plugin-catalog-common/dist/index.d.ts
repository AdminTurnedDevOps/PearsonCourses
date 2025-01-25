import { IndexableDocument } from '@backstage/plugin-search-common';
import { Entity } from '@backstage/catalog-model';

/**
 * The Document format for an Entity in the Catalog for search
 *
 * @public
 */
interface CatalogEntityDocument extends IndexableDocument {
    /** @deprecated `componentType` is being renamed to `type`. During the transition both of these fields should be set to the same value, in order to avoid issues with indexing. */
    componentType: string;
    type: string;
    namespace: string;
    kind: string;
    lifecycle: string;
    owner: string;
}

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
 */
type LocationSpec = {
    type: string;
    target: string;
    presence?: 'optional' | 'required';
};

/**
 * Makes all keys of an entire hierarchy optional.
 * @ignore
 */
type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

/** @public */
type AnalyzeLocationRequest = {
    location: LocationSpec;
    catalogFilename?: string;
};
/** @public */
type AnalyzeLocationResponse = {
    existingEntityFiles: AnalyzeLocationExistingEntity[];
    generateEntities: AnalyzeLocationGenerateEntity[];
};
/**
 * If the folder pointed to already contained catalog info yaml files, they are
 * read and emitted like this so that the frontend can inform the user that it
 * located them and can make sure to register them as well if they weren't
 * already
 * @public
 */
type AnalyzeLocationExistingEntity = {
    location: LocationSpec;
    isRegistered: boolean;
    entity: Entity;
};
/**
 * This is some form of representation of what the analyzer could deduce.
 * We should probably have a chat about how this can best be conveyed to
 * the frontend. It'll probably contain a (possibly incomplete) entity, plus
 * enough info for the frontend to know what form data to show to the user
 * for overriding/completing the info.
 * @public
 */
type AnalyzeLocationGenerateEntity = {
    entity: RecursivePartial<Entity>;
    fields: AnalyzeLocationEntityField[];
};
/** @public */
type AnalyzeLocationEntityField = {
    /**
     * e.g. "spec.owner"? The frontend needs to know how to "inject" the field into the
     * entity again if the user wants to change it
     */
    field: string;
    /** The outcome of the analysis for this particular field */
    state: 'analysisSuggestedValue' | 'analysisSuggestedNoValue' | 'needsUserInput';
    value: string | null;
    /**
     * A text to show to the user to inform about the choices made. Like, it could say
     * "Found a CODEOWNERS file that covers this target, so we suggest leaving this
     * field empty; which would currently make it owned by X" where X is taken from the
     * codeowners file.
     */
    description: string;
};

export type { AnalyzeLocationEntityField, AnalyzeLocationExistingEntity, AnalyzeLocationGenerateEntity, AnalyzeLocationRequest, AnalyzeLocationResponse, CatalogEntityDocument, LocationSpec };
