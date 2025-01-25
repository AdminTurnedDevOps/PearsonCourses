import type { Parser } from '../parser';
import type { DetailedAsyncAPI } from '../types';
export declare function parseSchemasV2(parser: Parser, detailed: DetailedAsyncAPI): Promise<void[]>;
export declare function parseSchemasV3(parser: Parser, detailed: DetailedAsyncAPI): Promise<void[]>;
