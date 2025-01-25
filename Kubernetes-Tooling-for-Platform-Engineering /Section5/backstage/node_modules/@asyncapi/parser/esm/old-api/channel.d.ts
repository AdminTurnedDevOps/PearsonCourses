import { SpecificationExtensionsModel } from './mixins';
import { ChannelParameter } from './channel-parameter';
import { Operation } from './operation';
import type { v2 } from '../spec-types';
export declare class Channel extends SpecificationExtensionsModel<v2.ChannelObject> {
    description(): string | null;
    hasDescription(): boolean;
    hasParameters(): boolean;
    parameters(): Record<string, ChannelParameter>;
    parameter(name: string): ChannelParameter | null;
    hasServers(): boolean;
    servers(): string[];
    server(index: number | string): string | null;
    publish(): Operation | null;
    subscribe(): Operation | null;
    hasPublish(): boolean;
    hasSubscribe(): boolean;
    hasBindings(): boolean;
    bindings(): Record<string, v2.Binding>;
    bindingProtocols(): string[];
    hasBinding(name: string): boolean;
    binding(name: string): v2.Binding | null;
}
