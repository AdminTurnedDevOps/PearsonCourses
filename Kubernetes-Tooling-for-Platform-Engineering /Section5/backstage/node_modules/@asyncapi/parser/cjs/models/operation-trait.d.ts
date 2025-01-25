import type { BaseModel } from './base';
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface } from './mixins';
import { SecurityRequirements } from './v2/security-requirements';
export interface OperationTraitInterface extends BaseModel, BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface {
    id(): string | undefined;
    hasOperationId(): boolean;
    operationId(): string | undefined;
    hasSummary(): boolean;
    summary(): string | undefined;
    security(): SecurityRequirements[];
}
