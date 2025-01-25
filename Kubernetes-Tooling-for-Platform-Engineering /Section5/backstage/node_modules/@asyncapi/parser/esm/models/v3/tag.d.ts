import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { TagInterface } from '../tag';
import type { v3 } from '../../spec-types';
export declare class Tag extends BaseModel<v3.TagObject, {
    id?: string;
}> implements TagInterface {
    id(): string | undefined;
    name(): string;
    hasDescription(): boolean;
    description(): string | undefined;
    extensions(): ExtensionsInterface;
    hasExternalDocs(): boolean;
    externalDocs(): ExternalDocumentationInterface | undefined;
}
