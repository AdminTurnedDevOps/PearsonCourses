import type { JsonPath } from '@stoplight/types';
import type { v2 } from '../../../spec-types';
export type GetAllOperationsResult = {
    path: JsonPath;
    kind: 'subscribe' | 'publish';
    operation: v2.OperationObject;
};
export declare function getAllOperations(asyncapi: v2.AsyncAPIObject): IterableIterator<GetAllOperationsResult>;
