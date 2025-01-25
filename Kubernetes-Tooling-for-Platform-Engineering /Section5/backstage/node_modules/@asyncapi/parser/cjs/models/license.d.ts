import type { BaseModel } from './base';
import type { ExtensionsMixinInterface } from './mixins';
export interface LicenseInterface extends BaseModel, ExtensionsMixinInterface {
    name(): string;
    hasUrl(): boolean;
    url(): string | undefined;
}
