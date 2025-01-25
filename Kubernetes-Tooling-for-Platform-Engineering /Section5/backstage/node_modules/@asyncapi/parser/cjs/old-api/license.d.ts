import { SpecificationExtensionsModel } from './mixins';
import type { v2 } from '../spec-types';
export declare class License extends SpecificationExtensionsModel<v2.LicenseObject> {
    name(): string;
    url(): string | undefined;
}
