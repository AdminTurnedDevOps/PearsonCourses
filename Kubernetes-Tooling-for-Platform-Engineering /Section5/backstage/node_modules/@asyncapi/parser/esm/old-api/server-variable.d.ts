import { SpecificationExtensionsModel } from './mixins';
import type { v2 } from '../spec-types';
export declare class ServerVariable extends SpecificationExtensionsModel<v2.ServerVariableObject> {
    allowedValues(): string[] | undefined;
    allows(name: string): boolean;
    hasAllowedValues(): boolean;
    description(): string | null;
    hasDescription(): boolean;
    defaultValue(): string | undefined;
    hasDefaultValue(): boolean;
    examples(): string[] | undefined;
}
