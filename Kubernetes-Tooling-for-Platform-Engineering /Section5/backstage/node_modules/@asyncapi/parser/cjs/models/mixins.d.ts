import type { BindingsInterface } from './bindings';
import type { ExtensionsInterface } from './extensions';
import type { ExternalDocumentationInterface } from './external-docs';
import type { TagsInterface } from './tags';
export interface BindingsMixinInterface {
    bindings(): BindingsInterface;
}
export interface CoreMixinInterface extends BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, SummaryMixinInterface, TagsMixinInterface, TitleMixinInterface {
}
export interface DescriptionMixinInterface {
    hasDescription(): boolean;
    description(): string | undefined;
}
export interface ExtensionsMixinInterface {
    extensions(): ExtensionsInterface;
}
export interface ExternalDocumentationMixinInterface {
    hasExternalDocs(): boolean;
    externalDocs(): ExternalDocumentationInterface | undefined;
}
export interface SummaryMixinInterface {
    hasSummary(): boolean;
    summary(): string | undefined;
}
export interface TagsMixinInterface {
    tags(): TagsInterface;
}
export interface TitleMixinInterface {
    hasTitle(): boolean;
    title(): string | undefined;
}
