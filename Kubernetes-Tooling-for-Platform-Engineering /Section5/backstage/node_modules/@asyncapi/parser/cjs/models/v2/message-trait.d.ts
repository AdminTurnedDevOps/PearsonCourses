import { BaseModel } from '../base';
import type { BindingsInterface } from '../bindings';
import type { CorrelationIdInterface } from '../correlation-id';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { MessageExamplesInterface } from '../message-examples';
import type { MessageTraitInterface } from '../message-trait';
import type { SchemaInterface } from '../schema';
import type { TagsInterface } from '../tags';
import type { v2 } from '../../spec-types';
export declare class MessageTrait<J extends v2.MessageTraitObject = v2.MessageTraitObject> extends BaseModel<J, {
    id: string;
}> implements MessageTraitInterface {
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
    hasDescription(): boolean;
    description(): string | undefined;
    hasExternalDocs(): boolean;
    externalDocs(): ExternalDocumentationInterface | undefined;
    examples(): MessageExamplesInterface;
    tags(): TagsInterface;
    bindings(): BindingsInterface;
    extensions(): ExtensionsInterface;
}
