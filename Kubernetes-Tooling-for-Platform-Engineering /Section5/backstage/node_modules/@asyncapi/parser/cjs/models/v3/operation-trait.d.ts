import { SecurityRequirements } from './security-requirements';
import { CoreModel } from './mixins';
import type { OperationTraitInterface } from '../operation-trait';
import type { v3 } from '../../spec-types';
export declare class OperationTrait<J extends v3.OperationTraitObject = v3.OperationTraitObject> extends CoreModel<J, {
    id: string | undefined;
}> implements OperationTraitInterface {
    id(): string | undefined;
    hasOperationId(): boolean;
    operationId(): string | undefined;
    security(): SecurityRequirements[];
}
