import { BaseModel } from '../base';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { ExtensionsInterface } from '../extensions';
import type { v2 } from '../../spec-types';
export declare class ExternalDocumentation extends BaseModel<v2.ExternalDocumentationObject> implements ExternalDocumentationInterface {
    url(): string;
    hasDescription(): boolean;
    description(): string | undefined;
    extensions(): ExtensionsInterface;
}
