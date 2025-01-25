import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { MessageExampleInterface } from '../message-example';
import type { v3 } from '../../spec-types';
export declare class MessageExample extends BaseModel<v3.MessageExampleObject> implements MessageExampleInterface {
    hasName(): boolean;
    name(): string | undefined;
    hasSummary(): boolean;
    summary(): string | undefined;
    hasHeaders(): boolean;
    headers(): Record<string, any> | undefined;
    hasPayload(): boolean;
    payload(): Record<string, any> | undefined;
    extensions(): ExtensionsInterface;
}
