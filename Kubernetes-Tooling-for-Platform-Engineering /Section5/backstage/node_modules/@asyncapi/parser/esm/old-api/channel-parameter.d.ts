import { SpecificationExtensionsModel } from './mixins';
import { Schema } from './schema';
import type { v2 } from '../spec-types';
export declare class ChannelParameter extends SpecificationExtensionsModel<v2.ParameterObject> {
    description(): string | null;
    hasDescription(): boolean;
    schema(): Schema | null;
    location(): string | undefined;
}
