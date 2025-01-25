import type { BaseModel } from '../base';
import type { BindingsInterface } from '../bindings';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { TagsInterface } from '../tags';
import type { v2 } from '../../spec-types';
export declare function bindings(model: BaseModel<{
    bindings?: Record<string, any>;
}>): BindingsInterface;
export declare function hasDescription(model: BaseModel<{
    description?: string;
}>): boolean;
export declare function description(model: BaseModel<{
    description?: string;
}>): string | undefined;
export declare function extensions(model: BaseModel<v2.SpecificationExtensions>): ExtensionsInterface;
export declare function hasExternalDocs(model: BaseModel<{
    externalDocs?: v2.ExternalDocumentationObject;
}>): boolean;
export declare function externalDocs(model: BaseModel<{
    externalDocs?: v2.ExternalDocumentationObject;
}>): ExternalDocumentationInterface | undefined;
export declare function tags(model: BaseModel<{
    tags?: v2.TagsObject;
}>): TagsInterface;
