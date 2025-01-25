import { BaseModel } from '../base';
import type { CorrelationIdInterface } from '../correlation-id';
import type { ExtensionsInterface } from '../extensions';
import type { v2 } from '../../spec-types';
export declare class CorrelationId extends BaseModel<v2.CorrelationIDObject> implements CorrelationIdInterface {
    location(): string;
    hasDescription(): boolean;
    description(): string | undefined;
    extensions(): ExtensionsInterface;
}
