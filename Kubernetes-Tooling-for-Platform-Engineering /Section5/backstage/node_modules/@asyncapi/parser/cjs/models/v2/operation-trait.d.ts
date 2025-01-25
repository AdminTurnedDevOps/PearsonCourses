import { BaseModel } from '../base';
import { SecurityRequirements } from './security-requirements';
import type { BindingsInterface } from '../bindings';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { OperationAction } from '../operation';
import type { OperationTraitInterface } from '../operation-trait';
import type { TagsInterface } from '../tags';
import type { v2 } from '../../spec-types';
export declare class OperationTrait<J extends v2.OperationTraitObject = v2.OperationTraitObject> extends BaseModel<J, {
    id: string;
    action: OperationAction;
}> implements OperationTraitInterface {
    id(): string;
    hasOperationId(): boolean;
    operationId(): string | undefined;
    hasSummary(): boolean;
    summary(): string | undefined;
    hasDescription(): boolean;
    description(): string | undefined;
    hasExternalDocs(): boolean;
    externalDocs(): ExternalDocumentationInterface | undefined;
    security(): SecurityRequirements[];
    tags(): TagsInterface;
    bindings(): BindingsInterface;
    extensions(): ExtensionsInterface;
}
