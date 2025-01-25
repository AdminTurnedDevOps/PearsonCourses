import { SpecificationExtensionsModel } from './mixins';
import type { v2 } from '../spec-types';
export declare class CorrelationId extends SpecificationExtensionsModel<v2.CorrelationIDObject> {
    description(): string | null;
    hasDescription(): boolean;
    location(): string;
}
