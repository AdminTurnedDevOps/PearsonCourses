import type { BaseModel } from './base';
import type { DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';
export interface CorrelationIdInterface extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface {
    location(): string | undefined;
}
