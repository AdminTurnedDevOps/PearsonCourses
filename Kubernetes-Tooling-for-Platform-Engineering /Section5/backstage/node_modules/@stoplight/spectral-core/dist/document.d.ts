import { DeepReadonly, GetLocationForJsonPath, IParserResult, IRange, JsonPath, Optional } from '@stoplight/types';
import { IParser } from '@stoplight/spectral-parsers';
import { IRuleResult } from './types';
import { Format } from './ruleset/format';
export interface IDocument<D = unknown> {
    readonly source: string | null;
    readonly diagnostics: ReadonlyArray<IRuleResult>;
    formats?: Set<Format> | null;
    getRangeForJsonPath(path: JsonPath, closest?: boolean): Optional<IRange>;
    trapAccess<T extends Record<string, unknown> = Record<string, unknown>>(obj: T): T;
    data: D;
}
export declare function normalizeSource(source: undefined): null;
export declare function normalizeSource(source: string): string;
export declare function normalizeSource(source: Optional<string>): string | null;
export declare class Document<D = unknown, R extends IParserResult<D> = IParserResult<D>> implements IDocument<D> {
    protected readonly input: string;
    protected readonly parser: IParser<R>;
    protected readonly parserResult: R;
    readonly source: string | null;
    readonly diagnostics: IRuleResult[];
    formats?: Set<Format> | null;
    constructor(input: string, parser: IParser<R>, source?: string);
    getRangeForJsonPath(path: JsonPath, closest?: boolean): Optional<IRange>;
    trapAccess<T extends Record<string, unknown> = Record<string, unknown>>(obj: T): T;
    static get DEFAULT_RANGE(): DeepReadonly<IRange>;
    get data(): D;
}
export declare class ParsedDocument<D = unknown, R extends IParsedResult<D> = IParsedResult<D>> implements IDocument<D> {
    protected readonly parserResult: R;
    readonly source: string | null;
    readonly diagnostics: IRuleResult[];
    formats?: Set<Format> | null;
    constructor(parserResult: R);
    trapAccess<T extends Record<string, unknown> = Record<string, unknown>>(obj: T): T;
    getRangeForJsonPath(path: JsonPath, closest?: boolean): Optional<IRange>;
    get data(): D;
}
export interface IParsedResult<D = unknown, R extends IParserResult<D> = IParserResult<D, any, any, any>> {
    parsed: R;
    getLocationForJsonPath: GetLocationForJsonPath<R>;
    source?: string;
    formats?: string[];
}
export declare const isParsedResult: (obj: unknown) => obj is IParsedResult<unknown, IParserResult<unknown, any, any, any>>;
