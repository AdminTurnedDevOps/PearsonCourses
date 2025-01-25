import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { LicenseInterface } from '../license';
import type { v2 } from '../../spec-types';
export declare class License extends BaseModel<v2.LicenseObject> implements LicenseInterface {
    name(): string;
    hasUrl(): boolean;
    url(): string | undefined;
    extensions(): ExtensionsInterface;
}
