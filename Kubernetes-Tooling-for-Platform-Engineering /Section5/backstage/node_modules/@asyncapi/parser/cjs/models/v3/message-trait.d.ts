import { CoreModel } from './mixins';
import type { CorrelationIdInterface } from '../correlation-id';
import type { MessageExamplesInterface } from '../message-examples';
import type { MessageTraitInterface } from '../message-trait';
import type { SchemaInterface } from '../schema';
import type { v3 } from '../../spec-types';
export declare class MessageTrait<J extends v3.MessageTraitObject = v3.MessageTraitObject> extends CoreModel<J, {
    id: string;
}> implements MessageTraitInterface {
    id(): string;
    hasMessageId(): boolean;
    hasSchemaFormat(): boolean;
    schemaFormat(): string | undefined;
    hasCorrelationId(): boolean;
    correlationId(): CorrelationIdInterface | undefined;
    hasContentType(): boolean;
    contentType(): string | undefined;
    hasHeaders(): boolean;
    headers(): SchemaInterface | undefined;
    hasName(): boolean;
    name(): string | undefined;
    examples(): MessageExamplesInterface;
}
