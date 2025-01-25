import { BaseModel } from '../base';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { ExtensionsInterface } from '../extensions';
import type { v3 } from '../../spec-types';
export declare class ExternalDocumentation extends BaseModel<v3.ExternalDocumentationObject, {
    id?: string;
}> implements ExternalDocumentationInterface {
    id(): string | undefined;
    url(): string;
    hasDescription(): boolean;
    description(): string | undefined;
    extensions(): ExtensionsInterface;
}
