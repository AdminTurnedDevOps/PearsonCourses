import { BaseModel } from '../base';
import type { ChannelParameterInterface } from '../channel-parameter';
import type { SchemaInterface } from '../schema';
import type { ExtensionsInterface } from '../extensions';
import type { v3 } from '../../spec-types';
export declare class ChannelParameter extends BaseModel<v3.ParameterObject, {
    id: string;
}> implements ChannelParameterInterface {
    id(): string;
    hasSchema(): boolean;
    schema(): SchemaInterface | undefined;
    hasLocation(): boolean;
    location(): string | undefined;
    hasDescription(): boolean;
    description(): string | undefined;
    extensions(): ExtensionsInterface;
}
