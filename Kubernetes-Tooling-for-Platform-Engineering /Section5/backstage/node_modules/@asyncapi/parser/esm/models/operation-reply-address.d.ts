import type { BaseModel } from './base';
import type { DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';
export interface OperationReplyAddressInterface extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface {
    id(): string | undefined;
    location(): string;
}
