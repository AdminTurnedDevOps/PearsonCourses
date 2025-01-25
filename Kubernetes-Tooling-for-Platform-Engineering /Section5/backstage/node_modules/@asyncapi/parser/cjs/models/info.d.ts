import type { ContactInterface } from './contact';
import type { LicenseInterface } from './license';
import type { BaseModel } from './base';
import type { DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface } from './mixins';
export interface InfoInterface extends BaseModel, DescriptionMixinInterface, ExtensionsMixinInterface, ExternalDocumentationMixinInterface, TagsMixinInterface {
    title(): string;
    version(): string;
    hasId(): boolean;
    id(): string | undefined;
    hasTermsOfService(): boolean;
    termsOfService(): string | undefined;
    hasContact(): boolean;
    contact(): ContactInterface | undefined;
    hasLicense(): boolean;
    license(): LicenseInterface | undefined;
}
