import type { BaseModel } from './base';
import type { DescriptionMixinInterface, ExtensionsMixinInterface } from './mixins';
export interface ServerVariableInterface extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface {
    id(): string;
    hasDefaultValue(): boolean;
    defaultValue(): string | undefined;
    hasAllowedValues(): boolean;
    allowedValues(): Array<string>;
    examples(): Array<string>;
}
