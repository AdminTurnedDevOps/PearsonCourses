import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { OperationReplyAddressInterface } from '../operation-reply-address';
import type { v3 } from '../../spec-types';
export declare class OperationReplyAddress extends BaseModel<v3.OperationReplyAddressObject, {
    id?: string;
}> implements OperationReplyAddressInterface {
    id(): string | undefined;
    location(): string;
    hasDescription(): boolean;
    description(): string | undefined;
    extensions(): ExtensionsInterface;
}
