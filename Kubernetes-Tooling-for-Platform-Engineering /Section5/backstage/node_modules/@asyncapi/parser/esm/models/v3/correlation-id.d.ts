import { BaseModel } from '../base';
import type { CorrelationIdInterface } from '../correlation-id';
import type { ExtensionsInterface } from '../extensions';
import type { v3 } from '../../spec-types';
export declare class CorrelationId extends BaseModel<v3.CorrelationIDObject> implements CorrelationIdInterface {
    hasDescription(): boolean;
    description(): string | undefined;
    hasLocation(): boolean;
    location(): string | undefined;
    extensions(): ExtensionsInterface;
}
