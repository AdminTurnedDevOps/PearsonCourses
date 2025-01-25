import { SpecificationExtensionsModel } from './mixins';
import { ServerVariable } from './server-variable';
import { SecurityRequirement } from './security-requirement';
import type { v2 } from '../spec-types';
export declare class Server extends SpecificationExtensionsModel<v2.ServerObject> {
    url(): string;
    protocol(): string;
    protocolVersion(): string | undefined;
    description(): string | null;
    hasDescription(): boolean;
    variables(): Record<string, ServerVariable>;
    variable(name: string): ServerVariable | null;
    hasVariables(): boolean;
    security(): SecurityRequirement[] | null;
    hasBindings(): boolean;
    bindings(): Record<string, v2.Binding>;
    bindingProtocols(): string[];
    hasBinding(name: string): boolean;
    binding(name: string): v2.Binding | null;
    hasTags(): boolean;
    tags(): import("./tag").Tag[];
    tagNames(): string[];
    hasTag(name: string): boolean;
    tag(name: string): import("./tag").Tag | null;
}
