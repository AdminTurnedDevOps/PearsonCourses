import { MessageTrait } from './message-trait';
import { Schema } from './schema';
import type { v2 } from '../spec-types';
export declare class Message extends MessageTrait<v2.MessageObject> {
    uid(): string;
    payload(): Schema | null;
    traits(): MessageTrait<v2.MessageTraitObject>[];
    hasTraits(): boolean;
    originalPayload(): any;
    originalSchemaFormat(): string;
}
