import { OperationTrait } from './operation-trait';
import { Message } from './message';
import type { v2 } from '../spec-types';
export declare class Operation extends OperationTrait<v2.OperationObject> {
    traits(): OperationTrait<unknown>[];
    hasTraits(): boolean;
    hasMultipleMessages(): boolean;
    messages(): Message[];
    message(index?: number | string): Message | null;
}
