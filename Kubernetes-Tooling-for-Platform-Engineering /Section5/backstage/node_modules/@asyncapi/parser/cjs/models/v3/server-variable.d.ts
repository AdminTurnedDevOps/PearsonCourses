import { BaseModel } from '../base';
import type { ExtensionsInterface } from '../extensions';
import type { ServerVariableInterface } from '../server-variable';
import type { v3 } from '../../spec-types';
export declare class ServerVariable extends BaseModel<v3.ServerVariableObject, {
    id: string;
}> implements ServerVariableInterface {
    id(): string;
    hasDescription(): boolean;
    description(): string | undefined;
    hasDefaultValue(): boolean;
    defaultValue(): string | undefined;
    hasAllowedValues(): boolean;
    allowedValues(): Array<string>;
    examples(): Array<string>;
    extensions(): ExtensionsInterface;
}
