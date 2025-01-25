import type { BaseModel } from './base';
import type { ExtensionsMixinInterface } from './mixins';
export interface ContactInterface extends BaseModel, ExtensionsMixinInterface {
    hasName(): boolean;
    name(): string | undefined;
    hasUrl(): boolean;
    url(): string | undefined;
    hasEmail(): boolean;
    email(): string | undefined;
}
