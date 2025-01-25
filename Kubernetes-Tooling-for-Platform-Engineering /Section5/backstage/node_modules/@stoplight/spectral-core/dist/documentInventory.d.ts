import { Dictionary, JsonPath } from '@stoplight/types';
import { IDocument } from './document';
import { Resolver, ResolveResult } from '@stoplight/spectral-ref-resolver';
import { IRuleResult } from './types';
import { Format } from './ruleset/format';
export declare type DocumentInventoryItem = {
    document: IDocument;
    path: JsonPath;
    missingPropertyPath: JsonPath;
};
export interface IDocumentInventory {
    readonly graph: ResolveResult['graph'] | null;
    readonly referencedDocuments: Dictionary<IDocument>;
    findAssociatedItemForPath(path: JsonPath, resolved: boolean): DocumentInventoryItem | null;
}
export declare class DocumentInventory implements IDocumentInventory {
    readonly document: IDocument;
    protected resolver: Resolver;
    private static readonly _cachedRemoteDocuments;
    graph: ResolveResult['graph'] | null;
    resolved: unknown;
    errors: IRuleResult[] | null;
    diagnostics: IRuleResult[];
    readonly referencedDocuments: Dictionary<IDocument>;
    get source(): string | null;
    get unresolved(): unknown;
    get formats(): Set<Format> | null;
    constructor(document: IDocument, resolver: Resolver);
    resolve(): Promise<void>;
    findAssociatedItemForPath(path: JsonPath, resolved: boolean): DocumentInventoryItem | null;
    protected convertRefMapKeyToPath(refPath: string): JsonPath;
    protected parseResolveResult: Resolver['parseResolveResult'];
}
