import { AsyncAPIDocument } from './asyncapi';
import type { AsyncAPIDocumentInterface } from '../models/asyncapi';
export declare function convertToOldAPI(newDocument: AsyncAPIDocumentInterface): AsyncAPIDocument;
export declare function convertToNewAPI(oldDocument: AsyncAPIDocument): AsyncAPIDocumentInterface;
