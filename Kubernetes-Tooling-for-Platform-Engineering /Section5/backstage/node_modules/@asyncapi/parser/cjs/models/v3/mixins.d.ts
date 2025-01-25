import { BaseModel } from '../base';
import type { BindingsInterface } from '../bindings';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { TagsInterface } from '../tags';
import type { v3 } from '../../spec-types';
type BindingsObject = v3.ServerBindingsObject | v3.ChannelBindingsObject | v3.OperationBindingsObject | v3.MessageBindingsObject | v3.ReferenceObject;
export interface CoreObject extends v3.SpecificationExtensions {
    title?: string;
    summary?: string;
    description?: string;
    externalDocs?: v3.ExternalDocumentationObject | v3.ReferenceObject;
    tags?: v3.TagsObject;
    bindings?: BindingsObject;
}
export declare abstract class CoreModel<J extends CoreObject = CoreObject, M extends Record<string, any> = {}> extends BaseModel<J, M> {
    hasTitle(): boolean;
    title(): string | undefined;
    hasSummary(): boolean;
    summary(): string | undefined;
    hasDescription(): boolean;
    description(): string | undefined;
    hasExternalDocs(): boolean;
    externalDocs(): ExternalDocumentationInterface | undefined;
    tags(): TagsInterface;
    bindings(): BindingsInterface;
    extensions(): ExtensionsInterface;
}
export declare function bindings(model: BaseModel<{
    bindings?: BindingsObject;
}>): BindingsInterface;
export declare function hasDescription(model: BaseModel<{
    description?: string;
}>): boolean;
export declare function description(model: BaseModel<{
    description?: string;
}>): string | undefined;
export declare function extensions(model: BaseModel<v3.SpecificationExtensions>): ExtensionsInterface;
export declare function hasExternalDocs(model: BaseModel<{
    externalDocs?: v3.ExternalDocumentationObject | v3.ReferenceObject;
}>): boolean;
export declare function externalDocs(model: BaseModel<{
    externalDocs?: v3.ExternalDocumentationObject | v3.ReferenceObject;
}>): ExternalDocumentationInterface | undefined;
export declare function tags(model: BaseModel<{
    tags?: v3.TagsObject;
}>): TagsInterface;
export {};
