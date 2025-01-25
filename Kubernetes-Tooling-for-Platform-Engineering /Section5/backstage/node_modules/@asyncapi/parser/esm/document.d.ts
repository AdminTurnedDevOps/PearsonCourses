import type { AsyncAPIDocumentInterface } from './models';
import type { OldAsyncAPIDocument } from './old-api';
import type { DetailedAsyncAPI, AsyncAPIObject } from './types';
export declare function createAsyncAPIDocument(asyncapi: DetailedAsyncAPI): AsyncAPIDocumentInterface;
export declare function toAsyncAPIDocument(maybeDoc: unknown): AsyncAPIDocumentInterface | undefined;
export declare function isAsyncAPIDocument(maybeDoc: unknown): maybeDoc is AsyncAPIDocumentInterface;
export declare function isOldAsyncAPIDocument(maybeDoc: unknown): maybeDoc is OldAsyncAPIDocument;
export declare function isParsedDocument(maybeDoc: unknown): maybeDoc is AsyncAPIObject;
export declare function isStringifiedDocument(maybeDoc: unknown): maybeDoc is AsyncAPIObject;
