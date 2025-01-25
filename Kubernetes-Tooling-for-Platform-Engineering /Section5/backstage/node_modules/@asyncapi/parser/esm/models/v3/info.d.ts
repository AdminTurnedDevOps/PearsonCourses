import { BaseModel } from '../base';
import type { ContactInterface } from '../contact';
import type { InfoInterface } from '../info';
import type { ExtensionsInterface } from '../extensions';
import type { ExternalDocumentationInterface } from '../external-docs';
import type { LicenseInterface } from '../license';
import type { TagsInterface } from '../tags';
import type { v3 } from '../../spec-types';
export declare class Info extends BaseModel<v3.InfoObject> implements InfoInterface {
    title(): string;
    version(): string;
    hasId(): boolean;
    id(): string | undefined;
    hasDescription(): boolean;
    description(): string | undefined;
    hasTermsOfService(): boolean;
    termsOfService(): string | undefined;
    hasContact(): boolean;
    contact(): ContactInterface | undefined;
    hasLicense(): boolean;
    license(): LicenseInterface | undefined;
    hasExternalDocs(): boolean;
    externalDocs(): ExternalDocumentationInterface | undefined;
    tags(): TagsInterface;
    extensions(): ExtensionsInterface;
}
