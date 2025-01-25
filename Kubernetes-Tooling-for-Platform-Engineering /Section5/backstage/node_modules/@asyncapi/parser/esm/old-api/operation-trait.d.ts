import { SpecificationExtensionsModel } from './mixins';
import { SecurityRequirement } from './security-requirement';
import type { v2 } from '../spec-types';
export declare class OperationTrait<T> extends SpecificationExtensionsModel<T & v2.OperationTraitObject, {
    kind: 'publish' | 'subscribe';
}> {
    isPublish(): boolean;
    isSubscribe(): boolean;
    kind(): "subscribe" | "publish";
    id(): string | undefined;
    summary(): string | undefined;
    description(): string | null;
    hasDescription(): boolean;
    externalDocs(): import("./external-docs").ExternalDocs | null;
    hasExternalDocs(): boolean;
    hasTags(): boolean;
    tags(): import("./tag").Tag[];
    tagNames(): string[];
    hasTag(name: string): boolean;
    tag(name: string): import("./tag").Tag | null;
    hasBindings(): boolean;
    bindings(): Record<string, v2.Binding>;
    bindingProtocols(): string[];
    hasBinding(name: string): boolean;
    binding(name: string): v2.Binding | null;
    security(): SecurityRequirement[] | null;
}
