import type { BaseModel } from './base';
import type { CorrelationIdInterface } from './correlation-id';
import type { MessageExamplesInterface } from './message-examples';
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface } from './mixins';
import type { SchemaInterface } from './schema';
export interface MessageTraitInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface {
    id(): string;
    hasSchemaFormat(): boolean;
    schemaFormat(): string | undefined;
    hasMessageId(): boolean;
    hasCorrelationId(): boolean;
    correlationId(): CorrelationIdInterface | undefined;
    hasContentType(): boolean;
    contentType(): string | undefined;
    hasHeaders(): boolean;
    headers(): SchemaInterface | undefined;
    hasName(): boolean;
    name(): string | undefined;
    hasTitle(): boolean;
    title(): string | undefined;
    hasSummary(): boolean;
    summary(): string | undefined;
    examples(): MessageExamplesInterface;
}
