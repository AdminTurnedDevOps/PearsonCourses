import type { RulesetFunctionContext } from '@stoplight/spectral-core';
import type { Parser } from '../parser';
import type { ParseOptions } from '../parse';
import type { AsyncAPIDocumentInterface } from '../models';
import type { DetailedAsyncAPI } from '../types';
export { applyUniqueIds } from './apply-unique-ids';
export declare function customOperations(parser: Parser, document: AsyncAPIDocumentInterface, detailed: DetailedAsyncAPI, inventory: RulesetFunctionContext['documentInventory'], options: ParseOptions): Promise<void>;
