import type { JsonPath } from '@stoplight/types';
import type { v2 } from '../../../spec-types';
export type GetAllMessageResult = {
    path: JsonPath;
    message: v2.MessageObject;
};
export declare function getAllMessages(asyncapi: v2.AsyncAPIObject): IterableIterator<GetAllMessageResult>;
