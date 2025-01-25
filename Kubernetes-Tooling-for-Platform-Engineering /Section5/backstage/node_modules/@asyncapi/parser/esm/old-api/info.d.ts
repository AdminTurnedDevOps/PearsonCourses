import { Contact } from './contact';
import { License } from './license';
import { SpecificationExtensionsModel } from './mixins';
import type { v2 } from '../spec-types';
export declare class Info extends SpecificationExtensionsModel<v2.InfoObject> {
    title(): string;
    version(): string;
    description(): string | null;
    hasDescription(): boolean;
    termsOfService(): string | undefined;
    license(): License | null;
    contact(): Contact | null;
}
