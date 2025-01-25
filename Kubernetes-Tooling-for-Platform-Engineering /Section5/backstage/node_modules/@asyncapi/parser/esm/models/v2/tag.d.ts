import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { TagInterface } from '../tag';
import type { v2 } from '../../spec-types';
export declare class Tag extends BaseModel<v2.TagObject> implements TagInterface {
    name(): string;
    hasDescription(): boolean;
    description(): string | undefined;
    extensions(): ExtensionsInterface;
    hasExternalDocs(): boolean;
    externalDocs(): ExternalDocumentationInterface | undefined;
}
