import { SpecificationExtensionsModel } from './mixins';
import type { v2 } from '../spec-types';
export declare class Contact extends SpecificationExtensionsModel<v2.ContactObject> {
    name(): string | undefined;
    url(): string | undefined;
    email(): string | undefined;
}
