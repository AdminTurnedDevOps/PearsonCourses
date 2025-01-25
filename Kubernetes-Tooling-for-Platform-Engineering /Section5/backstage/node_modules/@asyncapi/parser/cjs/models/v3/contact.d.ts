import { BaseModel } from '../base';
import type { ContactInterface } from '../contact';
import type { ExtensionsInterface } from '../extensions';
import type { v3 } from '../../spec-types';
export declare class Contact extends BaseModel<v3.ContactObject> implements ContactInterface {
    hasName(): boolean;
    name(): string | undefined;
    hasUrl(): boolean;
    url(): string | undefined;
    hasEmail(): boolean;
    email(): string | undefined;
    extensions(): ExtensionsInterface;
}
